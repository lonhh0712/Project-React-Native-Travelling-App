import { View, Text, StyleSheet, Image } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://i.pravatar.cc/200" }}
        style={styles.avatar}
      />
      <Text style={styles.name}>User Profile</Text>
      <Text style={styles.email}>user@example.com</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,alignItems:"center",justifyContent:"center",padding:20,backgroundColor:"#f5f6fa"},
  avatar:{width:100,height:100,borderRadius:50,marginBottom:20},
  name:{fontSize:24,fontWeight:"700"},
  email:{fontSize:16,color:"#8e8e8e",marginTop:4}
});
