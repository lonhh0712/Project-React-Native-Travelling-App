import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function DestinationCard({ item }: any) {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.location}>{item.location}</Text>
      <Text style={styles.price}>{item.price}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card:{width:180,marginRight:15,backgroundColor:"#fff",borderRadius:14,padding:10},
  image:{width:"100%",height:120,borderRadius:12},
  name:{fontSize:18,fontWeight:"600",marginTop:5},
  location:{color:"#8e8e8e",marginTop:2},
  price:{marginTop:6,color:"#4a6cf7",fontWeight:"bold"}
});
