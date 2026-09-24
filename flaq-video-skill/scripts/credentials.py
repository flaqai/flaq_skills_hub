"""Configure a Flaq Client Key once on the current device.

Run in the skill directory (Windows: replace python3 with py -3):
  python3 scripts/credentials.py set
  python3 scripts/credentials.py status
  python3 scripts/credentials.py clear
Requires keyring from requirements.txt. Never prints the Key.
Request scripts import get_api_key() to obtain the Key inside their own process.
"""
import argparse
import getpass
import os
import sys
import warnings

from common import SkillError, run

SERVICE = 'ai.flaq.video-skill'
ACCOUNT = 'https://api.flaq.ai'


def credential_backend():
    try:
        if sys.platform == 'darwin':
            from keyring.backends.macOS import Keyring
        elif sys.platform == 'win32':
            from keyring.backends.Windows import WinVaultKeyring as Keyring
        elif sys.platform.startswith('linux'):
            from keyring.backends.SecretService import Keyring
        else:
            raise SkillError('UNSUPPORTED_PLATFORM', 'System credential storage supports macOS, Windows and Linux.')
        backend = Keyring()
        if backend.priority <= 0:
            raise RuntimeError('Unavailable')
        return backend
    except SkillError:
        raise
    except ImportError:
        raise SkillError('DEPENDENCY_MISSING', 'Install keyring from requirements.txt using the same Python interpreter.') from None
    except Exception:
        raise SkillError('CREDENTIAL_STORE_UNAVAILABLE', 'Unlock the system credential store. Linux requires a running Secret Service in the current user session; no plaintext fallback is used.') from None


def stored_key():
    backend = credential_backend()
    try:
        return backend.get_password(SERVICE, ACCOUNT)
    except Exception:
        raise SkillError('CREDENTIAL_READ_FAILED', 'Cannot read the system credential store. Check access and unlock it.') from None


def get_api_key():
    key = os.environ.get('FLAQ_CLIENT_KEY', '').strip() or stored_key()
    if not key:
        raise SkillError('KEY_NOT_CONFIGURED', 'Run credentials.py set in your own terminal to configure a Client Key.')
    if '\r' in key or '\n' in key:
        raise SkillError('INVALID_KEY', 'Client Key must not contain line breaks.')
    return key


def status():
    environment = bool(os.environ.get('FLAQ_CLIENT_KEY', '').strip())
    return {'configured': environment or bool(stored_key()),
            'source': 'environment' if environment else 'system-credential-store',
            'api_origin': ACCOUNT, 'remote_validation': 'not-performed'}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('action', choices=['set', 'status', 'clear'])
    args = parser.parse_args()
    if args.action == 'status':
        return status()
    backend = credential_backend()
    if args.action == 'clear':
        try:
            if backend.get_password(SERVICE, ACCOUNT) is not None:
                backend.delete_password(SERVICE, ACCOUNT)
        except Exception:
            raise SkillError('CREDENTIAL_CLEAR_FAILED', 'Cannot remove the saved credential. Check the system credential store.') from None
        return {'saved_key_cleared': True, 'environment_key_active': bool(os.environ.get('FLAQ_CLIENT_KEY', '').strip())}
    if not sys.stdin.isatty():
        raise SkillError('TERMINAL_REQUIRED', 'Run set in an interactive terminal; do not pass the Key as an argument.')
    with warnings.catch_warnings():
        warnings.simplefilter('error', getpass.GetPassWarning)
        try:
            key = getpass.getpass('Flaq Client Key: ').strip()
        except getpass.GetPassWarning:
            raise SkillError('HIDDEN_INPUT_UNAVAILABLE', 'This terminal cannot hide input. Use an interactive terminal with hidden input support.') from None
    if not key or '\r' in key or '\n' in key:
        raise SkillError('INVALID_KEY', 'Enter a nonempty Client Key without line breaks.')
    try:
        backend.set_password(SERVICE, ACCOUNT, key)
    except Exception:
        raise SkillError('CREDENTIAL_WRITE_FAILED', 'Cannot save the Key. Check system credential store access.') from None
    return {'saved': True, 'api_origin': ACCOUNT, 'environment_key_active': bool(os.environ.get('FLAQ_CLIENT_KEY', '').strip())}


if __name__ == '__main__':
    sys.exit(run(main))
