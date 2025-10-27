import { View, Text, StyleSheet, TextInput, Image, ScrollView, FlatList, ImageBackground } from "react-native";
import { useEffect, useState, } from "react";
import { useFonts } from 'expo-font';
import { useSQLiteContext } from "expo-sqlite";
import CategoryButton from "../components/CategoryButton";
import DestinationCard from "../components/DestinationCard";

export default function HomeScreen() {
  const db = useSQLiteContext();
  const [destinations, setDestinations] = useState<any[]>([]);
  const [fontsLoaded] = useFonts({
    GreatVibes: require('../../assets/fonts/Great_Vibes/GreatVibes-Regular.ttf'),
  });


  // Lấy dữ liệu từ SQLite
  const loadDestinations = async () => {
    const rows = await db.getAllAsync("SELECT * FROM destinations");
    setDestinations(rows);
  };

  useEffect(() => {
    loadDestinations();
  }, []);


  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.hello}>Hello👋</Text>
          <Text style={styles.username}>Long</Text>
        </View>
        <Image source={{ uri: "https://i.pravatar.cc/150" }} style={styles.avatar} />
      </View>

      <ImageBackground
        source={require("../../assets/images/bg.jpg")}
        style={styles.bg}
        imageStyle={styles.bgImage} // (optional: bo tròn, overlay,…)
      >
        <Text style={styles.bgText1}>Chào mừng đến với</Text>
        <Text style={styles.bgText2}>Việt Nam</Text>
      </ImageBackground>

      {/* Results loaded from DB ✅ */}
      <Text style={styles.sectionTitle}>Destination</Text>

      <FlatList
        data={destinations}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={({ item }) => <DestinationCard item={item} />}
        showsVerticalScrollIndicator={false}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  bg: {width: "100%",height: 250,justifyContent: "center",alignItems: "center",marginVertical: 20,},
  bgImage: {resizeMode: "cover",borderRadius: 12,},
  bgText1: {color: "#fff",fontSize: 35,fontWeight: "bold",textAlign: 'center',fontFamily: 'GreatVibes'},
  bgText2: {color: "#fff",fontSize: 80,fontWeight: "bold",textAlign: 'center',fontFamily: 'GreatVibes'},
  container: { flex: 1, backgroundColor: "#f5f6fa", paddingHorizontal: 20 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 50 },
  hello: { color: "#8e8e8e" },
  username: { fontSize: 22, fontWeight: "700" },
  avatar: { width: 45, height: 45, borderRadius: 25 },
  search: { backgroundColor: "#fff", padding: 14, borderRadius: 12, marginTop: 20 },
  categories: { marginTop: 15 },
  sectionTitle: { marginTop: 25, fontSize: 20, fontWeight: "700" },
});
