const students = [
  { id: 1, name: "สมชาย ใจดี",   major: "Computer Engineering", score: 85 },
  { id: 2, name: "สมหญิง รักเรียน", major: "Computer Engineering", score: 72 },
  { id: 3, name: "อนันต์ ขยันมาก",  major: "Computer Engineering", score: 91 },
];
 
function scoreToGrade(score) {
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
}
 
// ---------- ส่วนที่ 1 — fetchStudentByIdAsync(id) คืน Promise (ห้ามใช้ async) ----------
function fetchStudentByIdAsync(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof id !== "number") {
        reject(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
        return;
      }
      const found = students.find((s) => s.id === id);
      if (!found) {
        reject(new Error(`ไม่พบรหัสนักศึกษา <${id}>`));
        return;
      }
      resolve({ ...found, grade: scoreToGrade(found.score) });
    }, 300);
  });
}
 
// ---------- ส่วนที่ 1 — reportSequential(): ดึงทีละคนด้วย await ใน for...of ----------
let sequentialTime = 0; // เก็บไว้เทียบกับ parallel
 
async function reportSequential() {
  const ids = [1, 2, 3];
  const start = Date.now();
 
  for (const id of ids) {
    const student = await fetchStudentByIdAsync(id);
    console.log(`  [ทีละคน] ${student.name} — เกรด ${student.grade}`);
  }
 
  sequentialTime = Date.now() - start;
  console.log(`>> reportSequential ใช้เวลา ${sequentialTime} ms`);
}
 
// ---------- ส่วนที่ 2 — reportParallel(): ดึงพร้อมกันด้วย Promise.all + map ----------
async function reportParallel() {
  const ids = [1, 2, 3];
  const start = Date.now();
 
  const results = await Promise.all(ids.map((id) => fetchStudentByIdAsync(id)));
  results.forEach((student) => {
    console.log(`  [พร้อมกัน] ${student.name} — เกรด ${student.grade}`);
  });
 
  const parallelTime = Date.now() - start;
  const speedup = sequentialTime > 0 ? (sequentialTime / parallelTime).toFixed(2) : "N/A";
  console.log(`>> reportParallel ใช้เวลา ${parallelTime} ms (เร็วกว่าแบบทีละคนประมาณ ${speedup} เท่า)`);
}
 
// ---------- ส่วนที่ 3 — safeReport(id) ครบ try-catch-finally ----------
async function safeReport(id) {
  try {
    const student = await fetchStudentByIdAsync(id);
    console.log(`พบข้อมูล: ${student.name} (เกรด ${student.grade})`);
  } catch (error) {
    console.log(`ตรวจไม่พบ: ${error.message}`);
  } finally {
    console.log(`-- จบการตรวจสอบ ${id} --`);
  }
}
 
// ---------- main() ----------
async function main() {
  console.log("=== ส่วนที่ 1: Sequential (ทีละคน) ===");
  await reportSequential();
 
  console.log("\n=== ส่วนที่ 2: Parallel (พร้อมกัน) ===");
  await reportParallel();
 
  console.log("\n=== ส่วนที่ 3: safeReport (ทดสอบทั้ง id ที่พบและไม่พบ) ===");
  await safeReport(1);      // id ที่มีจริง
  await safeReport(999);    // ค้นแล้วไม่พบ
  await safeReport("abc");  // id ผิดรูปแบบ
}
 
main();

// try-catch ดักจับ Error จาก await ได้เพราะมันหยุดรอและแปลงสถานะ Reject เป็น Exception
// ทันที แต่จับ Callback ธรรมดาที่ทำงานแบบ Asynchronous ไม่ได้เพราะตัว Callback ทำงานคนละ
// ช่วงเวลาหลังจากที่ try-catch ทำงานจบและออกจาก Stack ไปแล้ว