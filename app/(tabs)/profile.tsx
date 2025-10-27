import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Alert } from "react-native";
import { useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen() {
  const db = useSQLiteContext();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadUserFromDB();
  }, []);

  // ✅ Lấy email đang đăng nhập từ AsyncStorage và truy vấn DB
  const loadUserFromDB = async () => {
    try {
      const email = await AsyncStorage.getItem("currentUserEmail"); // được set khi login
      if (!email) return;

      const rows = await db.getAllAsync("SELECT * FROM users WHERE email = ?", [email]);
      if (rows.length > 0) setUser(rows[0]);
    } catch (e) {
      console.log("❌ Lỗi khi load user:", e);
    }
  };


  // ✅ Đăng xuất
  const handleLogout = async () => {
    await AsyncStorage.removeItem("currentUserEmail");
    Alert.alert("Đăng xuất", "Bạn đã đăng xuất thành công!");
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      {/* Thông tin cá nhân */}
      <View style={styles.profileBox}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user?.fullname || "User"}</Text>
        <Text style={styles.email}>{user?.email || "Chưa có thông tin"}</Text>
      </View>
      {/* MENU SECTION */}
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Thông tin cá nhân</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Lịch sử chuyến đi</Text>
        </TouchableOpacity>

      </View>
      {/* Đăng xuất */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f6fa", padding: 20, paddingTop: 60 },
  menuText: { fontSize: 16, color: "#333", fontWeight: "500", marginLeft: 20 },
  menu: {
    marginHorizontal: 20,
    marginTop: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems:'center'
  },
  menuItem: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    marginVertical: 10,
    width: 350,
    height: 60,
    justifyContent: 'center',
    borderRadius: 10
  },
  profileBox: { alignItems: "center", marginBottom: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 12 },
  name: { fontSize: 22, fontWeight: "700" },
  email: { color: "#8e8e8e", marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  logoutBtn: { marginTop: 20, backgroundColor: "#ff4444", borderRadius: 10, paddingVertical: 12, },
  logoutText: { color: "#fff", fontSize: 16, fontWeight: "600", textAlign: "center" },
});
