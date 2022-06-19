exports.printer = require("printer");
exports.adjustment = require("./setting");

const printers = this.printer.getPrinters("TOSHIBA B-FV4T (203)");
console.log(printers,"?")
