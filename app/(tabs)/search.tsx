import { View, TextInput, StyleSheet, Text, FlatList } from "react-native";
import { useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import DestinationCard from "../components/DestinationCard";

export default function SearchScreen() {
  const db = useSQLiteContext();
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<any[]>([]);

  // ✅ Tìm kiếm SQLite theo tên
  const handleSearch = async (text: string) => {
    setSearchText(text);

    if (text.trim() === "") {
      setResults([]); // xoá kết quả nếu rỗng
      return;
    }

    const rows = await db.getAllAsync(
      "SELECT * FROM destinations WHERE name LIKE ?",
      [`%${text}%`]
    );
    setResults(rows);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>

      <TextInput
        placeholder="Search destination..."
        placeholderTextColor="#9CA3AF"
        style={styles.input}
        value={searchText}
        onChangeText={handleSearch}
      />

      {results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item }) => <DestinationCard item={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80, marginTop: 10 }}
        />
      ) : (
        <Text style={styles.hint}>Nhập tên địa điểm để tìm kiếm...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f6fa", padding: 20, paddingTop: 60 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 20 },
  input: { backgroundColor: "#fff", padding: 14, borderRadius: 12, fontSize: 16 },
  hint: { marginTop: 15, color: "#8e8e8e", textAlign: "center" },
});
