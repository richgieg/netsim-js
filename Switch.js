module.exports = Switch;

var Transceiver = require("./Transceiver");

function Switch(name, numberOfPorts) {
    this.name = name;
    this.ports = [];
    this.camTable = {};
    var that = this;
    
    function receiveHandler(srcPort, frame) {
        var ports = that.ports;
        var camTable = that.camTable;
        for (var i in ports) {
            if (ports[i] === srcPort) {
                if (camTable[frame.srcMac] !== i) {
                    if (camTable[frame.srcMac] === undefined) {
                        console.log(that.name + " CAM table entry added "
                                    + frame.srcMac + "=" + i);
                    } else {
                        console.log(that.name + " CAM table entry changed "
                                    + frame.srcMac + "=" + i);                        
                    }
                    camTable[frame.srcMac] = i;
                }
            }
        }
        
        if (camTable[frame.destMac] !== undefined) {
            console.log(that.name + " CAM table entry found "
                        + frame.destMac + "=" + camTable[frame.destMac]);
            ports[camTable[frame.destMac]].transmit(frame);
        } else {
            for (var i in ports) {
                if (ports[i] !== srcPort) {
                    ports[i].transmit(frame);
                }
            }
        }
    }

    for (var i = 0; i < numberOfPorts; i++) {
        this.ports.push(new Transceiver("Port" + i, receiveHandler, this));
    }    
}