#!/bin/zsh

# Flaq CLI Build and Asset Skill Packaging Script
#
# Builds the standalone macOS executable, assembles the complete CLI package,
# validates the staged package, and copies it into asset-skill/tools/flaq-cli/.
#
# Default target:
#   ../../agent-skills/.agents/skills/asset-skill
#   Relative to the CLI source directory (flaq-cli/flaq-cli/).
#
# Usage:
#   zsh scripts/package-to-asset-skill.sh
#   zsh scripts/package-to-asset-skill.sh /absolute/path/to/asset-skill
#
# Package command:
#   pnpm package:skill

set -euo pipefail

SCRIPT_DIRECTORY=${0:A:h}
PROJECT_ROOT=${SCRIPT_DIRECTORY:h}
DEFAULT_ASSET_SKILL_ROOT=${PROJECT_ROOT:h:h}/agent-skills/.agents/skills/asset-skill
ASSET_SKILL_ROOT=${1:-${DEFAULT_ASSET_SKILL_ROOT}}
PACKAGE_PARENT=${ASSET_SKILL_ROOT}/tools
PACKAGE_DIRECTORY=${PACKAGE_PARENT}/flaq-cli
STAGING_DIRECTORY=''

cleanup() {
  if [[ -n "${STAGING_DIRECTORY}" && -d "${STAGING_DIRECTORY}" ]]; then
    rm -rf -- "${STAGING_DIRECTORY}"
  fi
}

trap cleanup EXIT INT TERM

if ! command -v pnpm >/dev/null 2>&1; then
  print -u2 'pnpm is required to run the project build.'
  exit 1
fi

if ! command -v bun >/dev/null 2>&1 && [[ -x "${HOME}/.bun/bin/bun" ]]; then
  export PATH="${HOME}/.bun/bin:${PATH}"
fi

if ! command -v bun >/dev/null 2>&1; then
  print -u2 'Bun is required on the machine that builds Flaq CLI.'
  exit 1
fi

if [[ ! -f "${ASSET_SKILL_ROOT}/SKILL.md" ]]; then
  print -u2 "Asset Skill was not found at: ${ASSET_SKILL_ROOT}"
  print -u2 'Pass its absolute directory as the first argument.'
  exit 1
fi

print "Building Flaq CLI from ${PROJECT_ROOT}"
cd "${PROJECT_ROOT}"
pnpm build

if [[ ! -f "${PROJECT_ROOT}/dist/flaq" ]]; then
  print -u2 'Build completed without producing dist/flaq.'
  exit 1
fi

mkdir -p "${PACKAGE_PARENT}"
STAGING_DIRECTORY=$(mktemp -d "${PACKAGE_PARENT}/.flaq-cli-package.XXXXXX")

cp "${PROJECT_ROOT}/dist/flaq" "${STAGING_DIRECTORY}/flaq"
cp "${PROJECT_ROOT}/start.command" "${STAGING_DIRECTORY}/start.command"
cp -R "${PROJECT_ROOT}/model-catalog" "${STAGING_DIRECTORY}/model-catalog"
cp -R "${PROJECT_ROOT}/schemas" "${STAGING_DIRECTORY}/schemas"
chmod +x "${STAGING_DIRECTORY}/flaq" "${STAGING_DIRECTORY}/start.command"

print 'Validating staged executable and model catalog'
"${STAGING_DIRECTORY}/flaq" version
"${STAGING_DIRECTORY}/flaq" models validate --catalog-dir "${STAGING_DIRECTORY}/model-catalog"

if [[ -d "${PACKAGE_DIRECTORY}" ]]; then
  extra_files=()
  while IFS= read -r target_file; do
    relative_path=${target_file#${PACKAGE_DIRECTORY}/}
    if [[ ! -e "${STAGING_DIRECTORY}/${relative_path}" ]]; then
      extra_files+=("${relative_path}")
    fi
  done < <(find "${PACKAGE_DIRECTORY}" -type f -print)

  if (( ${#extra_files[@]} > 0 )); then
    print -u2 'Packaging stopped because the existing target contains files absent from the new package:'
    for relative_path in "${extra_files[@]}"; do
      print -u2 "  ${relative_path}"
    done
    print -u2 'Review these files manually before running the script again; nothing was deleted.'
    exit 1
  fi
fi

mkdir -p "${PACKAGE_DIRECTORY}"
cp -R "${STAGING_DIRECTORY}/." "${PACKAGE_DIRECTORY}/"
chmod +x "${PACKAGE_DIRECTORY}/flaq" "${PACKAGE_DIRECTORY}/start.command"

print 'Validating packaged Asset Skill copy'
"${PACKAGE_DIRECTORY}/flaq" version
"${PACKAGE_DIRECTORY}/flaq" models validate --catalog-dir "${PACKAGE_DIRECTORY}/model-catalog"

print "Flaq CLI package is ready at: ${PACKAGE_DIRECTORY}"
