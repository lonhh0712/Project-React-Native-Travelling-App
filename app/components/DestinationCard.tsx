import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function DestinationCard({ item }: any) {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.price}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { width: "48%",backgroundColor: "#fff",borderRadius: 14, marginBottom: 16,padding: 10,shadowColor: "#00000010", shadowOpacity: 0.1, shadowRadius: 6,},
  image: { width: "100%", height: 120, borderRadius: 12, marginBottom: 8 },
  name: { fontSize: 18, fontWeight: "600", marginTop: 5 },
  price: { marginTop: 6, color: "#4a6cf7", fontWeight: "bold" }
});
