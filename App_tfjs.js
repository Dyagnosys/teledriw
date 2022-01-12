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
      <LoadingView message="Camera permission is required to continue">
        <Button title="Grant permission" onPress={requestPermission} />
      </LoadingView>
    );
  }

  if (!isLoaded) {
    return <LoadingView message="Loading TensorFlow" />;
  }

  return <ModelView />;
}
