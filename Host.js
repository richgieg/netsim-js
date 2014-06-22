module.exports = Host;

var Transceiver = require("./Transceiver");
var Frame = require("./Frame");

function Host(name, macAddress) {
    this.name = name;
    this.macAddress = macAddress;
    this.port = new Transceiver("Port0", receiveHandler, this);
    var that = this;
    
    function receiveHandler(srcPort, frame) {
        if (frame.destMac === that.macAddress) {
            console.log(that.name + " has received the frame");
        } else {
            console.log(that.name + " dropped frame - not intended recipient");
        }
    }
}

Host.prototype.transmitLayer2 = function(destMac, payload) {
    var frame = new Frame(destMac, this.macAddress, payload);
    this.port.transmit(frame);
};