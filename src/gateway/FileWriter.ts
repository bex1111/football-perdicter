import * as fs from 'fs'
import * as path from 'path'

export function writeFile(name:string,data:string){
    fs.writeFile(path.resolve( process.cwd(),name), data,
        function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
}


