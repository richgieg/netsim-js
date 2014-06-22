module.exports = Transceiver;

var SignalPath = require("./SignalPath");

function Transceiver(name, receiverFunction, owner) {
    this.name = name;
    this.owner = owner;
    this.isAttached = false;
    this.signalPath = null;
    this.transmitQueue = [];
    this.receiveQueue = [];
    var that = this;
    
    function debugOutput(message) {
        var prefix = "";
        if (that.owner !== "undefined" && that.owner !== null) {
            if (typeof that.owner.name === "string") {
                prefix = that.owner.name + ":";
            }
        }
        console.log("[ ]" + prefix + message);
    }
    
    function processTransmitQueue() {
        if (that.transmitQueue.length === 0) {
            return;
        }
        var frame = that.transmitQueue.shift();
        if (that.isAttached) {
            debugOutput(that.name + " has sent [" + frame + "]");
            that.signalPath.transmit(that, frame);
        } else {
            debugOutput(that.name + " failed to send [" + frame + "]");
        }        
    }
    
    function processReceiveQueue() {
        if (that.receiveQueue.length === 0) {
            return;
        }
        var frame = that.receiveQueue.shift();
        debugOutput(that.name + " has received [" + frame + "]");
        if (typeof receiverFunction === "function") {
            receiverFunction(that, frame);   
        }
    }
        
    setInterval(processTransmitQueue, 50);
    setInterval(processReceiveQueue, 50);
}

Transceiver.prototype.attach = function(signalPath) {
    if (!this.isAttached && signalPath instanceof SignalPath) {
        signalPath.attach(this);
        this.signalPath = signalPath;
        this.isAttached = true;        
    }
};

Transceiver.prototype.detach = function() {
    if (this.isAttached) {
        this.signalPath.detach(this);
        this.isAttached = false;
        this.signalPath = null;
    }
};

Transceiver.prototype.transmit = function(frame) {
    this.transmitQueue.push(frame);
};

Transceiver.prototype.receive = function(frame) {
    this.receiveQueue.push(frame);
};