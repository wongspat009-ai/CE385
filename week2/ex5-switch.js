// ===== ส่วนที่ 1: ฟังก์ชันคืนราคาตามชื่อเมนู =====
function getMenuPrice(menu) {
  switch (menu) {
    // เมนูที่ราคา 50 เท่ากัน 3 รายการ ใช้ fall-through รวม case เข้าด้วยกัน
    // แทนการเขียนซ้ำ 3 ครั้ง (ตกลงจาก case บนไล่ลงมาจนเจอ break)
    case "ข้าวผัด":
    case "ข้าวมันไก่":
    case "ข้าวหมูแดง":
      return 50;
    case "ผัดไทย":
      return 60;
    case "ต้มยำกุ้ง":
      return 120;
    default:
      // เมนูที่ไม่มีในรายการ ให้ราคาเป็น 0
      return 0;
  }
}

// ===== ส่วนที่ 2: ฟังก์ชันคืนตัวคูณตามขนาด =====
function getSizeMultiplier(size) {
  switch (size) {
    case "ธรรมดา":
      return 1;
    case "พิเศษ":
      return 1.5;
    case "จัมโบ้":
      return 2;
    default:
      // ขนาดอื่น ๆ ที่ไม่รู้จัก ให้ถือว่าเป็นขนาดปกติ (คูณ 1)
      return 1;
  }
}

// ===== ส่วนที่ 3: คำนวณราคารวมของออร์เดอร์ =====
// สร้าง array ของออร์เดอร์อย่างน้อย 5 รายการ
// รายการสุดท้ายตั้งใจใส่เมนูที่ไม่มีในรายการ เพื่อทดสอบ default
const orders = [
  { menu: "ผัดไทย", size: "พิเศษ", qty: 2 },
  { menu: "ข้าวผัด", size: "ธรรมดา", qty: 1 },
  { menu: "ต้มยำกุ้ง", size: "จัมโบ้", qty: 1 },
  { menu: "ข้าวมันไก่", size: "ธรรมดา", qty: 3 },
  { menu: "ข้าวหมูแดง", size: "พิเศษ", qty: 2 },
  { menu: "สุกี้แห้ง", size: "ธรรมดา", qty: 1 }, // เมนูนี้ไม่มีในรายการ ทดสอบ default → ราคา 0
];

let billTotal = 0; // ยอดรวมทั้งบิล สะสมทีละออร์เดอร์

for (const order of orders) {
  const basePrice = getMenuPrice(order.menu);
  const multiplier = getSizeMultiplier(order.size);
  // ราคาต่อรายการ = ราคาเมนู × ตัวคูณขนาด × จำนวน
  const lineTotal = basePrice * multiplier * order.qty;
  billTotal += lineTotal;

  console.log(
    `${order.menu} (${order.size}) x${order.qty} = ${lineTotal} บาท`
  );
}

console.log(`------------------------------`);
console.log(`ยอดรวมทั้งบิล: ${billTotal} บาท`);