const  telegram  = require('./telegram');
const net = require('net');

let i;
let ikv01 = new Array(180);
let ikv02 = new Array(180);
let ikv03 = new Array(180);
let ikv04 = new Array(180);
let ikv05 = new Array(180);
let ikv06 = new Array(180);
let ikv07 = new Array(180);
let ikv08 = new Array(180);
let ikv09 = new Array(180);
let ikv10 = new Array(180);
let ikv11 = new Array(180);
let ikv12 = new Array(180);
let ikv13 = new Array(180);
let ikv01_planir = new Array(180);
let ikv02_planir = new Array(180);
let ikv03_planir = new Array(180);
let ikv04_planir = new Array(180);
let ikv05_planir = new Array(180);
let ikv06_planir = new Array(180);
let ikv07_planir = new Array(180);
let ikv08_planir = new Array(180);
let ikv09_planir = new Array(180);
let ikv10_planir = new Array(180);
let ikv11_planir = new Array(180);
let ikv12_planir = new Array(180);
let ikv13_planir = new Array(180);
let pkv01 = 0;
let pkv02 = 0;
let pkv03 = 0;
let pkv04 = 0;
let pkv05 = 0;
let pkv06 = 0;
let pkv07 = 0;
let pkv08 = 0;
let pkv09 = 0;
let pkv10 = 0;
let pkv11 = 0;
let pkv12 = 0;
let pkv13 = 0;

const fistCycle = 180;
let  count01 = fistCycle;
let  count02 = fistCycle;
let  count03 = fistCycle;
let  count04 = fistCycle;
let  count05 = fistCycle;
let  count06 = fistCycle;
let  count07 = fistCycle;
let  count08 = fistCycle;
let  count09 = fistCycle;
let  count10 = fistCycle;
let  count11 = fistCycle;
let  count12 = fistCycle;
let  count13 = fistCycle;
let  count01_planir = fistCycle;
let  count02_planir = fistCycle;
let  count03_planir = fistCycle;
let  count04_planir = fistCycle;
let  count05_planir = fistCycle;
let  count06_planir = fistCycle;
let  count07_planir = fistCycle;
let  count08_planir = fistCycle;
let  count09_planir = fistCycle;
let  count10_planir = fistCycle;
let  count11_planir = fistCycle;
let  count12_planir = fistCycle;
let  count13_planir = fistCycle;

const tags =
    'Node1.Device1.KV1_POS ' +
    'Node1.Device1.KV2_POS ' +
    'Node1.Device1.KV3_POS ' +
    'Node1.Device1.KV4_POS ' +
    'Node1.Device1.KV5_POS ' +
    'Node1.Device1.KV6_POS ' +
    'Node1.Device1.KV7_POS ' +
    'Node1.Device1.KV8_POS ' +
    'Node1.Device1.KV9_POS ' +
    'Node1.Device1.KV10_POS ' +
    'Node1.Device1.KV11_POS ' +
    'Node1.Device1.KV12_POS ' +
    'Node1.Device1.KV13_POS ' +
    'ServerCom201.KC1_KV1.I_kv_shtangi ' +
    'ServerCom202.KC1_KV2.I_kv_shtangi ' +
    'ServerCom203.KC1_KV3.I_kv_shtangi ' +
    'ServerCom204.KC1_KV4.I_kv_shtangi ' +
    'ServerCom205.KC1_KV5.I_kv_shtangi ' +
    'ServerCom206.KC2_KV6.I_kv_shtangi ' +
    'ServerCom207.KC2_KV7.I_kv_shtangi ' +
    'ServerCom208.KC2_KV8.I_kv_shtangi ' +
    'ServerCom209.KC3_KV9.I_kv_shtangi ' +
    'ServerCom210.KC3_KV10.I_kv_shtangi ' +
    'ServerCom211.KC3_KV11.I_kv_shtangi ' +
    'ServerCom212.KC4_KV12.I_kv_shtangi ' +
    'ServerCom213.KC4_KV13.I_kv_shtangi ' +
    'ServerCom201.KC1_KV1.I_kv_planira ' +
    'ServerCom202.KC1_KV2.I_kv_planira ' +
    'ServerCom203.KC1_KV3.I_kv_planira ' +
    'ServerCom204.KC1_KV4.I_kv_planira ' +
    'ServerCom205.KC1_KV5.I_kv_planira ' +
    'ServerCom206.KC2_KV6.I_kv_AI3 ' +
    'ServerCom207.KC2_KV7.I_kv_planira ' +
    'ServerCom208.KC2_KV8.I_kv_AI3 ' +
    'ServerCom209.KC3_KV9.I_kv_planira ' +
    'ServerCom210.KC3_KV10.I_kv_planira ' +
    'ServerCom211.KC3_KV11.I_kv_planira ' +
    'ServerCom212.KC4_KV12.I_kv_planira ' +
    'ServerCom213.KC4_KV13.I_kv_planira';


