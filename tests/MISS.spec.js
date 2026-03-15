import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';

const BASE_URL = 'https://efat.surin.rmuti.ac.th/mis/';
const VALID_USER = 'suhunsa.ja';
const VALID_PASS = '1320100119480';

// ============================================================
// TC-001 Login Success
// ============================================================
test('TC-001: Login สำเร็จด้วยข้อมูลถูกต้อง', async ({ page }) => {

  await page.goto(BASE_URL);

  // Screenshot หน้า Login
  await page.screenshot({ path: 'screenshots/01-login-page.png', fullPage: true });

  await page.fill('input[type="text"]', VALID_USER);
  await page.fill('input[type="password"]', VALID_PASS);

  // Screenshot หลังกรอกข้อมูล
  await page.screenshot({ path: 'screenshots/02-fill-login.png', fullPage: true });

  await page.click('text=OK');

  await page.waitForSelector('text=Dashboard', { timeout: 15000 });

  // Screenshot หน้า Dashboard
  await page.screenshot({ path: 'screenshots/03-dashboard.png', fullPage: true });

  await expect(page.getByText('Dashboard')).toBeVisible();
});
test('TC-002: เปิดเมนู Dashboard', async ({ page }) => {

  await page.goto(BASE_URL);

  await page.fill('input[type="text"]', VALID_USER);
  await page.fill('input[type="password"]', VALID_PASS);
  await page.click('text=OK');

  await page.waitForTimeout(3000);

  await page.getByText('Dashboard').click();

  await page.screenshot({ path: 'screenshots/04-dashboard-menu.png', fullPage: true });

});
test('TC-003: เปิดเมนูเกี่ยวกับฉัน', async ({ page }) => {

  await page.goto(BASE_URL);

  await page.fill('input[type="text"]', VALID_USER);
  await page.fill('input[type="password"]', VALID_PASS);
  await page.click('text=OK');

  await page.waitForTimeout(3000);

  await page.getByText('เกี่ยวกับฉัน').click();

  await page.screenshot({ path: 'screenshots/05-about.png', fullPage: true });

});
// ============================================================
// TC-004 เปิดเมนูคำสั่งปฏิบัติงานของฉัน
// ============================================================
test('TC-004: เปิดเมนูคำสั่งปฏิบัติงานของฉัน', async ({ page }) => {

  await page.goto(BASE_URL);

  // login
  await page.fill('input[type="text"]', VALID_USER);
  await page.fill('input[type="password"]', VALID_PASS);
  await page.click('text=OK');

  await page.waitForTimeout(4000);

  // คลิกเมนู
  await page.getByText('คำสั่งปฏิบัติงานของฉัน').click();

  // รอให้ตารางโหลด
  await page.waitForSelector('text=เลขที่คำสั่ง');

  // ตรวจสอบว่าตารางแสดง
  await expect(page.getByText('เลขที่คำสั่ง')).toBeVisible();

  // Screenshot หน้าเมนู
  await page.screenshot({
    path: 'screenshots/TC004-my-command.png',
    fullPage: true
  });

});
// ============================================================
// TC-005 เปิดเมนูคลังคำสั่งปฏิบัติงานทั้งหมด
// ============================================================
test('TC-005: เปิดเมนูคลังคำสั่งปฏิบัติงานทั้งหมด', async ({ page }) => {

  await page.goto(BASE_URL);

  // login
  await page.fill('input[type="text"]', VALID_USER);
  await page.fill('input[type="password"]', VALID_PASS);
  await page.click('text=OK');

  // รอระบบโหลด
  await page.waitForSelector('text=Dashboard');

  // คลิกเมนู
  await page.getByText('คลังคำสั่งปฏิบัติงานทั้งหมด').click();

  // รอให้ตารางแสดง
  await page.waitForSelector('text=รหัสคำสั่ง');

  // ตรวจสอบหัวตาราง
  await expect(page.getByText('รหัสคำสั่ง').first()).toBeVisible();
  await expect(page.getByText('เรื่อง').first()).toBeVisible();
  await expect(page.getByText('วันที่เริ่มต้น').first()).toBeVisible();

  // screenshot
  await page.screenshot({
    path: 'screenshots/TC005-all-command.png',
    fullPage: true
  });

});
// ============================================================
// TC-006 เปิดหน้าการตั้งค่าข้อมูลส่วนตัว
// ============================================================
test('TC-006: เปิดหน้าการตั้งค่าข้อมูลส่วนตัว', async ({ page }) => {

  await page.goto(BASE_URL);

  // login
  await page.fill('input[type="text"]', VALID_USER);
  await page.fill('input[type="password"]', VALID_PASS);
  await page.click('text=OK');

  await page.waitForSelector('text=Dashboard');

  // คลิกเมนู
  await page.getByText('การตั้งค่าข้อมูลส่วนตัว').click();

  // รอ popup
  await page.locator('text=ข้อมูลส่วนตัว').waitFor();

  // ตรวจสอบ popup
  await expect(page.locator('text=ข้อมูลส่วนตัว')).toBeVisible();

  // screenshot
  await page.screenshot({
    path: 'screenshots/TC006-profile.png',
    fullPage: true
  });
});
// ============================================================
// TC-007 เปิดหน้าการลาด้วย Selector รูปภาพ
// ============================================================
test('TC-007: เปิดเมนูระบบการลา-ไปราชการ', async ({ page }) => {

  await page.goto(BASE_URL);

  
  await page.fill('input[type="text"]', VALID_USER);
  await page.fill('input[type="password"]', VALID_PASS);
  await page.click('text=OK');

  // รอให้หน้า Dashboard โหลด
  await page.waitForSelector('text=Dashboard');

  // คลิกเมนูที่เป็นรูปภาพตามที่คุณระบุ
  // ใช้ * เพื่อหาไฟล์ที่มีชื่อบางส่วนตรงกัน (แม่นยำและยืดหยุ่น)
  await page.locator('img[src*="B9E908C51957064AD33E5E95"]').click();

  // รอให้หน้าถัดไปโหลดเสร็จ
  await page.waitForLoadState('networkidle');

  // ตรวจสอบหัวข้อ "ประวัติการลา" จากรูปแรกของคุณเพื่อยืนยันว่ามาถูกหน้า
  await expect(page.getByText('ประวัติการลา')).toBeVisible();

  // screenshot
  await page.screenshot({
    path: 'screenshots/TC007-leave-system.png',
    fullPage: true
  });
});
// ============================================================
// ============================================================
// TC-011: เขียนใบลาป่วย/กิจ/คลอดบุตร
// ============================================================
test('TC-08: เปิดเมนูเขียนใบลาป่วย/กิจ/คลอดบุตร', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.fill('input[type="text"]', VALID_USER);
  await page.fill('input[type="password"]', VALID_PASS);
  await page.click('text=OK');
  await page.locator('img[src*="B9E908C51957064AD33E5E95"]').click();

  // ใช้ Regex /.../ เพื่อให้หาเจอแม้มีช่องว่าง และรอให้ปุ่มพร้อมคลิก
  const menu = page.getByText(/เขียนใบลาป่วย\/กิจ\/คลอดบุตร/);
  await menu.waitFor({ state: 'visible', timeout: 10000 });
  await menu.click();
  
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'screenshots/TC011-sick-leave.png', fullPage: true });
});

