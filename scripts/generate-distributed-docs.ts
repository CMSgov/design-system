import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOCS_PUBLIC_DIR = path.resolve(__dirname, '../packages/docs/public');

const CORE_PACKAGE_PATH = path.resolve(__dirname, '../packages/design-system');
const HEALTHCARE_PACKAGE_PATH = path.resolve(__dirname, '../packages/ds-healthcare-gov');
const MEDICARE_PACKAGE_PATH = path.resolve(__dirname, '../packages/ds-medicare-gov');
const CMS_PACKAGE_PATH = path.resolve(__dirname, '../packages/ds-cms-gov');

const packagePaths = [
  CORE_PACKAGE_PATH,
  HEALTHCARE_PACKAGE_PATH,
  MEDICARE_PACKAGE_PATH,
  CMS_PACKAGE_PATH,
];

function sanitizeManifestPath(filePath: string): string {
  return filePath.replace(/^\/+/, '');
}
function getArtifactPath(artifactName: string): string {
  return path.resolve(DOCS_PUBLIC_DIR, artifactName);
}

function assertDocsArtifactsExist(artifactPaths: string[]): void {
  return artifactPaths.forEach((path) => {
    if (!fs.existsSync(path)) {
      throw new Error(
        [
          'Built docs artifacts not found.',
          `Expected file: ${path}`,
          'Run `npm run build:docs` before building distributed docs.',
        ].join('\n')
      );
    }
  });
}

function main(): void {
  const llmsIndexPath = getArtifactPath('llms.txt');
  const docsManifestPath = getArtifactPath('docs-manifest.json');
  assertDocsArtifactsExist([llmsIndexPath, docsManifestPath]);

  console.log(`Docs artifacts found: ${llmsIndexPath}, ${docsManifestPath}`);

  // Create a dist/docs for each pacakge and put the root llms.txt in each one.
  packagePaths.forEach((packagePath) => {
    const distDocsPath = path.resolve(packagePath, 'dist', 'docs');
    if (!fs.existsSync(distDocsPath)) {
      fs.mkdirSync(distDocsPath, { recursive: true });
    }
    fs.copyFileSync(llmsIndexPath, path.resolve(distDocsPath, 'llms.txt'));
    console.log(`Copied docs artifacts to ${distDocsPath}`);
  });

  // Look up each shared design system entry in manifestJson within DOCS_PUBLIC_DIR/llms.txt and verify it exists.
  // If it does, copy it to each package's dist/docs nested directory.
  const manifestJson = JSON.parse(fs.readFileSync(docsManifestPath, 'utf-8'));
  const sharedPages = manifestJson.packages['design-system'];
  sharedPages.forEach((page: { path: string }) => {
    const sanitizedPath = sanitizeManifestPath(page.path);
    const pagePath = path.resolve(DOCS_PUBLIC_DIR, sanitizedPath, 'llms.txt');
    console.log('Looking for shared page at:', pagePath);
    if (!fs.existsSync(pagePath)) {
      console.warn(`llms.txt not found for shared page: ${pagePath}`);
      return;
    }
    packagePaths.forEach((packagePath) => {
      const distDocsPath = path.resolve(packagePath, 'dist', 'docs');
      const destPagePath = path.resolve(distDocsPath, sanitizedPath, 'llms.txt');
      const destPageDir = path.dirname(destPagePath);
      if (!fs.existsSync(destPageDir)) {
        fs.mkdirSync(destPageDir, { recursive: true });
      }
      fs.copyFileSync(pagePath, destPagePath);
      console.log(`Copied shared page ${page.path} to ${destPagePath}`);
    });
  });

  // TODO: We can now copy package-specific pages into their target package dist/docs.
}

main();
