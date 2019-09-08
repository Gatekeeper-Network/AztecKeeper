

const SerialPort = require('serialport')

const serialPath = "/dev/ttyUSB0"

const serialport = new SerialPort(serialPath, {baudRate: 115200 })

console.log("serial")

// const parser = serialport.pipe(new Readline({delimiter:'\r'}))
//
// parser.on('data', console.log)

function writestuff(string) {
    serialport.write('signed proof from host', function (e) {
        if (e) {
            console.log("error: ", e);
        }
        console.log("msg written");
    })
}


//
//     console.log("Serial Open Error:\n", e.message)
// })
// serialport.on('readable', function(){
//     console.log('Got Data from serial:\n', serialport.read())
//
//
//
// })

// const readlineParser = new Readline();
//
// port.pipe(readlineParser);

// readlineParser.on('data', console.log);



// serialport.on('data')



module.exports = writestuff();