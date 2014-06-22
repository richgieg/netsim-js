module.exports = Frame;

function Frame(destMac, srcMac, payload) {
    this.destMac = destMac;
    this.srcMac = srcMac;
    this.payload = payload;
}

Frame.prototype.toString = function() {
    var string = this.destMac + ",";
    string += this.srcMac + ",";
    string += '"' + this.payload + '"';
    return string;
}