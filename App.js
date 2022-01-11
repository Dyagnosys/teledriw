import React, { useState } from 'react';
import { useMemo } from "react";
import { Animated, StyleSheet, Text, View, Image, Linking, Button } from "react-native";
import { Video } from "expo-av";
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';


import { Camera } from "expo-camera";
import { LoadingView } from "./src/components/tfjs/LoadingView";
import { ModelView } from "./src/components/tfjs/ModelView";
import { useTensorFlowLoaded } from "./src/components/tfjs/useTensorFlow";

import riwlogo from './assets/img/logo/riw.png';

const styles = StyleSheet.create({
  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
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

const fetchFonts = async () =>
  await Font.loadAsync({
    RobotoCondensedBold: require('./assets/fonts/RobotoCondensed-Bold.ttf'),
    RobotoCondensedRegular: require('./assets/fonts/RobotoCondensed-Regular.ttf'),
  });


// -------------------------------------- AQUI COMEÇA O APP ----------------------------// 

export default function App() {

  const isLoaded = useTensorFlowLoaded();
  const [permission, requestPermission] = Camera.useCameraPermissions();


  const [IsReady, SetIsReady] = useState(false);
  const opacity = useMemo(() => new Animated.Value(1), []);

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

  // if (!permission?.granted) {
  //   return (
  //     <LoadingView message="">
  //       <Button title="Estado Emocional" onPress={requestPermission} />
  //     </LoadingView>
  //   )
  // }

  if (!isLoaded) {
    return <LoadingView message="Loading TensorFlow" />;
  }

  return (

    <View style={styles.container}>
      <View style={styles.background}>
        <Animated.View
          style={[styles.backgroundViewWrapper, { opacity: opacity }]}>
          <Video
            rate={1}
            resizeMode="cover" isLooping isMuted positionMillis={0}
            shouldPlay style={{ flex: 1 }}
            source={
              require('./assets/videos/videoAI6.mp4')
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

        {/* Aqui aparece na testa */}


        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 330, marginLeft: 15 }}>
          <Text style={{ fontFamily: 'RobotoCondensedBold', color: "rgba(9,66,125,1)", fontSize: 80 }}>
            TELED
          </Text>
          <Text style={{ fontFamily: 'RobotoCondensedRegular', color: "rgba(9,66,125,1)", fontSize: 28, alignItems: 'center' }}>
            DYAGNOSYS
          </Text>

          <LoadingView message="">
            <Button title="Estado Emocional" onPress={requestPermission} />
          </LoadingView>

        </View>
        {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: -100 }}>
          <Image style={{ resizeMode: "contain", height: 150, width: 150 }}
            source={riwlogo}
          />
        </View> */}

      </View>

    </View>

  );
}

