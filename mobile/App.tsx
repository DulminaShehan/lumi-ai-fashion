import { useCallback, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { RootNavigator } from '@/navigation/RootNavigator';
import { AnimatedSplashScreen } from '@/screens/Splash/AnimatedSplashScreen';
import { WishlistProvider } from '@/store/WishlistContext';
import { CartProvider } from '@/store/CartContext';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });
  const [introVisible, setIntroVisible] = useState(true);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <SafeAreaProvider>
        <WishlistProvider>
          <CartProvider>
            <StatusBar style={introVisible ? 'light' : 'dark'} />
            <RootNavigator />
            {introVisible && <AnimatedSplashScreen onFinish={() => setIntroVisible(false)} />}
          </CartProvider>
        </WishlistProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
