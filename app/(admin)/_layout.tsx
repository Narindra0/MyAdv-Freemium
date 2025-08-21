import { Stack } from 'expo-router';

export default function AdminLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="users" />
      <Stack.Screen name="courses-management" />
      <Stack.Screen name="schedule-management" />
      <Stack.Screen name="settings" />
    </Stack>
  );
}