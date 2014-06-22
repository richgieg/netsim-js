netsim-js
=========

This is a console-based network simulator written in JavaScript. The purpose of this project is to demonstrate how computer network protocols function while at the same time allowing me to explore the JavaScript language and hone my skills.

In order to execute main.js, you will need Node.js installed on your system.



To run this project, use the following command: 

node main.js


The program does not exit by itself, so you will need to press CTRL+C to end the Node.js process.



There are two demo functions in main.js:

1. simpleDemo() - this is the default and shows basic Layer 2 communication between two hosts
2. notSoSimpleDemo() - this one goes a bit further by adding more virtual network hardware to the mix

After briefly inspecting these functions you'll get the gist of it and can start building your own network demo using the objects I've written.



Currently there is only very basic Layer 1 and Layer 2 networking functionality. I plan on implementing Layer 3 and Layer 4 support soon. Also, I would like to eventually create a GUI using HTML/CSS. The GUI interface will allow adding, configuring and removing virtual network devices on the fly. It will also allow the user to build Ethernet frames, IP packets and TCP datagrams and transmit them using one of the host devices they add to their network layout. The user will also have the ability to enable packet capturing on any port.



Thanks for looking.


Sincerely,

Rich
