const { exec } = require("child_process");
const fs = require("fs");
const path = require("path")

const checkDir = async()=>{
    let paths = path.join(`${process.cwd()}/services`);
    let exists = fs.existsSync(`${paths}/printing/`);
    if(!exists){
        console.log(exists)
        fs.mkdirSync(`${paths}/printing/`);
        fs.mkdirSync(`${paths}/printing/schema/`);
    }
}

module.exports = checkDir();