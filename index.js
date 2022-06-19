const printer = require("printer");
const adjusment = require("./setting/adjustment");

let setting  = {
    // unit mm, type integer string
    media : {
        model: adjusment.prnModels.Rectangle,
        pitch:"54.1", 
        width:"1024",
        height:"0541",
    },
    fineAdjust: {
        feed: "020",
        backFeed:"020",
        cut:"20",
    },
    content:false
}

async function prints(typeData,settingItem,dataItem){
    return new Promise(async(resolve)=>{
        const data = {
            "_SECTION": "Picking Micro",
            "01_QRDAT": "TEST",
            "_STATE": "COMPLETED",
            "_SOURCEDOC": "CP/12/12/2001/0012345",
            "_PTNUMBER": "PTM/14/13/2001/0000123",
            "_PTREF": "PTREF/13/12/2002/00001234",
        };
    
        const dataSource = await adjusment.prnData(false,dataItem || data);
    
        setting.content = dataSource;
        let raw = await adjusment.prnBuild(settingItem || setting);
    
        printer.printDirect({
            data: raw,
            printer:printer.getDefaultPrinterName(),
            // type: RAW, TEXT, PDF, JPEG, .. depends on platform
            type: typeData, 
            success:function(jobID){
                resolve(jobID);
                console.log("sent to printer with ID: "+jobID);
            },
            error:function(err){ console.log(err); resolve(false);}
        });
    });
}

exports.printing = prints;