module.exports = Hub;

var Transceiver = require("./Transceiver");

function Hub(name, numberOfPorts) {
    this.name = name;
    this.ports = [];
    var that = this;
    
    function receiveHandler(srcPort, frame) {
        var ports = that.ports;
        for (var i in ports) {
            if (ports[i] !== srcPort) {
                ports[i].transmit(frame);
            }
        }
    }
    
    for (var i = 0; i < numberOfPorts; i++) {
        this.ports.push(new Transceiver("Port" + i, receiveHandler, this));
    }
}