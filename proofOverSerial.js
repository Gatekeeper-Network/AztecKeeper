const SerialPort = require('serialport')

const serialPath = "/dev/ttyUSB0"

const serialport = new SerialPort(serialPath, {baudRate: 11520 })


//read from serial


//write to serial
//serial port open errors
console.log("serial")

serialport.on('error', function(e){
    console.log("Serial Open Error:\n", e.message)
})
serialport.on('readable', function(){
    console.log('Got Data from serial:\n', serialport.read())
})

// serialport.on('data')
// serialport.write("Hello from AztecKeeper");