// ============================================================
// TC-012: เขียนใบขอยกเลิกวันลา
// ============================================================
test('TC-09: เปิดเมนูเขียนใบขอยกเลิกวันลา', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.fill('input[type="text"]', VALID_USER);
  await page.fill('input[type="password"]', VALID_PASS);
  await page.click('text=OK');
  await page.locator('img[src*="B9E908C51957064AD33E5E95"]').click();

  const menu = page.getByText(/เขียนใบขอยกเลิกวันลา/);
  await menu.click();
  
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'screenshots/TC012-cancel-leave.png', fullPage: true });
});

// ============================================================
// TC-014: รายงานการไปราชการ
// ============================================================
test('TC-010: เปิดเมนูรายงานการไปราชการ', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.fill('input[type="text"]', VALID_USER);
  await page.fill('input[type="password"]', VALID_PASS);
  await page.click('text=OK');
  await page.locator('img[src*="B9E908C51957064AD33E5E95"]').click();

  const menu = page.getByText(/รายงานการไปราชการ/);
  await menu.click();
  
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'screenshots/TC014-report-trip.png', fullPage: true });
});

// ============================================================
// TC-015: กลับหน้าหลัก
// ============================================================
test('TC-011: ทดสอบปุ่มกลับหน้าหลัก', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.fill('input[type="text"]', VALID_USER);
  await page.fill('input[type="password"]', VALID_PASS);
  await page.click('text=OK');
  await page.locator('img[src*="B9E908C51957064AD33E5E95"]').click();

  const menu = page.getByText(/กลับหน้าหลัก/);
  await menu.click();
  
  await page.waitForSelector('text=Dashboard');
  await page.screenshot({ path: 'screenshots/TC015-back-home.png', fullPage: true

   });
});
// ============================================================
// TC-017: เปิดเมนู "ระบบคำสั่งปฏิบัติราชการ"
// ============================================================
test('TC-017: เปิดเมนูระบบคำสั่งปฏิบัติราชการ', async ({ page }) => {

  await page.goto(BASE_URL);

  // Login
  await page.fill('input[type="text"]', VALID_USER);
  await page.fill('input[type="password"]', VALID_PASS);
  await page.click('text=OK');

  // รอให้หน้า Dashboard โหลด
  await page.waitForSelector('text=Dashboard');

  // ใช้รหัสรูปภาพที่คุณเพิ่งเจอมาใส่ตรงนี้
  await page.locator('img[src*="BD94432497C114F25553B132"]').click();

  // รอให้หน้าถัดไปโหลดเสร็จ
  await page.waitForLoadState('networkidle');


  await expect(page.getByText('ระบบคำสั่งปฏิบัติงาน (ผู้ร่างคำสั่ง)')).toBeVisible();

  // Screenshot
  await page.screenshot({
    path: 'screenshots/TC017-command-system.png',
    fullPage: true
  });
});
// ============================================================
// TC-022: ร่างคำสั่งใหม่ (แก้ไข Selector ให้แม่นยำ)
// ============================================================
test('TC-022: เปิดเมนูร่างคำสั่งใหม่', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.fill('input[type="text"]', VALID_USER);
  await page.fill('input[type="password"]', VALID_PASS);
  await page.click('text=OK');
  await page.waitForSelector('text=Dashboard');
  await page.locator('img[src*="BD94432497C114F25553B132"]').click();
  
  // ใช้ locator ที่เจาะจงเฉพาะเมนูใน Sidebar
  await page.locator('.x-treelist-item-text').filter({ hasText: 'ร่างคำสั่งใหม่' }).click();
  
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'screenshots/TC022-new-draft.png', fullPage: true });
});

