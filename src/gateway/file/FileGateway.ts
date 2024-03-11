import * as fs from "fs";
import * as path from "path";

const folderName = "dist";

export function writeFile(fileName: string, data: string) {
  createFolderIfNotExist();
  writeDataToFile(fileName, data);
}

function writeDataToFile(name: string, data: string) {
  fs.writeFile(
    path.resolve(process.cwd(), generateFilePath(name)),
    data,
    function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    }
  );
}

function generateFilePath(filenName: string) {
  return folderName + path.sep + filenName;
}

function createFolderIfNotExist() {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }
}

export function readFile(fileName: string): string {
  return fs.readFileSync(path.join(folderName, fileName), { encoding: "utf8" });
}

export function isFileExist(fileName: string): boolean {
  return fs.existsSync(generateFilePath(fileName));
}
