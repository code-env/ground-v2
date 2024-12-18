import fs from "fs";
import Path from "path";
import util from "util";

const readdir = util.promisify(fs.readdir);
const mkdir = util.promisify(fs.mkdir);
const stat = util.promisify(fs.stat);

const extensions = new Set(); // Use Set to avoid duplicates

async function getFileExtensions(filePath) {
  const extType = Path.extname(filePath);
  if (extType) {
    extensions.add(extType);
  } else {
    extensions.add("others");
  }
}

async function checkFileType(dir) {
  try {
    const files = await readdir(dir);
    for (const file of files) {
      const filePath = Path.join(dir, file);
      const stats = await stat(filePath);
      if (stats.isDirectory()) {
        await checkFileType(filePath);
      } else {
        await getFileExtensions(filePath);
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function createFolderWithExt(baseDir) {
  try {
    for (const extension of extensions) {
      const dirName = extension.startsWith(".")
        ? extension.slice(1)
        : extension;
      const folderPath = Path.join(baseDir, dirName);
      await mkdir(folderPath, { recursive: true });
    }
  } catch (error) {
    console.error("Error creating folders:", error);
  }
}

(async () => {
  const baseDir = "/home/bossadi/Desktop";
  //   await checkFileType(baseDir);
  await createFolderWithExt(baseDir);
  console.log(
    "Folders created based on file extensions:",
    Array.from(extensions)
  );
})();