module.exports.startCurrents = function () {
    try {
        const client = net.createConnection({ port: 3210 }, () => {
            // 'connect' listener.
            console.log('connected to server!');
            client.write(tags);
        });

        client.on('data', (data) => {
            data = JSON.parse(data);
            client.end();
            pkv01 = parseInt(data[0]);
            pkv02 = parseInt(data[1]);
            pkv03 = parseInt(data[2]);
            pkv04 = parseInt(data[3]);
            pkv05 = parseInt(data[4]);
            pkv06 = parseInt(data[5]);
            pkv07 = parseInt(data[6]);
            pkv08 = parseInt(data[7]);
            pkv09 = parseInt(data[8]);
            pkv10 = parseInt(data[9]);
            pkv11 = parseInt(data[10]);
            pkv12 = parseInt(data[11]);
            pkv13 = parseInt(data[12]);

            ikv01.shift();
            ikv02.shift();
            ikv03.shift();
            ikv04.shift();
            ikv05.shift();
            ikv06.shift();
            ikv07.shift();
            ikv08.shift();
            ikv09.shift();
            ikv10.shift();
            ikv11.shift();
            ikv12.shift();
            ikv13.shift();

            ikv01_planir.shift();
            ikv02_planir.shift();
            ikv03_planir.shift();
            ikv04_planir.shift();
            ikv05_planir.shift();
            ikv06_planir.shift();
            ikv07_planir.shift();
            ikv08_planir.shift();
            ikv09_planir.shift();
            ikv10_planir.shift();
            ikv11_planir.shift();
            ikv12_planir.shift();
            ikv13_planir.shift();

            ikv01.push(parseInt(data[13]));
            ikv02.push(parseInt(data[14]));
            ikv03.push(parseInt(data[15]));
            ikv04.push(parseInt(data[16]));
            ikv05.push(parseInt(data[17]));
            ikv06.push(parseInt(data[18]));
            ikv07.push(parseInt(data[19]));
            ikv08.push(parseInt(data[20]));
            ikv09.push(parseInt(data[21]));
            ikv10.push(parseInt(data[22]));
            ikv11.push(parseInt(data[23]));
            ikv12.push(parseInt(data[24]));
            ikv13.push(parseInt(data[25]));

            ikv01_planir.push(parseInt(data[26]));
            ikv02_planir.push(parseInt(data[27]));
            ikv03_planir.push(parseInt(data[28]));
            ikv04_planir.push(parseInt(data[29]));
            ikv05_planir.push(parseInt(data[30]));
            ikv06_planir.push(parseInt(data[31]));
            ikv07_planir.push(parseInt(data[32]));
            ikv08_planir.push(parseInt(data[33]));
            ikv09_planir.push(parseInt(data[34]));
            ikv10_planir.push(parseInt(data[35]));
            ikv11_planir.push(parseInt(data[36]));
            ikv12_planir.push(parseInt(data[37]));
            ikv13_planir.push(parseInt(data[38]));

            if (count01 > 0) count01--;
            if (count02 > 0) count02--;
            if (count03 > 0) count03--;
            if (count04 > 0) count04--;
            if (count05 > 0) count05--;
            if (count06 > 0) count06--;
            if (count07 > 0) count07--;
            if (count08 > 0) count08--;
            if (count09 > 0) count09--;
            if (count10 > 0) count10--;
            if (count11 > 0) count11--;
            if (count12 > 0) count12--;
            if (count13 > 0) count13--;

            if (count01_planir > 0) count01_planir--;
            if (count02_planir > 0) count02_planir--;
            if (count03_planir > 0) count03_planir--;
            if (count04_planir > 0) count04_planir--;
            if (count05_planir > 0) count05_planir--;
            if (count06_planir > 0) count06_planir--;
            if (count07_planir > 0) count07_planir--;
            if (count08_planir > 0) count08_planir--;
            if (count09_planir > 0) count09_planir--;
            if (count10_planir > 0) count10_planir--;
            if (count11_planir > 0) count11_planir--;
            if (count12_planir > 0) count12_planir--;
            if (count13_planir > 0) count13_planir--;


        });

        client.on('end', () => {
        });

        client.on('error', (err) => {
            console.log('error^ '+ err);
        });
        }
        catch (e) {
        console.log(`!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`);
    }
};


