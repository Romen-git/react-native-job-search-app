import { Stack } from "expo-router";

import { useCallback, useEffect } from "react";

import { useFonts } from "expo-font";

import * as SplashScreen from "expo-splash-screen";

const Layout = () => {
  const [fontsLoaded] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack onLayout={onLayoutRootView}>
      <Stack.Screen name="index" />
      <Stack.Screen name="job-details/[id]" />
      <Stack.Screen name="search/[id]" />
    </Stack>
  );
};

export default Layout;
