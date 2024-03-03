import * as fs from "fs";
import * as path from "path";

const folderName = "dist";

export function writeFile(fileName: string, data: string) {
  createFolderIfNotExist();
  writeDataToFile(fileName, data);
}

function writeDataToFile(name: string, data: string) {
  fs.writeFile(
    path.resolve(process.cwd(), folderName + path.sep + name),
    data,
    function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    }
  );
}

function createFolderIfNotExist() {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }
}

export function readFile(fileName: string): string {
  return fs.readFileSync(path.join(folderName, fileName), { encoding: "utf8" });
}
