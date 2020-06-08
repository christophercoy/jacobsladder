var fs = require('fs');
var file = fs.readFileSync('phonebook.txt');
var text = file.toString();

var name = process.argv[2];

var lines = text.split(/\r\n|\r/);

for(var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if(line.includes(name)) {
        var lineParts = line.split('^');
        console.log('phone number : ' + lineParts[1]);
        console.log('email address: ' + lineParts[2]);
    }
}


