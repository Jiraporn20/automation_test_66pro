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
  await expect(page.getByText('รหัสคำสั่ง')).toBeVisible();
  await expect(page.getByText('เรื่อง')).toBeVisible();
  await expect(page.getByText('วันที่เริ่มต้น')).toBeVisible();

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
// TC-007 ตรวจสอบหน้าระบบการลา-ไปราชการ
// ============================================================
test('TC-007: เปิดหน้าระบบการลา-ไปราชการ', async ({ page }) => {

  await page.goto(BASE_URL);

  // login
  await page.fill('input[type="text"]', VALID_USER);
  await page.fill('input[type="password"]', VALID_PASS);
  await page.click('text=OK');

  await page.waitForLoadState('networkidle');

  // คลิก View Details ระบบการลา (การ์ดแรก)
  await page.locator('text=View Details').nth(0).click();

  // รอหน้าระบบลาโหลด
  await page.waitForSelector('text=ปีงบประมาณปัจจุบัน');

  // ตรวจสอบข้อมูลสำคัญในหน้า
  await expect(page.getByText('ปีงบประมาณปัจจุบัน')).toBeVisible();
  await expect(page.getByText('ชื่อ-สกุล')).toBeVisible();
  await expect(page.getByText('ประวัติการลา')).toBeVisible();

  // ตรวจสอบหัวตาราง
  await expect(page.getByText('รหัสบุคลากร')).toBeVisible();
  await expect(page.getByText('วันทีลา')).toBeVisible();
  await expect(page.getByText('เหตุการณ์')).toBeVisible();

  // screenshot
  await page.screenshot({
    path: 'screenshots/TC007-leave-page.png',
    fullPage: true
  });

});
