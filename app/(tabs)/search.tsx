import { View, TextInput, StyleSheet, Text } from "react-native";
import { useState } from "react";

export default function SearchScreen() {
  const [searchText, setSearchText] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>

      <TextInput
        placeholder="Search destination..."
        placeholderTextColor="#9CA3AF"
        style={styles.input}
        value={searchText}
        onChangeText={setSearchText}
      />

      <Text style={styles.hint}>Nhập tên địa điểm để tìm kiếm...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:"#f5f6fa", padding:20, paddingTop:60 },
  title:{ fontSize:28, fontWeight:"700", marginBottom:20 },
  input:{ backgroundColor:"#fff", padding:14, borderRadius:12, fontSize:16 },
  hint:{ marginTop:15, color:"#8e8e8e" }
});