module.exports.equalCurrents = function () {
    //console.log(pkv01, pkv02,pkv03,pkv04,pkv05,pkv06,pkv07,pkv08,pkv09,pkv10,pkv11,pkv12,pkv13);
    //console.log('\n'+ikv01, '\n'+ikv02,'\n'+ikv03,'\n'+ikv04,'\n'+ikv05,'\n'+ikv06,'\n'+ikv07,'\n'+ikv08,'\n'+ikv09,'\n'+ikv10,'\n'+ikv11,'\n'+ikv12,'\n'+ikv13);
    //console.log('\n'+ikv01_planir, '\n'+ikv02_planir,'\n'+ikv03_planir,'\n'+ikv04_planir,'\n'+ikv05_planir,'\n'+ikv06_planir,'\n'+ikv07_planir,'\n'+ikv08_planir,'\n'+ikv09_planir,'\n'+ikv10_planir,'\n'+ikv11_planir,'\n'+ikv12_planir,'\n'+ikv13_planir);


    function check_current(array, num_kv, pos) {
        let Imax = 0;
        for (let i = 20; i < 80; ++i) {
            if (array[i] > Imax) Imax = array[i];
        }

        if (Imax >= 240 && num_kv === 1) {
            telegram.sendPicture(pos, Imax, array, num_kv, 'press', Imax>600?1:0);
            count01=fistCycle;
        }
        if (Imax >= 240 && num_kv === 2) {
            telegram.sendPicture(pos, Imax, array, num_kv, 'press', Imax>600?1:0);
            count02=fistCycle;
        }
        if (Imax >= 240 && num_kv === 3) {
            telegram.sendPicture(pos, Imax, array, num_kv, 'press', Imax>600?1:0);
            count03=fistCycle;
        }
        if (Imax >= 240 && num_kv === 4) {
            telegram.sendPicture(pos, Imax, array, num_kv, 'press', Imax>600?1:0);
            count04=fistCycle;
        }
        if (Imax >= 240 && num_kv === 5) {
            telegram.sendPicture(pos, Imax, array, num_kv, 'press', Imax>600?1:0);
            count05=fistCycle;
        }
        if (Imax >= 240 && num_kv === 6) {
            telegram.sendPicture(pos, Imax, array, num_kv, 'press', Imax>500?3:2);
            count06=fistCycle;
        }
        if (Imax >= 240 && num_kv === 7) {
            telegram.sendPicture(pos, Imax, array, num_kv, 'press', Imax>500?3:2);
            count07=fistCycle;
        }
        if (Imax >= 240 && num_kv === 8) {
            telegram.sendPicture(pos, Imax, array, num_kv, 'press', Imax>500?3:2);
            count08=fistCycle;
        }
        if (Imax >= 340 && num_kv === 9) {
            telegram.sendPicture(pos, Imax, array, num_kv, 'press', Imax>600?5:4);
            count09=fistCycle;
        }
        if (Imax >= 340 && num_kv === 10) {
            telegram.sendPicture(pos, Imax, array, num_kv, 'press', Imax>600?5:4);
            count10=fistCycle;
        }
        if (Imax >= 340 && num_kv === 11) {
            telegram.sendPicture(pos, Imax, array, num_kv, 'press', Imax>600?5:4);
            count11=fistCycle;
        }
        if (Imax >= 340 && num_kv === 12) {
            telegram.sendPicture(pos, Imax, array, num_kv, 'press', Imax>600?7:6);
            count12=fistCycle;
        }
        if (Imax >= 340 && num_kv === 13) {
            telegram.sendPicture(pos, Imax, array, num_kv, 'press', Imax>600?7:6);
            count13=fistCycle;
        }
        if (Imax >= 50 && Imax < 340 && num_kv === 12) {
            telegram.sendPicture(pos, Imax, array, num_kv, 'press', 14);
            count12=fistCycle;
        }
        if (Imax >= 50 && Imax < 340 && num_kv === 13) {
            telegram.sendPicture(pos, Imax, array, num_kv, 'press', 14);
            count13=fistCycle;
        }
    }

    function check_current_planir(array, num_kv, pos) {
        let Imax = 0;
        for (let i = 60; i < 120; ++i) {
            if (array[i] > Imax) Imax = array[i];
        }

        if (Imax >= 400 && num_kv === 1) {
            telegram.sendPicture(pos, Imax, array, num_kv, 'planir',8);
            count01_planir=fistCycle;
        }
        if (Imax >= 400 && num_kv === 2) {
            telegram.sendPicture(pos, Imax, array, num_kv, 'planir',8);
            count02_planir=fistCycle;
        }
        if (Imax >= 400 && num_kv === 3) {
            telegram.sendPicture(pos, Imax, array, num_kv, 'planir',8);
            count03_planir=fistCycle;
        }
        if (Imax >= 400 && num_kv === 4) {
            telegram.sendPicture(pos, Imax, array, num_kv, 'planir',8);
            count04_planir=fistCycle;
        }
        if (Imax >= 400 && num_kv === 5) {
            telegram.sendPicture(pos, Imax, array, num_kv, 'planir',8);
            count05_planir=fistCycle;
        }
        if (Imax >= 400 && num_kv === 6) {
            telegram.sendPicture(pos, Imax, array, num_kv, 'planir',10);
            count06_planir=fistCycle;
        }
        if (Imax >= 400 && num_kv === 7) {
            telegram.sendPicture(pos, Imax, array, num_kv, 'planir',10);
            count07_planir=fistCycle;
        }
        if (Imax >= 400 && num_kv === 8) {
            telegram.sendPicture(pos, Imax, array, num_kv, 'planir',10);
            count08_planir=fistCycle;
        }
        if (Imax >= 600 && num_kv === 9) {
            telegram.sendPicture(pos, Imax, array, num_kv, 'planir',12);
            count09_planir=fistCycle;
        }
        if (Imax >= 600 && num_kv === 10) {
            telegram.sendPicture(pos, Imax, array, num_kv, 'planir',12);
            count10_planir=fistCycle;
        }
        if (Imax >= 600 && num_kv === 11) {
            telegram.sendPicture(pos, Imax, array, num_kv, 'planir',12);
            count11_planir=fistCycle;
        }
        if (Imax >= 600 && num_kv === 12) {
            telegram.sendPicture(pos, Imax, array, num_kv, 'planir',14);
            count12_planir=fistCycle;
        }
        if (Imax >= 600 && num_kv === 13) {
            telegram.sendPicture(pos, Imax, array, num_kv, 'planir',14);
            count13_planir=fistCycle;
        }
    }


    if (!count01) check_current(ikv01, 1, pkv01);
    if (!count02) check_current(ikv02, 2, pkv02);
    if (!count03) check_current(ikv03, 3, pkv03);
    if (!count04) check_current(ikv04, 4, pkv04);
    if (!count05) check_current(ikv05, 5, pkv05);
    if (!count06) check_current(ikv06, 6, pkv06);
    if (!count07) check_current(ikv07, 7, pkv07);
    if (!count08) check_current(ikv08, 8, pkv08);
    if (!count09) check_current(ikv09, 9, pkv09);
    if (!count10) check_current(ikv10, 10, pkv10);
    if (!count11) check_current(ikv11, 11, pkv11);
    if (!count12) check_current(ikv12, 12, pkv12);
    if (!count13) check_current(ikv13, 13, pkv13);

    if (!count01_planir) check_current_planir(ikv01_planir, 1, pkv01);
    if (!count02_planir) check_current_planir(ikv02_planir, 2, pkv02);
    if (!count03_planir) check_current_planir(ikv03_planir, 3, pkv03);
    if (!count04_planir) check_current_planir(ikv04_planir, 4, pkv04);
    if (!count05_planir) check_current_planir(ikv05_planir, 5, pkv05);
    if (!count06_planir) check_current_planir(ikv06_planir, 6, pkv06);
    if (!count07_planir) check_current_planir(ikv07_planir, 7, pkv07);
    if (!count08_planir) check_current_planir(ikv08_planir, 8, pkv08);
    if (!count09_planir) check_current_planir(ikv09_planir, 9, pkv09);
    if (!count10_planir) check_current_planir(ikv10_planir, 10, pkv10);
    if (!count11_planir) check_current_planir(ikv11_planir, 11, pkv11);
    if (!count12_planir) check_current_planir(ikv12_planir, 12, pkv12);
    if (!count13_planir) check_current_planir(ikv13_planir, 13, pkv13);
};