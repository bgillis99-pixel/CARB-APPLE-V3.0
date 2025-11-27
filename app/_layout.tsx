import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'CARB-APPLE V3.0' }} />
    </Stack>
  );
}