// ============================================================
// TC-023: กล่องคำสั่ง
// ============================================================

test('TC-023: เปิดเมนูกล่องคำสั่ง', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.fill('input[type="text"]', VALID_USER);
  await page.fill('input[type="password"]', VALID_PASS);
  await page.click('text=OK');
  await page.waitForSelector('text=Dashboard');
  await page.locator('img[src*="BD94432497C114F25553B132"]').click();
  
 
  await page.locator('.x-treelist-item-text').filter({ hasText: 'กล่องคำสั่ง' }).click();
  
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'screenshots/TC023-command-box.png', fullPage: true });
});
// ============================================================
// TC-024: คำสั่งที่ดำเนินการแล้ว
// ============================================================

test('TC-024: เปิดเมนูคำสั่งที่ดำเนินการแล้ว', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.fill('input[type="text"]', VALID_USER);
  await page.fill('input[type="password"]', VALID_PASS);
  await page.click('text=OK');
  await page.waitForSelector('text=Dashboard');
  await page.locator('img[src*="BD94432497C114F25553B132"]').click();
  
 
  await page.locator('.x-treelist-item-text').filter({ hasText: 'คำสั่งที่ดำเนินการแล้ว' }).click();
  
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'screenshots/TC024-done-commands.png', fullPage: true });
});

