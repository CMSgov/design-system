import path from 'path';
import fs from 'fs';

export type OutputFiles = {
  [fileName: string]: string;
};

export async function writeFiles(outputDir: string, files: OutputFiles): Promise<string[]> {
  // Write the files for each theme concurrently
  const filesWritten = await Promise.all(
    Object.keys(files).map(async (fileName) => {
      const contents = files[fileName];
      const fullPath = path.join(outputDir, fileName);
      await fs.promises.writeFile(fullPath, contents);
      return fullPath;
    })
  );

  // eslint-disable-next-line no-console
  filesWritten.forEach((name) => console.log(`:: wrote ${name}`));

  return filesWritten;
}

export default writeFiles;
