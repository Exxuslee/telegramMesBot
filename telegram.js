process.env.NTBA_FIX_319 = 1;

const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
let serviceAccount = require("./env.json");

let j;
let users = JSON.parse(fs.readFileSync('./users.json'));

const token = serviceAccount.token;

const bot = new TelegramBot(token, {polling: true});

function save() {
    fs.writeFile('./users.json', JSON.stringify(users),
        function (err) {
            if (err) {
                console.error('Crap happens');
            }
        }
    );
}

function status(id, pos) {
    let ok = '❌';
    for (j in users) if (users[j].id === id && users[j].topic[pos]) ok = '✅';
    return ok
}

function newQuestion(msg){
    const arr = {
        title: 'Welcome, bro',
        buttons: [
            [{text: 'КЦ-1, пов '+status(msg.from.id, 0), callback_data: 0}, {text: 'КЦ-1, макс '+status(msg.from.id, 1), callback_data: 1}],
            [{text: 'КЦ-2, пов '+status(msg.from.id, 2), callback_data: 2}, {text: 'КЦ-2, макс '+status(msg.from.id, 3), callback_data: 3}],
            [{text: 'КЦ-3, пов '+status(msg.from.id, 4), callback_data: 4}, {text: 'КЦ-3, макс '+status(msg.from.id, 5), callback_data: 5}],
            [{text: 'КЦ-4, пов '+status(msg.from.id, 6), callback_data: 6}, {text: 'КЦ-4, макс '+status(msg.from.id, 7), callback_data: 7}],
            [{text: 'ТЭЦ, сиг '+status(msg.from.id, 8), callback_data: 8}, {text: 'ТЭЦ, авар '+status(msg.from.id, 9), callback_data: 9}],
            [{text: 'Ул1, сиг '+status(msg.from.id, 10), callback_data: 10}, {text: 'Ул1, авар '+status(msg.from.id, 11), callback_data: 11}],
        ]
    };
    const text = arr.title;
    var options = {
        reply_markup: JSON.stringify({
            inline_keyboard: arr.buttons,
            parse_mode: 'Markdown'
        })
    };
    chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
    bot.sendMessage(chat, text, options);
}

bot.onText(/\/start/, function (msg, match) {
    let new_user= true;
    for (j in users) {
        if (users[j].id  === msg.from.id) new_user = false;
    }
    if (new_user) {
        users.push({
            "id": msg.from.id,
            "topic":[true,true,true,true,true,true,true,true,
                true,true,true,true],
            "first_name": msg.from.first_name,
            "last_name": msg.from.last_name,
            "username": msg.from.username});
        save()
    }
    newQuestion(msg);
});

bot.onText(/\/stop/, function (msg, match) {
    bot.stopPolling().then(r => console.log(r))

});

bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  console.log(resp);
  bot.sendMessage(chatId, resp);
});


bot.on('callback_query', function (msg) {
    for (j in users) {
        if (users[j].id === msg.from.id) {
            users[j].topic[msg.data] = !users[j].topic[msg.data];
            if (users[j].topic[msg.data]) bot.sendMessage(msg.from.id, 'Уведомление включено ✅');
            else bot.sendMessage(msg.from.id, 'Уведомление выключено ❌');
            save()
        }
    }
});


