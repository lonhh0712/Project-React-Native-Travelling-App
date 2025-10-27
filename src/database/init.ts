export default async function initDatabase(db: any) {

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullname TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `);

await db.execAsync(`
  CREATE TABLE IF NOT EXISTS destinations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    image TEXT NOT NULL
  );
`);


  // ✅ XÓA toàn bộ dữ liệu cũ mỗi lần app khởi chạy
  await db.execAsync(`DELETE FROM destinations`);

  // ✅ Thêm dữ liệu mẫu lại (tuỳ chọn)
  await db.runAsync(`
    INSERT INTO destinations (name,  price, image) VALUES
    ('Đà Lạt', 2500000, 'https://github.com/lonhh0712/Project-React-Native-Travelling-App/raw/main/assets/images/dalat.jpg'),
    ('Phú Quốc', 4500000, 'https://github.com/lonhh0712/Project-React-Native-Travelling-App/raw/main/assets/images/phuquoc.jpg'),
    ('Sapa', 3200000, 'https://github.com/lonhh0712/Project-React-Native-Travelling-App/raw/main/assets/images/sapa.jpg'),
    ('Đắk Lắk', 2200000, 'https://github.com/lonhh0712/Project-React-Native-Travelling-App/raw/main/assets/images/daklak.jpg'),
    ('Đà Nẵng', 3500000, 'https://github.com/lonhh0712/Project-React-Native-Travelling-App/raw/main/assets/images/danang.jpg'),
    ('Hà Giang', 3000000, 'https://github.com/lonhh0712/Project-React-Native-Travelling-App/raw/main/assets/images/hagiang.jpg'),
    ('Hà Nội', 5200000, 'https://github.com/lonhh0712/Project-React-Native-Travelling-App/raw/main/assets/images/hanoi.jpg'),
    ('Thành phố Hồ Chí Minh', 5000000, 'https://github.com/lonhh0712/Project-React-Native-Travelling-App/raw/main/assets/images/hcm.jpg'),
    ('Huế', 2500000, 'https://github.com/lonhh0712/Project-React-Native-Travelling-App/raw/main/assets/images/hue.jpg'),
    ('Vũng Tàu', 4500000, 'https://github.com/lonhh0712/Project-React-Native-Travelling-App/raw/main/assets/images/vungtau.jpg'),
    ('Phú Yên', 3200000, 'https://github.com/lonhh0712/Project-React-Native-Travelling-App/raw/main/assets/images/phuyen.jpg')
  `);
}
