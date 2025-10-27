import { View, Text, StyleSheet, TextInput, Image, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import CategoryButton from "../components/CategoryButton";
import DestinationCard from "../components/DestinationCard";

export default function HomeScreen() {
  const db = useSQLiteContext();
  const [destinations, setDestinations] = useState<any[]>([]);

  // Lấy dữ liệu từ SQLite
  const loadDestinations = async () => {
    const rows = await db.getAllAsync("SELECT * FROM destinations");
    setDestinations(rows);
  };

  useEffect(() => {
    loadDestinations();
  }, []);

  const categories = ["Mountain", "Beach", "Forest", "City"];

  return (
    <ScrollView style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.hello}>Hello👋</Text>
          <Text style={styles.username}>Long</Text>
        </View>
        <Image source={{ uri: "https://i.pravatar.cc/150" }} style={styles.avatar} />
      </View>

      {/* Search */}
      <TextInput placeholder="Search destination..." style={styles.search} />

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
        {categories.map((c) => (
          <CategoryButton key={c} label={c} />
        ))}
      </ScrollView>

      {/* Results loaded from DB ✅ */}
      <Text style={styles.sectionTitle}>Best Destination</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {destinations.map((item) => (
          <DestinationCard key={item.id} item={item} />
        ))}
      </ScrollView>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:"#f5f6fa",paddingHorizontal:20},
  header:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:50},
  hello:{color:"#8e8e8e"},
  username:{fontSize:22,fontWeight:"700"},
  avatar:{width:45,height:45,borderRadius:25},
  search:{backgroundColor:"#fff",padding:14,borderRadius:12,marginTop:20},
  categories:{marginTop:15},
  sectionTitle:{marginTop:25,fontSize:20,fontWeight:"700"},
});
