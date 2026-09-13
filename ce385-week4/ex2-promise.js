const STUDENTS = [
  { id: "6501", name: "วงศพัทธ์", major: "Computer Engineering", score: 78 },
];

function fetchStudentByIdAsync(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const student = STUDENTS.find((s) => s.id === id);
      if (typeof id === "string" && id.trim() !== "") {
        if (student) {
          resolve(student);
        } else {
          reject(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
        }
      } else {
        reject(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
      }
      return;
    }, 300);
  });
}

function Grade(score) {
    if (score >= 80) return "A";
    if (score >= 70) return "B";
    if (score >= 60) return "C";
    if (score >= 50) return "D";
    return "F";
}

fetchStudentByIdAsync("6501")
  .then((student) => {
    return { name: student.name, grade: Grade(student.score) };
  })
  .then((result) => {
    console.log("พบข้อมูลนักศึกษา:", result.name, "เกรด", result.grade);
  })
  .catch((error) => {
    console.log("ล้มเหลว:", error.message);   // ไม่ว่าโซ่จะพังตรงไหน มาเจอกันที่นี่
  })
  .finally(() => {
    console.log("จบการทำงาน");
  });

fetchStudentByIdAsync("68112754")
  .then((student) => {
    return { name: student.name, grade: Grade(student.score) };
  })
  .then((result) => {
    console.log("พบข้อมูลนักศึกษา:", result.name, "เกรด", result.grade);
  })
  .catch((error) => {
    console.log("ล้มเหลว:", error.message);   // ไม่ว่าโซ่จะพังตรงไหน มาเจอกันที่นี่
  })
  .finally(() => {
    console.log("จบการทำงาน");
  });

fetchStudentByIdAsync(" ")
  .then((student) => {
    return { name: student.name, grade: Grade(student.score) };
  })
  .then((result) => {
    console.log("พบข้อมูลนักศึกษา:", result.name, "เกรด", result.grade);
  })
  .catch((error) => {
    console.log("ล้มเหลว:", error.message);   // ไม่ว่าโซ่จะพังตรงไหน มาเจอกันที่นี่
  })
  .finally(() => {
    console.log("จบการทำงาน");
  });