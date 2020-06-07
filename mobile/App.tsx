import React from 'react';
import { AppLoading } from 'expo'
import { StatusBar, View } from 'react-native';
import { Comfortaa_400Regular, Comfortaa_500Medium, Comfortaa_600SemiBold, Comfortaa_700Bold } from '@expo-google-fonts/comfortaa'
import { FredokaOne_400Regular, useFonts } from '@expo-google-fonts/fredoka-one'
import Routes from './src/routes'

export default function App() {
  const [fontsLoaded] = useFonts({
    Comfortaa_400Regular,
    Comfortaa_500Medium,
    Comfortaa_700Bold,
    Comfortaa_600SemiBold,
    FredokaOne_400Regular
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <Routes />
    </>
  );
}