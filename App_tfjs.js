import { Camera } from "expo-camera";
import React from "react";
import { Button } from 'react-native';

import { LoadingView } from "./app2.dyagnosys.com/src/LoadingView";
import { ModelView } from "./app2.dyagnosys.com/src/ModelView";
import { useTensorFlowLoaded } from "./app2.dyagnosys.com/src/useTensorFlow";

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
