const  {spawn, exec}  = require('child_process');
const  telegram  = require('./telegram');

let i;
let wallM7 = [];
let wallK7 = [];
let wallM8 = [];
let wallK8 = [];

let opc_data1_old = '111111111111111111111111111111111111111111111111111111111111111111';
let opc_data2_old = '111111111111111111111111111111111111111111111111111111111111111111';
let opc_data3_old = '111111111111111111111111111111111111111111111111111111111111111111';
let opc_data4_old = '111111111111111111111111111111111111111111111111111111111111111111';

let querry = 'opc -h 10.1.0.10 -s OPC.PHDServerDA.1 -r KC3.BAT7.K.CHARVAL KC3.BAT7.M.CHARVAL KC3.BAT8.K.CHARVAL KC3.BAT8.M.CHARVAL';

for (i=0; i < 74; i++){
    if (i%10 === 0) i++;
    wallK7.push('K7'+i.toString().padStart(2,'0'));
    wallM7.push('M7'+i.toString().padStart(2,'0'));
    wallK8.push('K8'+i.toString().padStart(2,'0'));
    wallM8.push('M8'+i.toString().padStart(2,'0'));	
}

module.exports.startWall = function () {
//function startWall(){
//    console.log('startWall');

//    let bat1 = spawn('cmd', ['/c', querry]);
    try {
        exec(querry, (error, opc_data, stderr) => {
            opc_data = opc_data.toString();
            console.log(opc_data);
            function todo () {

                let out_message7 = 'Отключены простенки № ';
                let out_message8 = 'Отключены простенки № ';
                let out_message7rise = 'Внимание! Включить простенки № ';
                let out_message8rise = 'Внимание! Включить простенки № ';
                let opc_data1 = opc_data.replace(/\s/g, '').split('KC3.BAT7.K.CHARVAL')[1].slice(0,66);
                let opc_data2 = opc_data.replace(/\s/g, '').split('KC3.BAT7.M.CHARVAL')[1].slice(0,66);
                let opc_data3 = opc_data.replace(/\s/g, '').split('KC3.BAT8.K.CHARVAL')[1].slice(0,66);
                let opc_data4 = opc_data.replace(/\s/g, '').split('KC3.BAT8.M.CHARVAL')[1].slice(0,66);


                for (i=0; i<66; i++){
                    if (opc_data1[i]==='0' && opc_data2[i] === '0' &&
                        opc_data1_old[i] === '1' && opc_data2_old[i] === '1') out_message7 += 'K' + wallM7[i] + ', ';
                    else {
                        if (opc_data1[i] === '0' && opc_data1_old[i] === '1') out_message7 += wallK7[i] + ', ';
                        if (opc_data2[i] === '0' && opc_data2_old[i] === '1') out_message7 += wallM7[i] + ', ';
                    }

                    if (opc_data3[i]==='0' && opc_data4[i] === '0' &&
                        opc_data3_old[i] === '1' && opc_data4_old[i] === '1') out_message8 += 'K' + wallM8[i] + ', ';
                    else {
                        if (opc_data3[i] === '0' && opc_data3_old[i] === '1') out_message8 += wallK8[i] + ', ';
                        if (opc_data4[i] === '0' && opc_data4_old[i] === '1') out_message8 += wallM8[i] + ', ';
                    }

                    if (opc_data1[i]==='1' && opc_data2[i] === '1' &&
                        opc_data1_old[i] === '0' && opc_data2_old[i] === '0') out_message7rise += 'K' + wallM7[i] + ', ';
                    else {
                        if (opc_data1[i] === '1' && opc_data1_old[i] === '0') out_message7rise += wallK7[i] + ', ';
                        if (opc_data2[i] === '1' && opc_data2_old[i] === '0') out_message7rise += wallM7[i] + ', ';
                    }

                    if (opc_data3[i]==='1' && opc_data4[i] === '1' &&
                        opc_data3_old[i] === '0' && opc_data4_old[i] === '0') out_message8rise += 'K' + wallM8[i] + ', ';
                    else {
                        if (opc_data3[i] === '1' && opc_data3_old[i] === '0') out_message8rise += wallK8[i] + ', ';
                        if (opc_data4[i] === '1' && opc_data4_old[i] === '0') out_message8rise += wallM8[i] + ', ';
                    }

                }
                out_message7 = out_message7.slice(0,-2);
                if (out_message7.length > 22)    {
                    //           console.log(out_message);
                    telegram.sendMessage(out_message7, 4);
                }
                out_message8 = out_message8.slice(0,-2);
                if (out_message8.length > 22)    {
                    telegram.sendMessage(out_message8, 4);
                }

                out_message7rise = out_message7rise.slice(0,-2);
                if (out_message7rise.length > 32)    {
                    telegram.sendMessage(out_message7rise, 4);
                }
                out_message8rise = out_message8rise.slice(0,-2);
                if (out_message8rise.length > 32)    {
                    telegram.sendMessage(out_message8rise, 4);
                }

                opc_data1_old = opc_data1;
                opc_data2_old = opc_data2;
                opc_data3_old = opc_data3;
                opc_data4_old = opc_data4;

            }
            if (opc_data.length > 66) todo()
        });
    } catch (e) {
        console.log(`$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$`);
    }


 //    bat1.stdout.on('data', (opc_data) => {
 //        opc_data = opc_data.toString();
 // //       console.log(opc_data);
 //
 //        let out_message7 = 'Отключены простенки № ';
	// 	let out_message8 = 'Отключены простенки № ';
 //        let out_message7rise = 'Внимание! Включить простенки № ';
 //        let out_message8rise = 'Внимание! Включить простенки № ';
 //        let opc_data1 = opc_data.replace(/\s/g, '').split('KC3.BAT7.K.CHARVAL')[1].slice(0,66);
 //        let opc_data2 = opc_data.replace(/\s/g, '').split('KC3.BAT7.M.CHARVAL')[1].slice(0,66);
	// 	let opc_data3 = opc_data.replace(/\s/g, '').split('KC3.BAT8.K.CHARVAL')[1].slice(0,66);
 //        let opc_data4 = opc_data.replace(/\s/g, '').split('KC3.BAT8.M.CHARVAL')[1].slice(0,66);
	//
 //
 //        for (i=0; i<66; i++){
 //            if (opc_data1[i]==='0' && opc_data2[i] === '0' &&
 //                opc_data1_old[i] === '1' && opc_data2_old[i] === '1') out_message7 += 'K' + wallM7[i] + ', ';
 //            else {
 //                if (opc_data1[i] === '0' && opc_data1_old[i] === '1') out_message7 += wallK7[i] + ', ';
 //                if (opc_data2[i] === '0' && opc_data2_old[i] === '1') out_message7 += wallM7[i] + ', ';
 //            }
	//
	// 		if (opc_data3[i]==='0' && opc_data4[i] === '0' &&
 //                opc_data3_old[i] === '1' && opc_data4_old[i] === '1') out_message8 += 'K' + wallM8[i] + ', ';
 //            else {
 //                if (opc_data3[i] === '0' && opc_data3_old[i] === '1') out_message8 += wallK8[i] + ', ';
 //                if (opc_data4[i] === '0' && opc_data4_old[i] === '1') out_message8 += wallM8[i] + ', ';
 //            }
 //
 //            if (opc_data1[i]==='1' && opc_data2[i] === '1' &&
 //                opc_data1_old[i] === '0' && opc_data2_old[i] === '0') out_message7rise += 'K' + wallM7[i] + ', ';
 //            else {
 //                if (opc_data1[i] === '1' && opc_data1_old[i] === '0') out_message7rise += wallK7[i] + ', ';
 //                if (opc_data2[i] === '1' && opc_data2_old[i] === '0') out_message7rise += wallM7[i] + ', ';
 //            }
 //
 //            if (opc_data3[i]==='1' && opc_data4[i] === '1' &&
 //                opc_data3_old[i] === '0' && opc_data4_old[i] === '0') out_message8rise += 'K' + wallM8[i] + ', ';
 //            else {
 //                if (opc_data3[i] === '1' && opc_data3_old[i] === '0') out_message8rise += wallK8[i] + ', ';
 //                if (opc_data4[i] === '1' && opc_data4_old[i] === '0') out_message8rise += wallM8[i] + ', ';
 //            }
	//
 //        }
 //        out_message7 = out_message7.slice(0,-2);
 //        if (out_message7.length > 22)    {
 // //           console.log(out_message);
 //            telegram.sendMessage(out_message7, 4);
 //        }
	//     out_message8 = out_message8.slice(0,-2);
 //        if (out_message8.length > 22)    {
 //            telegram.sendMessage(out_message8, 4);
 //        }
 //
 //        out_message7rise = out_message7rise.slice(0,-2);
 //        if (out_message7rise.length > 32)    {
 //            telegram.sendMessage(out_message7rise, 4);
 //        }
 //        out_message8rise = out_message8rise.slice(0,-2);
 //        if (out_message8rise.length > 32)    {
 //            telegram.sendMessage(out_message8rise, 4);
 //        }
	//
	// 	opc_data1_old = opc_data1;
 //        opc_data2_old = opc_data2;
 //        opc_data3_old = opc_data3;
 //        opc_data4_old = opc_data4;
	//
 //    });
};

//startWall();

