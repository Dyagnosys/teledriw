import React, { useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Animated, StyleSheet, Text, View, Button } from "react-native";
import { Video } from "expo-av";
import AppLoading from 'expo-app-loading';


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

const Stack = createStackNavigator();

function App() {


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
