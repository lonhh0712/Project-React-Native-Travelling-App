import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import initDatabase from "../src/database/init";

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="travel.db" onInit={initDatabase}>
      <Stack screenOptions={{ headerShown: false }} />
    </SQLiteProvider>
  );
}
