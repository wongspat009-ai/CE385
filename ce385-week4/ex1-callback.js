const STUDENTS = [
  { id: "68112754", name: "วงศพัทธ์", major: "Computer Engineering", score: 78 },
];

function fetchStudentById(id , callback) {
  setTimeout(() => {
    if (typeof id !== "string" || id.trim() === "") {
      return callback(new Error("รหัสนักศึกษาไม่ถูกต้อง"));   // พารามิเตอร์ 1 = error
    }
    const student = STUDENTS.find((s) => s.id === id);
    if (!student) {
      return callback(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
    }
    callback(null, student);    // สำเร็จ: error = null, ข้อมูลอยู่พารามิเตอร์ 2
  }, 300);
}

fetchStudentById(" ", (error, student) => {
  if (error) {
    console.log("ล้มเหลว:", error.message);      // ตรวจ error ก่อนเสมอ!
  } else {
    console.log("สำเร็จ  :", student.name, "สาขา", student.major, "คะแนน", student.score);
  }
});
fetchStudentById("42", (error, student) => {
  if (error) {
    console.log("ล้มเหลว:", error.message);
    } else {
    console.log("สำเร็จ  :", student.name, "สาขา", student.major, "คะแนน", student.score);
    }
});
fetchStudentById("68112754", (error, student) => {
  if (error) {
    console.log("ล้มเหลว:", error.message);
  } else {
    console.log("สำเร็จ  :", student.name, "สาขา", student.major, "คะแนน", student.score);
  }
});

// ① ถ้าลืมตรวจ error แล้วอ่าน student.name ทันที จะเกิดอะไร ใครเห็น error นั้น
// - เมื่อเกิด error ค่า student จะเป็น undefined
// - หากเขียน student.name จะเกิด TypeError 
// - Error นี้จะเกิดภายใน callback และผู้ที่เห็นคือ callback ที่เรียกใช้งาน
// ② ทำไมต้อง return หลังเรียก callback(error)
// - เพื่อหยุดการทำงานของฟังก์ชันทันที
// - ป้องกันไม่ให้โค้ดด้านล่างทำงานต่อ และป้องกัน callback ถูกเรียกซ้ำ
// - ทำให้ callback ถูกเรียกเพียงครั้งเดียวตามหลักการของ error-first callback
