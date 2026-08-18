#!/bin/zsh
# Usage: double-click this file to start the local Flaq service and open its management page.
# Terminal command: ./start.command

SCRIPT_DIR="${0:A:h}"
FLAQ_BINARY="$SCRIPT_DIR/flaq"

if [[ ! -x "$FLAQ_BINARY" ]]; then
  echo "Flaq executable was not found: $FLAQ_BINARY"
  echo "Press Enter to close this window."
  read
  exit 1
fi

exec "$FLAQ_BINARY" serve --open
