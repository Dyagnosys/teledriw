import React, { useMemo, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Animated, StyleSheet, Text, View, Button, TouchableHighlight } from "react-native";
import { Video } from "expo-av";
import Apploading from "expo-app-loading";
import * as Font from "expo-font";

import App_tfjs from './App_tfjs'
const getFonts = () =>
  Font.loadAsync({
    RobotoCondensedBold: require("./assets/fonts/RobotoCondensed-Bold.ttf"),
    RobotoCondensedRegular: require("./assets/fonts/RobotoCondensed-Regular.ttf"),
  });

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 2,
    backgroundColor: '#F88',
  },
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
  },
  box: {
    padding: 20,
    backgroundColor: '#3B6CD4',
    margin: 5,
  },
});


function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function DetailsScreen({ navigation }) {
  const opacity = useMemo(() => new Animated.Value(1), []);
  const layoutStyle = { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }
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

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 230, marginLeft: 15 }}>
          <Text style={{ fontFamily: 'RobotoCondensedBold', color: "rgba(9,66,125,1)", fontSize: 80 }}>
            TELED
          </Text>
          <Text style={{ fontFamily: 'RobotoCondensedRegular', color: "rgba(9,66,125,1)", marginBottom: 50, fontSize: 28, alignItems: 'center' }}>
            DYAGNOSYS
          </Text>

          <TouchableHighlight
            style={styles.button}
            underlayColor="rgba(9,66,125,1)"
            onPress={() => navigation.push('App_tfjs')}
          >
            <Text style={{
              fontSize: 25,
              padding: 12,
            }}>Estado Emocional</Text>
          </TouchableHighlight>

        </View>






      </View>


    </View>



  );
}

const Stack = createStackNavigator();

function App() {
  const [fontsloaded, setFontsLoaded] = useState(false);

  if (fontsloaded) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Details">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="App_tfjs" component={App_tfjs} />
          <Stack.Screen name="Details" component={DetailsScreen}
            options={{
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  else {
    return (
      <Apploading
        startAsync={getFonts}
        onFinish={() => {
          setFontsLoaded(true);
        }}
        onError={console.warn}
      />
    );
  }
}

export default App;
