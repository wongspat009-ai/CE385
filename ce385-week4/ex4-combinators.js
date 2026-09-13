
const wait = (ms, value, willFail = false) =>
  new Promise((resolve, reject) => {
    setTimeout(() => (willFail ? reject(new Error(`${value} ล้มเหลว`)) : resolve(value)), ms);
  });

async function loadHomepage() {
  console.log("=== สถานการณ์ 1: Promise.all (โหลดหน้าแรก) ===");

  // กรณีสำเร็จทั้งหมด
  try {
    const [profile, schedule, announcement] = await Promise.all([
      wait(300, "โปรไฟล์"),
      wait(400, "ตารางเรียน"),
      wait(500, "ประกาศ"),
    ]);
    console.log(`เปิดหน้าแรก: ${profile}, ${schedule}, ${announcement}`);
  } catch (err) {
    console.log(`หน้าแรกเปิดไม่ได้: ${err.message}`);
  }

  // กรณีทดสอบว่าล้ม (ประกาศ willFail = true)
  try {
    const [profile, schedule, announcement] = await Promise.all([
      wait(300, "โปรไฟล์"),
      wait(400, "ตารางเรียน"),
      wait(500, "ประกาศ", true),
    ]);
    console.log(`เปิดหน้าแรก: ${profile}, ${schedule}, ${announcement}`);
  } catch (err) {
    console.log(`หน้าแรกเปิดไม่ได้: ${err.message}`);
  }
}

async function notifyExamResult() {
  console.log("=== สถานการณ์ 2: Promise.allSettled (แจ้งเตือนผลสอบ) ===");

  const results = await Promise.allSettled([
    wait(300, "อีเมล"),
    wait(500, "SMS", true),
    wait(400, "แอป"),
  ]);

  results.forEach((r) => {
    if (r.status === "fulfilled") {
      console.log(`ส่งสำเร็จ: ${r.value}`);
    } else {
      console.log(`ส่งล้มเหลว: ${r.reason.message}`);
    }
  });
}

async function fetchFromMirror() {
  console.log("=== สถานการณ์ 3: Promise.any (mirror server) ===");

  try {
    const data = await Promise.any([
      wait(300, "mirror-A", true), // ล้ม
      wait(600, "mirror-B"), // สำเร็จ
    ]);
    console.log(`ใช้ข้อมูลจาก: ${data}`);
  } catch (err) {
    // จะเกิดก็ต่อเมื่อทุกตัวล้มหมด (AggregateError)
    console.log("mirror ทุกตัวล้มเหลว:", err.message);
  }
}

function timeoutPromise(ms) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`หมดเวลา ${ms}ms`)), ms);
  });
}

async function searchWithTimeout() {
  console.log("=== สถานการณ์ 4: Promise.race (ค้นหาฐานข้อมูล) ===");

  try {
    const data = await Promise.race([
      wait(1200, "ผลลัพธ์จากฐานข้อมูล"),
      timeoutPromise(800),
    ]);
    console.log(`ได้ผลลัพธ์: ${data}`);
  } catch (err) {
    console.log(`เกิน 800ms เลิกรอ → ใช้แคชเก่าแทน (${err.message})`);
  }
}

// ---------- main() — เรียง 4 สถานการณ์เรียงกันใน main() เดียว ----------
async function main() {
  await loadHomepage();
  console.log("");
  await notifyExamResult();
  console.log("");
  await fetchFromMirror();
  console.log("");
  await searchWithTimeout();
}

main();