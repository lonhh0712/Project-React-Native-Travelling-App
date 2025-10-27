import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function CategoryButton({ label }: { label: string }) {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button:{backgroundColor:"#fff",paddingVertical:10,paddingHorizontal:18,borderRadius:20,marginRight:10,borderWidth:1,borderColor:"#ddd"},
  text:{fontWeight:"600"}
});
