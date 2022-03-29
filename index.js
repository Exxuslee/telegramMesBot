const menu = require('./menu');
const telegram = require('./telegram');
const ikv = require('./ikv')
const fs = require('fs');
const  {spawn}  = require('child_process');
const wall = require('./wall');

let tags=[];

function time(){
    let interval = 5 * 60 + 60;
    let x = new Date(Date.now());
    return interval-(x.getMinutes()*60 + x.getSeconds()) % interval ;
}

function startTag(i){
//     console.log('\n'+tags[i].name);
    let bat = spawn('cmd', ['/c', `opc -h ${tags[i].host} -s ${tags[i].opc} -r ${tags[i].name}`]);

    bat.stdout.on('data', (data) => {
//        let str = data.slice(tag.name.length+5).toString();
//        str = str.split(' ')[0];
        data = data.toString();
        data = data.replace(/\s/g, '');
        data = parseFloat(data.split(tags[i].name)[1]);
//        console.log('#'+tags[i].name+': '+data+'#');

        if (data < tags[i].hl && !tags[i].zumerHL) {
            telegram.sendMessage(tags[i].msgFallHL, tags[i].topic);
            tags[i].zumerHL = true
        }
        if (data > tags[i].hl*1.2 && tags[i].zumerHL) {
            telegram.sendMessage(tags[i].msgRiseHL, tags[i].topic);
            tags[i].zumerHL = false
        }
		if (data < tags[i].hh && !tags[i].zumerHH) {
            telegram.sendMessage(tags[i].msgFallHH, tags[i].topic+1);
            tags[i].zumerHH = true
        }
        if (data > tags[i].hh*1.2 && tags[i].zumerHH) {
            telegram.sendMessage(tags[i].msgRiseHH, tags[i].topic+1);
            tags[i].zumerHH = false
        }

    });

//    bat.stderr.on('data', (data) => {
//        console.error(data.toString());
//    });
//    bat.on('exit', (code) => {
//        console.log(`Child exited with code ${code}`);
//    });
}


function startTags(interval) {
    for (let ii=0; ii< tags.length; ii++) {
        if (interval === tags[ii].interval) {
            startTag(ii)
        }
    }
}

function updateTags (contents){
    tags = JSON.parse(contents)
}



fs.readFile('./tags.json', 'utf8', function(err, contents) {
    updateTags(contents);
    setInterval(startTags, 1000, 1000);
    setInterval(startTags, 60000, 60000);
});
setInterval(ikv.startCurrents, 1000);
setInterval(ikv.equalCurrents, 60000);


function launchWall (){
	console.log('launchWall');
	setInterval(wall.startWall, 300000);
}

setTimeout(launchWall, time()*1000);



module.exports.refreshTag = function () {
    fs.readFile('./tags.json', 'utf8', function(err, contents) {
        updateTags(contents);
        console.log('Tags refreshed.. '+tags.length);
    });
};