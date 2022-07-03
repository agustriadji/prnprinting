const printer = require("printer");
const adjusment = require("./setting/adjustment");
const fs = require("fs");
const path = require("path");
let setting  = adjusment.default.Setting;

async function prints(typeData,settingItem,dataItem,bufferFile){
    return new Promise(async(resolve)=>{
        let prn = bufferFile || null;
        //if(prn){
            //prn = fs.readFileSync(pathfile,{encoding:"latin1"}).toString();
        //}
        const data = {
            "_SECTION": "LABELING",
            "01_QRDAT": "LABEL",
            "_STATE": "COMPLETED",
            "_SOURCEDOC": "CP/12/12/2001/0012345",
            "_PTNUMBER": "PTM/14/13/2001/0000123",
            "_PTREF": "PTREF/13/12/2002/00001234",
        };
        
        const dataSource = await adjusment.prnData(dataItem||data,prn);
        
        setting.content = dataSource;
        if(settingItem){
            settingItem.content = dataSource;
        }
        if(!prn){
            prn = await adjusment.prnBuild(settingItem || setting);
        }else{
            prn = new Buffer.alloc(dataSource.length,dataSource,"latin1");
        }
       
       printer.printDirect({
            data: prn,
            printer:printer.getDefaultPrinterName(),
            // type: RAW, TEXT, PDF, JPEG
            type: typeData, 
            success:function(jobID){
                resolve(jobID);
                console.log("sent to printer with ID: "+jobID);
            },
            error:function(err){ console.log(err); resolve(false);}
        });
    });
}
// let prn = fs.readFileSync(path.join(__dirname,"content/tecmicroqr.prn"),{encoding:"latin1"}).toString();
// prints("RAW",null,{"_QRDATA":"1003~INT/2022/00001","_PICKINGMICRO":"INT/2022/00001","_PTNUMBER":"data-origin"},prn)

exports.printing = prints;