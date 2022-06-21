const fs = require("fs");

const prnModels = {
    Rectangle : "D0763",
    Rounded : "D0591",
    Circle:"D0274"
}

const prnData = async function(data){
    let label = `{XB00;0083,0070,T,L,09,A,0,M2,K7=01_QRDAT|}
    {PC000;0486,0104,05,05,I,00,B=_SECTION|}
    {PC001;0700,0105,05,05,I,00,B=_STATE|}
    {PC002;0486,0149,05,05,I,00,B=_SOURCEDOC|}
    {PC003;0486,0265,05,05,I,00,B=PT NUMBER :|}
    {PC004;0486,0301,05,05,I,00,B=_PTNUMBER|}
    {PC005;0486,0406,05,05,I,00,B=_PTREF|}
    {PC006;0486,0371,05,05,I,00,B=PT REFERENCE :|}`;
    try {
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
    let set = null;
    try {        
        let { media, content, fineAdjust } = setItem;
        set = `
        <xpml><page quantity='0' pitch='${media.pitch} mm'></xpml>
        {${media.model},${media.width},${media.height}|}
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

exports.prnBuild = prnBuild;
exports.prnData = prnData;
exports.prnModels = prnModels;