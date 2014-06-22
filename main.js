var SignalPath = require("./SignalPath");
var Transceiver = require("./Transceiver");
var Hub = require("./Hub");
var Switch = require("./Switch");
var Host = require("./Host");
var Frame = require("./Frame");


function simpleDemo() {
    var pc1 = new Host("PC1", "FC:AA:AA:00:00:00");
    var pc2 = new Host("PC2", "FC:AA:AA:00:00:01");
    var cable1 = new SignalPath();

    pc1.port.attach(cable1);
    pc2.port.attach(cable1);
    
    pc1.transmitLayer2(pc2.macAddress, "Hi PC2, I'm PC1");
    pc2.transmitLayer2("FC:AA:AA:12:34:56", "Hi PC1, I'm PC2")
}

function notSoSimpleDemo() {
    var pc1 = new Host("PC1", "FC:AA:AA:00:00:00");
    var pc2 = new Host("PC2", "FC:AA:AA:00:00:01");
    var pc3 = new Host("PC3", "FC:AA:AA:00:00:02");
    
    var hub1 = new Hub("Hub1", 4);
    var switch1 = new Switch("Switch1", 4);
    
    var cable1 = new SignalPath();
    var cable2 = new SignalPath();
    var cable3 = new SignalPath();
    var cable4 = new SignalPath();
    
    pc1.port.attach(cable1);
    hub1.ports[0].attach(cable1);
    
    pc2.port.attach(cable2);
    switch1.ports[0].attach(cable2);
    
    hub1.ports[3].attach(cable3);
    switch1.ports[3].attach(cable3);
    
    pc3.port.attach(cable4);
    switch1.ports[1].attach(cable4);
    
    pc1.transmitLayer2(pc2.macAddress, "hi world");
    pc3.transmitLayer2(pc1.macAddress, "hi universe");
    pc1.transmitLayer2(pc3.macAddress, "hi multiverse");  
}

simpleDemo();