// ============================================================
// TC-025: กลับหน้าหลัก
// ============================================================
test('TC-025: กลับหน้าหลักจากระบบคำสั่ง', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.fill('input[type="text"]', VALID_USER);
  await page.fill('input[type="password"]', VALID_PASS);
  await page.click('text=OK');
  await page.waitForSelector('text=Dashboard');
  await page.locator('img[src*="BD94432497C114F25553B132"]').click();
  
  // ใช้ .x-treelist-item-text เจาะจงเฉพาะเมนูใน Sidebar
  await page.locator('.x-treelist-item-text').filter({ hasText: 'กลับหน้าหลัก' }).click();
  
  await page.waitForSelector('text=Dashboard');
  await page.screenshot({ path: 'screenshots/TC025-back-home.png', fullPage: true });
});
// ============================================================
// TC-028: เปิดเมนู "ระบบประเมินผลวิชาการ"
// ============================================================
test('TC-028: เปิดเมนูระบบประเมินผลวิชาการ', async ({ page }) => {
  await page.goto(BASE_URL);
  
  // Login
  await page.fill('input[type="text"]', VALID_USER);
  await page.fill('input[type="password"]', VALID_PASS);
  await page.click('text=OK');
  await page.waitForSelector('text=Dashboard');

  
  await page.locator('img[src*="CC92828B5EC3F5232B5484A7"]').click();
  

  await page.waitForLoadState('networkidle');


  await expect(page.getByText('รายงานการประเมินผลวิชาการ')).toBeVisible();

  // Screenshot
  await page.screenshot({
    path: 'screenshots/TC028-academic-assessment.png',
    fullPage: true
  });
});
// ============================================================
// TC-029: เปิดเมนู "ระบบคำร้องจากนักศึกษา"
// ============================================================
test('TC-029: เปิดเมนูระบบคำร้องจากนักศึกษา', async ({ page }) => {
  await page.goto(BASE_URL);
  
  // Login
  await page.fill('input[type="text"]', VALID_USER);
  await page.fill('input[type="password"]', VALID_PASS);
  await page.click('text=OK');
  await page.waitForSelector('text=Dashboard');


  await page.locator('img[src*="6E15D0186AE9F8CFD8F1B7AA"]').click();
  
 
  await page.waitForLoadState('networkidle');

  await expect(page.getByText('ยินดีต้อนรับ....โปรดเลือกเมนูใช้งานด้านซ้ายมือ.........')).toBeVisible({ timeout: 10000 });

  // Screenshot
  await page.screenshot({
    path: 'screenshots/TC029-student-requests.png',
    fullPage: true
  });
});

test('TC-031: เปิดเมนูกล่องเข้าผู้สอน', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.fill('input[type="text"]', VALID_USER);
  await page.fill('input[type="password"]', VALID_PASS);
  await page.click('text=OK');
  await page.waitForSelector('text=Dashboard');
  await page.locator('img[src*="6E15D0186AE9F8CFD8F1B7AA"]').click();
  await page.waitForLoadState('networkidle');

  await page.locator('.x-treelist-item-text').filter({ hasText: 'กล่องเข้า ผู้สอน' }).click();
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'screenshots/TC031-teacher-inbox.png', fullPage: true });
});

test('TC-032: เปิดเมนูกล่องคำร้องที่ดำเนินการแล้ว', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.fill('input[type="text"]', VALID_USER);
  await page.fill('input[type="password"]', VALID_PASS);
  await page.click('text=OK');
  await page.waitForSelector('text=Dashboard');
  await page.locator('img[src*="6E15D0186AE9F8CFD8F1B7AA"]').click();
  await page.waitForLoadState('networkidle');

  await page.locator('.x-treelist-item-text').filter({ hasText: 'กล่องคำร้องที่ดำเนินการแล้ว' }).click();
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'screenshots/TC032-completed-req.png', fullPage: true });
});