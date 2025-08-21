import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useRouter } from 'expo-router';
import { authService } from '@/lib/auth';

export default function RootLayout() {
  useFrameworkReady();
  const router = useRouter();

  useEffect(() => {
    // Check authentication status on app start
    const user = authService.getCurrentUser();
    if (!user) {
      router.replace('/login');
    } else {
      // Redirect to appropriate dashboard based on role
      switch (user.role) {
        case 'student':
          router.replace('/(tabs)');
          break;
        case 'professor':
          router.replace('/(professor)');
          break;
        case 'admin':
          router.replace('/(admin)');
          break;
      }
    }
  }, []);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(professor)" options={{ headerShown: false }} />
        <Stack.Screen name="(admin)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}