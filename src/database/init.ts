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
      location TEXT NOT NULL,
      price INTEGER NOT NULL,
      image TEXT NOT NULL
    );
  `);

  // ✅ XÓA toàn bộ dữ liệu cũ mỗi lần app khởi chạy
  await db.execAsync(`DELETE FROM destinations`);

  // ✅ Thêm dữ liệu mẫu lại (tuỳ chọn)
  await db.runAsync(`
    INSERT INTO destinations (name, location, price, image) VALUES
    ('Đà Lạt', 'Lâm Đồng', 2500000, 'https://www.pinterest.com/pin/15692298692678900/'),
    ('Phú Quốc', 'Kiên Giang', 4500000, 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e'),
    ('Sapa', 'Lào Cai', 3200000, 'https://images.unsplash.com/photo-1568600891621-2a0b5a2b77d1')
  `);
}
