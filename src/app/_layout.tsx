import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Sembunyikan header bawaan untuk custom UI
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="home" />
      <Stack.Screen name="verify" />
    </Stack>
  );
}
