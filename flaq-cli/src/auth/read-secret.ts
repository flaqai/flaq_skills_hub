import { FlaqCliError } from '../errors.ts';

export async function readSecret(prompt: string, credentialName: string): Promise<string> {
  if (!process.stdin.isTTY || !process.stdout.isTTY || typeof process.stdin.setRawMode !== 'function') {
    throw new FlaqCliError({
      category: 'authentication',
      code: 'INTERACTIVE_TTY_REQUIRED',
      message: `A terminal is required to enter the ${credentialName} securely.`,
      retryable: false,
    });
  }

  process.stdout.write(prompt);
  process.stdin.setEncoding('utf8');
  process.stdin.setRawMode(true);
  process.stdin.resume();

  return new Promise((resolve, reject) => {
    let value = '';

    const cleanup = () => {
      process.stdin.off('data', onData);
      process.stdin.setRawMode(false);
      process.stdin.pause();
      process.stdout.write('\n');
    };

    const onData = (chunk: string) => {
      for (const character of chunk) {
        if (character === '\u0003') {
          cleanup();
          reject(new FlaqCliError({
            category: 'authentication',
            code: 'INPUT_CANCELLED',
            message: `${credentialName} input was cancelled.`,
            retryable: false,
          }));
          return;
        }
        if (character === '\r' || character === '\n') {
          cleanup();
          resolve(value.trim());
          return;
        }
        if (character === '\u007f' || character === '\b') {
          value = value.slice(0, -1);
          continue;
        }
        value += character;
      }
    };

    process.stdin.on('data', onData);
  });
}
