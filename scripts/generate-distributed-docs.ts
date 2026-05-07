import fs from 'fs';
import path from 'path';

type ManifestPage = {
  slug: string;
};

type DocsManifest = {
  packages: Record<string, ManifestPage[]>;
};

const DOCS_PUBLIC_DIR = path.resolve(__dirname, '../packages/docs/public');

const packagePathByName: Record<string, string> = {
  'design-system': path.resolve(__dirname, '../packages/design-system'),
  'ds-healthcare-gov': path.resolve(__dirname, '../packages/ds-healthcare-gov'),
  'ds-medicare-gov': path.resolve(__dirname, '../packages/ds-medicare-gov'),
  'ds-cms-gov': path.resolve(__dirname, '../packages/ds-cms-gov'),
};

const packagePaths = Object.values(packagePathByName);
const childPackageNames = ['ds-healthcare-gov', 'ds-medicare-gov', 'ds-cms-gov'];

function sanitizeManifestPath(filePath: string): string {
  return filePath.replace(/^\/+/, '');
}

function getArtifactPath(artifactName: string): string {
  return path.resolve(DOCS_PUBLIC_DIR, artifactName);
}

function assertDocsArtifactsExist(artifactPaths: string[]): void {
  artifactPaths.forEach((artifactPath) => {
    if (!fs.existsSync(artifactPath)) {
      throw new Error(
        [
          'Built docs artifacts not found.',
          `Expected file: ${artifactPath}`,
          'Run `npm run build:docs` before building distributed docs.',
        ].join('\n')
      );
    }
  });
}

function copyFileToDistDocs(
  sourcePath: string,
  packagePath: string,
  destinationPath: string
): void {
  const distDocsPath = path.resolve(packagePath, 'dist', 'docs');
  const fullDestinationPath = path.resolve(distDocsPath, destinationPath);

  fs.mkdirSync(path.dirname(fullDestinationPath), { recursive: true });
  fs.copyFileSync(sourcePath, fullDestinationPath);
}

function copyManifestPageToPackages(page: ManifestPage, targetPackagePaths: string[]): void {
  const sanitizedPath = sanitizeManifestPath(page.slug);
  const sourcePath = path.resolve(DOCS_PUBLIC_DIR, sanitizedPath, 'llms.txt');

  if (!fs.existsSync(sourcePath)) {
    console.warn(`llms.txt not found for page: ${sourcePath}`);
    return;
  }

  targetPackagePaths.forEach((packagePath) => {
    copyFileToDistDocs(sourcePath, packagePath, path.join(sanitizedPath, 'llms.txt'));
    console.log(`Copied ${page.slug} to ${packagePath}`);
  });
}

function readManifest(manifestPath: string): DocsManifest {
  try {
    return JSON.parse(fs.readFileSync(manifestPath, 'utf-8')) as DocsManifest;
  } catch (error) {
    throw new Error(
      [
        'Failed to read docs manifest.',
        `Manifest path: ${manifestPath}`,
        error instanceof Error ? error.message : String(error),
      ].join('\n')
    );
  }
}

function main(): void {
  const llmsIndexPath = getArtifactPath('llms.txt');
  const docsManifestPath = getArtifactPath('docs-manifest.json');

  assertDocsArtifactsExist([llmsIndexPath, docsManifestPath]);

  const manifestJson = readManifest(docsManifestPath);

  packagePaths.forEach((packagePath) => {
    copyFileToDistDocs(llmsIndexPath, packagePath, 'llms.txt');
    console.log(`Copied root llms.txt to ${packagePath}/dist/docs`);
  });

  const sharedPages = manifestJson.packages['design-system'] ?? [];

  // Copy shared pages into every package's dist/docs directory.
  sharedPages.forEach((page) => {
    copyManifestPageToPackages(page, packagePaths);
  });

  // Copy theme-specific pages into their corresponding package dist/docs directory.
  childPackageNames.forEach((packageName) => {
    const pages = manifestJson.packages[packageName] ?? [];
    const targetPackagePath = packagePathByName[packageName];

    pages.forEach((page) => {
      copyManifestPageToPackages(page, [targetPackagePath]);
    });
  });
}

main();