async function picture(array, ikv, node) {
    const canvas = createCanvas(180, 91);
    const ctx = canvas.getContext('2d');
    const myImageData = ctx.createImageData(canvas.width, canvas.height);
    ctx.rect(0, 0, 180, 91);
    ctx.fillStyle = "gray";
    ctx.fill();

    let w = canvas.width;
    let h = canvas.height;


    const pixels = ctx.getImageData(
        0, 0, canvas.width, canvas.height
    );
    const all = pixels.data.length;
    const data = pixels.data;
    for (let i= 0; i < w*4; i += 4) {
        data[w*4*16+i] = 255;
        data[w*4*16+i+1] = 255;
        data[w*4*16+i+2] = 255;
        data[w*4*16+i+3] = 255;
        data[w*4*31+i] = 255;
        data[w*4*31+i+1] = 255;
        data[w*4*31+i+2] = 255;
        data[w*4*31+i+3] = 255;
        data[w*4*46+i] = 255;
        data[w*4*46+i+1] = 255;
        data[w*4*46+i+2] = 255;
        data[w*4*46+i+3] = 211;
        data[w*4*61+i] = 255;
        data[w*4*61+i+1] = 255;
        data[w*4*61+i+2] = 255;
        data[w*4*61+i+3] = 255;
        data[w*4*76+i] = 255;
        data[w*4*76+i+1] = 255;
        data[w*4*76+i+2] = 255;
        data[w*4*76+i+3] = 255;
    }

// for (x in 0 until w) {
//     for (y in 0 until h) {
//         if (y <= result[x]*0.15) bitmap.setPixel(x, h-y-1, Color.BLUE)
//     }
// }
    let ii=0;
    for (let i=0; i < w*4; i+= 4) {
        let jj=0;
        for (let j=0; j < all; j+=720) {
            if (jj >= 90-array[ii]*0.15) {
                data[i+j] = 0;
                if (node === 'press') {
                    data[i+j+1] = 0;
                    data[i+j+2] = 255;
                }
                if (node === 'planir') {
                    data[i+j+1] = 64;
                    data[i+j+2] = 32;
                }
                data[i+j+3] = 200;
            }
            jj++
        }
        ii++
    }

    for (let i= 0; i < w*4; i += 4) {
        data[w*4*90+i] = 0;
        data[w*4*90+i+1] = 0;
        data[w*4*90+i+2] = 0;
        data[w*4*90+i+3] = 255;
    }

    ctx.putImageData(pixels, 0, 0);

    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync('./kvpng/'+ikv+'.png', buffer);
}

function testUser(id, mes) {
 if (id !== mes) console.log("\nюзера нет: "+id+"\n")
}


module.exports.sendPicture = function (num_bake, Imax, array, ikv, node, topic_now) {
    // console.log(num_bake + '  ' + Imax + ' ' +node);
    // if (num_bake > 899 && Imax >= 600) topic_now = 7;
    // else if (num_bake > 899 && Imax >= 340) topic_now = 6;
    // else if (num_bake > 699 && Imax >= 600) topic_now = 5;
    // else if (num_bake > 699 && Imax >= 340) topic_now = 4;
    // else if (num_bake > 499 && Imax >= 500) topic_now = 3;
    // else if (num_bake > 499 && Imax >= 240) topic_now = 2;
    // else if (num_bake > 99 && Imax >= 600) topic_now = 1;
    // else if (num_bake > 99 && Imax >= 240) topic_now = 0;


    let message = '';
    if (node === 'press') message = "Печь №"+num_bake+", КВ-"+ikv+", Imax "+Imax+"А прессштанги";
    if (node === 'planir') {
        message = "Печь на выдаче №"+num_bake+", КВ-"+ikv+", Imax "+Imax+"А планира";
//        topic_now = topic_now+8;
    }

    picture(array, ikv, node).then(r =>  {
        for (j=0; j<users.length; j++){
            if (users[j].topic[topic_now]) {
                if (users[j].valid) bot.sendPhoto(users[j].id, './kvpng/'+ikv+'.png', {caption: message}).then(r => testUser(users[j].id, r.chat.id));
                else bot.sendMessage(users[j].id, 'Обратитесь в ЦАТП для прохождения валидации').then(r => testUser(users[j].id, r.chat.id));
            }
        }
    })
};

module.exports.sendMessage = function (message, topic) {
    for (j=0; j<users.length; j++){
        if (users[j].topic[topic]) {
            if (users[j].valid) bot.sendMessage(users[j].id, message).then(r => testUser(users[j].id, r.chat.id));
            else bot.sendMessage(users[j].id, 'Обратитесь в ЦАТП для прохождения валидации').then(r => testUser(users[j].id, r.chat.id));
        }
    }
};

module.exports.refreshUsers = function () {
    fs.readFile('./users.json', 'utf8', function(err, contents) {
        users = JSON.parse(contents);
        console.log('Users refreshed..'+ users.length)
    });
};