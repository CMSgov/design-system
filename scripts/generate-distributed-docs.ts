import fs from 'fs';
import path from 'path';

function getLlmsIndexPath(): string {
  return path.resolve(process.cwd(), 'packages/docs/public/llms.txt');
}

function assertDocsArtifactsExist(llmsIndexPath: string): void {
  if (!fs.existsSync(llmsIndexPath)) {
    throw new Error(
      [
        'Built docs artifacts not found.',
        `Expected file: ${llmsIndexPath}`,
        'Run `npm run build:docs` before building distributed docs.',
      ].join('\n')
    );
  }
}

function main(): void {
  const llmsIndexPath = getLlmsIndexPath();
  assertDocsArtifactsExist(llmsIndexPath);

  console.log(`Docs artifacts found: ${llmsIndexPath}`);
}

main();
