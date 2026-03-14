# Page snapshot

```yaml
- dialog "เข้าสู่ระบบ" [ref=e1]:
  - form [ref=e2]:
    - group "field set" [ref=e3]:
      - generic [ref=e4]: Username
      - generic [ref=e5]: Password
      - checkbox "Remember me!" [ref=e6]
      - generic [ref=e7]: Remember me!
      - generic [ref=e8] [cursor=pointer]: ลงทะเบียน
      - generic [ref=e9] [cursor=pointer]: ลืมรหัสผ่าน?
      - textbox [active] [ref=e10]:
        - /placeholder: ชื่อผู้ใช้
      - textbox [ref=e11]:
        - /placeholder: รหัสผ่าน
      - button "OK" [ref=e12] [cursor=pointer]:
        - generic [ref=e13]: OK
      - button "Cancel" [ref=e14] [cursor=pointer]:
        - generic [ref=e15]: Cancel
    - generic [ref=e16]: Management information system [MIS]
    - img [ref=e18]
    - img [ref=e20]
    - toolbar [ref=e21]:
      - generic [ref=e22]: 14/03/2026 18:34:28 |
      - generic [ref=e23]: MIS:AGRI-TECH | V1.0 | ระบบบริหารจัดการและสนับสนุนการตัดสินใจ คณะเกษตรศาสตร์และเทคโนโลยี มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน วิทยาเขตสุรินทร์
      - generic [ref=e24]: "ติดต่อ ผู้พัฒนาระบบ Email : supakornsrisuk@gmail.com"
```