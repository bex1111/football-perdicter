import * as fs from "fs";
import * as path from "path";

const folderName = "dist";

export function writeFile(fileName: string, data: string) {
  createFolderIfNotExist();
  writeDataToFile(fileName, data);
}

function writeDataToFile(name: string, data: string) {
  fs.writeFileSync(generateFilePath(name), data);
}

function generateFilePath(filenName: string) {
  return path.join(folderName, filenName);
}

function createFolderIfNotExist() {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }
}

export function readFile(fileName: string): string {
  return fs.readFileSync(generateFilePath(fileName), { encoding: "utf8" });
}

export function isFileExist(fileName: string): boolean {
  return fs.existsSync(generateFilePath(fileName));
}

export function removeFile(fileName: string) {
  if (isFileExist(fileName)) {
    fs.unlinkSync(generateFilePath(fileName));
  }
}
