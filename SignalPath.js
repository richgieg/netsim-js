module.exports = SignalPath;

function SignalPath() {
    this.transceivers = [];
}

SignalPath.prototype.attach = function(transceiver) {
    this.transceivers.push(transceiver);
};

SignalPath.prototype.detach = function(transceiver) {
    for (var i in this.transceivers) {
        if (this.transceivers[i] === transceiver) {
            this.transceivers.splice(i, 1);
            break;
        }
    }
};

SignalPath.prototype.transmit = function(sourceTransceiver, frame) {
    for (var i in this.transceivers) {
        if (this.transceivers[i] !== sourceTransceiver) {
            this.transceivers[i].receive(frame);
        }
    }
};