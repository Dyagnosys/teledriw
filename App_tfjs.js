import { Camera } from "expo-camera";
import React from "react";
import { Button } from 'react-native';

import { LoadingView } from "./src/components/tfjs/LoadingView";
import { ModelView } from "./src/components/tfjs/ModelView";
import { useTensorFlowLoaded } from "./src/components/tfjs/useTensorFlow";

export default function App() {
  const isLoaded = useTensorFlowLoaded();
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission?.granted) {
    return (
      <LoadingView message="Por favor, permita utilização da câmera" >
        <Button title="PERMITIR" onPress={requestPermission} />
      </LoadingView>


    );
  }

  if (!isLoaded) {
    return <LoadingView message="Carregando modelo de Inteligência Artificial" />;
  }

  return <ModelView />;
}
