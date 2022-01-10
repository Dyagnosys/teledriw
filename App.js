import { Video } from "expo-av";
import { useMemo } from "react";
import { Animated, StyleSheet, Text, View, Image } from "react-native";
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import React, { useState } from 'react';
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
  },
  backgroundViewWrapper: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  title: {
    color: "black",
    fontSize: 22,
    marginTop: 160,
    paddingHorizontal: 30,
    textAlign: "center",
  },
  riw: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

  }
});

import riwlogo from './assets/img/logo/riw.png';

const fetchFonts = async () =>
  await Font.loadAsync({
    RobotoCondensedBold: require('./assets/fonts/RobotoCondensed-Bold.ttf'),
    RobotoCondensedRegular: require('./assets/fonts/RobotoCondensed-Regular.ttf'),
  });


export default function App() {
  const [IsReady, SetIsReady] = useState(false);
  const opacity = useMemo(() => new Animated.Value(0), []);

  const LoadFonts = async () => {
    await useFonts();
  };

  if (!IsReady) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => SetIsReady(true)}
        onError={() => { }}
      />
    );
  }


  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Animated.View
          style={[styles.backgroundViewWrapper, { opacity: opacity }]}>
          <Video
            resizeMode="cover" isLooping isMuted positionMillis={0}
            shouldPlay style={{ flex: 1 }}
            source={
              require('./assets/videos/videoAI.mp4')
            }
            onLoad={() => {
              Animated.timing(opacity, {
                toValue: 1,
                useNativeDriver: true,
              }).start();
            }}
          />
        </Animated.View>
      </View>

      <View style={styles.title}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 330 }}>
          <Text style={{ fontFamily: 'RobotoCondensedBold', color: "rgba(9,66,125,1)", fontSize: 80 }}>
            TELED
          </Text>
          <Text style={{ fontFamily: 'RobotoCondensedRegular', color: "rgba(9,66,125,1)", fontSize: 28, alignItems: 'center' }}>
            DYAGNOSYS
          </Text>

        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: -100 }}>
          <Image style={{ resizeMode: "contain", height: 150, width: 150 }}
            source={riwlogo}
          />
        </View>
      </View>

    </View>
  );
}

