import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignInScreen() {
  const router = useRouter();
  const db = useSQLiteContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      // Kiểm tra người dùng có tồn tại không
      const rows = await db.getAllAsync(
        "SELECT * FROM users WHERE email = ? AND password = ?",
        [email, password]
      );

      if (rows.length > 0) {
        // 🟢 Lưu email của người dùng hiện tại vào AsyncStorage
        await AsyncStorage.setItem("currentUser", email);

        // 🟢 Chuyển sang màn Home (tabs layout)
        await AsyncStorage.setItem("currentUserEmail", email);
        router.replace("/(tabs)/home");

      } else {
        Alert.alert("Đăng nhập thất bại", "Email hoặc mật khẩu không đúng!");
      }
    } catch (e) {
      console.error("Lỗi khi đăng nhập:", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in now</Text>

      <TextInput style={styles.input} placeholder="Email" placeholderTextColor='#717171ff' value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} secureTextEntry placeholder="Password" placeholderTextColor='#717171ff' value={password} onChangeText={setPassword} />

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <Text style={styles.switchText}>
        Don’t have an account?
        <Text style={styles.link} onPress={() => router.push("/signup")}> Sign up</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,justifyContent:"center",padding:24},
  title:{fontSize:28,fontWeight:"bold",textAlign:"center",marginBottom:20},
  input:{backgroundColor:"#dddbdbff",padding:14,borderRadius:10,marginBottom:15},
  button:{backgroundColor:"#4a6cf7",padding:16,borderRadius:10},
  buttonText:{color:"#fff",textAlign:"center",fontWeight:"bold"},
  switchText:{textAlign:"center",marginTop:18},
  link:{color:"#4a6cf7",fontWeight:"bold"}
});
