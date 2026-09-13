//ส่วนที่ 1: สร้างตัวแปร
const typeofString = "สวัสดี";
const typeofNumber = 1;
const typeofBoolean = true;
const typeofUndefined = undefined;
const typeofNull = null;
const typeofArray = [0 ,1 ,2 ];

//แสดงค่าคู่กับชนิดของแต่ละตัว
console.log(`ค่า: ${typeofString} | ชนิด: ${typeof typeofString}`);
console.log(`ค่า: ${typeofNumber} | ชนิด: ${typeof typeofNumber}`);
console.log(`ค่า: ${typeofBoolean} | ชนิด: ${typeof typeofBoolean}`);
console.log(`ค่า: ${typeofUndefined} | ชนิด: ${typeof typeofUndefined}`);
console.log(`ค่า: ${typeofNull} | ชนิด: ${typeof typeofNull}`);
console.log(`ค่า: ${typeofArray} | ชนิด: ${typeof typeofArray}\n`);


//ส่วนที่ 2: ตอบคำถามด้วยโค้ด

// ผลลัพธ์นี้ไม่ถูกต้องตามความเป็นจริง เพราะ null ควรจะเป็นชนิดของตัวเอง ไม่ใช่ object 
// typeof null ได้ผลว่า "object" ซึ่งเป็น bug เก่าแก่ของ JavaScript
console.log(`typeof null คือ: ${typeof null}`);

// ตัวแปรที่ประกาศแล้วยังไม่กำหนดค่า จะมีชนิดเป็น "undefined" โดยอัตโนมัติ
let notAssignedYet;
console.log(`ตัวแปรที่ยังไม่กำหนดค่า มีชนิดเป็น: ${typeof notAssignedYet}`);

// typeof NaN ได้ผลว่า "number" เพราะ NaN ถือเป็นค่าตัวเลขชนิดหนึ่ง
const notANumber = Number("abc");
console.log(`ค่า: ${notANumber} | ชนิดของ NaN คือ: ${typeof notANumber}\n`);


//ส่วนที่ 3: การแปลงชนิด
const inputAge = "20";
const inputScore = "85.55";

const ageResult = Number(inputAge) + 5; // แปลง inputAge เป็นตัวเลขแล้วบวก 5
console.log(`inputAge แปลงเป็นตัวเลขแล้วบวก 5 ได้: ${ageResult}`);

const scoreResult = Number(inputScore).toFixed(1); // แปลง inputScore แล้วแสดงผลโดยมีทศนิยม 1 ตำแหน่ง
console.log(`inputScore แปลงเป็นตัวเลขและปัดทศนิยม 1 ตำแหน่ง: ${scoreResult}`);

// เปรียบเทียบ inputAge === 20 กับ Number(inputAge) === 20
// inputAge เป็น string "20" เทียบกับ number 20 ด้วย === จะได้ false
// แต่ Number(inputAge) แปลงเป็น number แล้ว เทียบกับ 20 จะได้ true
console.log(`inputAge === 20 ได้ผลเป็น: ${inputAge === 20}`);
console.log(`Number(inputAge) === 20 ได้ผลเป็น: ${Number(inputAge) === 20}`);