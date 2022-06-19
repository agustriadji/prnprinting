const fs = require("fs");

const prnModels = {
    Rectangle : "D0763",
    Rounded : "D0591",
    Circle:"D0274"
}

const prnData = async function(file,data){
    let label = file;
    try {
        let defaultFile = fs.readFileSync("../content/default.txt").toString();
        if(!label) label = defaultFile;
            
        let embed = Object.keys(data);
        for(let i=0; i < embed.length; i++){
            label = label.replace(embed[i], data[embed[i]]);
        }
    } catch (error) {
        throw error;
    }
    return label;
}

const prnBuild = async function(setItem){
    try {        
        let { media, content, fineAdjust } = setItem;
        let set = `
        <xpml><page quantity='0' pitch='${media.pitch} mm'></xpml>
        {${setItem.model},${media.width},${media.height}|}
        {AX;+${fineAdjust.feed},+${fineAdjust.backFeed},+${fineAdjust.cut}|}
        {AY;+10,1|}
        <xpml></page></xpml><xpml><page quantity='1' pitch='${media.pitch} mm'></xpml>{C|}
        {LC;0056,0049,0982,0435,1,4|}
        ${content}
        {XS;I,0001,0000C5000|}
        <xpml></page></xpml><xpml><end/></xpml>`;
    } catch (error) {
        throw error;
    }

    return set;
}

module.export = { prnBuild, prnData, prnModels };