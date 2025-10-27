import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";

export default function SignUpScreen() {
  const router = useRouter();
  const db = useSQLiteContext();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    if (!fullname || !email || !password) return Alert.alert("Lỗi", "Vui lòng nhập đầy đủ");

    try {
      await db.runAsync("INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)", [
        fullname,
        email,
        password,
      ]);
      Alert.alert("Thành công", "Tạo tài khoản thành công!");
      router.push("/");
    } catch {
      Alert.alert("Lỗi", "Email đã tồn tại.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up now</Text>

      <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor='#717171ff' value={fullname} onChangeText={setFullname} />
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor='#717171ff' value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} secureTextEntry placeholder="Password" placeholderTextColor='#717171ff' value={password} onChangeText={setPassword} />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.switchText}>
        Already have an account?
        <Text style={styles.link} onPress={() => router.push("/")}> Sign in</Text>
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
