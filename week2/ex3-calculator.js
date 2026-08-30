// ส่วนที่ 1: ตัวแปรเก็บคะแนนดิบ 
const workshopRaw = 48;   // คะแนน Workshop ดิบ เต็ม 60
const attendance = 9;     // คะแนนเข้าเรียน
const project = 17;       // คะแนนโปรเจกต์
const midterm = 15;       // คะแนนสอบกลางภาค
const final = 24;         // คะแนนสอบปลายภาค

// ตัวเลขเกณฑ์คงที่ของสูตร เก็บเป็น const ตั้งชื่อให้สื่อความหมาย
const WORKSHOP_MAX_RAW = 60;   // คะแนนดิบเต็มของ Workshop
const WORKSHOP_MAX_SCALED = 20; // คะแนน Workshop หลังแปลงสัดส่วนแล้ว (เต็ม 20)
const FULL_SCORE = 100;         // คะแนนเต็มของวิชา (ไว้คิดเปอร์เซ็นต์)
const PASSING_SCORE = 80;       // คะแนนที่ต้องได้เพื่อผ่านเกณฑ์ที่ตั้งไว้

// ===== ส่วนที่ 2: คำนวณและแสดงผล =====

// 1) แปลงคะแนน Workshop ตามสัดส่วน: (คะแนนดิบ / คะแนนเต็มดิบ) * คะแนนเต็มที่แปลงแล้ว
const workshopScaled = (workshopRaw / WORKSHOP_MAX_RAW) * WORKSHOP_MAX_SCALED;

// 2) รวมคะแนนทั้งหมดจากทุกส่วนเข้าด้วยกัน
const totalScore = workshopScaled + attendance + project + midterm + final;

// 3) คำนวณว่าคะแนนรวมคิดเป็นกี่เปอร์เซ็นต์ของคะแนนเต็ม 100
const percentage = (totalScore / FULL_SCORE) * 100;

// 4) คำนวณว่ายังขาดอีกกี่คะแนนจึงจะได้ 80 คะแนน
// ถ้าคะแนนเกิน 80 แล้ว ผลลัพธ์จะติดลบ แสดงว่าไม่ขาดแล้ว (เกินมาเท่านี้)
const pointsUntilPassing = PASSING_SCORE - totalScore;

// ===== ส่วนที่ 3: แสดงผลเป็นใบสรุปคะแนนด้วย Template Literal =====
console.log(`
========== ใบสรุปคะแนน CE385 ==========
Workshop (แปลงแล้ว)   : ${workshopScaled.toFixed(2)} / ${WORKSHOP_MAX_SCALED}
เข้าเรียน              : ${attendance}
โปรเจกต์                : ${project}
สอบกลางภาค             : ${midterm}
สอบปลายภาค             : ${final}
-----------------------------------------
คะแนนรวมทั้งหมด        : ${totalScore.toFixed(2)} / ${FULL_SCORE}
คิดเป็นเปอร์เซ็นต์       : ${percentage.toFixed(2)} %
ส่วนต่างจาก ${PASSING_SCORE} คะแนน       : ${pointsUntilPassing.toFixed(2)}
==========================================
`);