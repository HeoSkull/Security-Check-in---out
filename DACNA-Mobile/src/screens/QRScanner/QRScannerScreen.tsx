import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

import { Camera, CameraType } from "react-native-camera-kit";

export default function QRScannerScreen(props: any) {
  const { navigation } = props;

  const [qr, setQr] = useState<string>("");

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setQr("");
    });

    return unsubscribe;
  }, [navigation]);

  const handleOnScanned = (qr: string) => {
    // turn off the scanner
    setQr(qr);
    const [action, id] = qr.split(":");

    if (action === "checkin") {
      navigation.navigate("CheckIn", { id });
    }
  };

  return (
    <View style={StyleSheet.absoluteFill}>
      {!qr && (
        <Camera
          style={StyleSheet.absoluteFill}
          cameraType={CameraType.Back}
          scanBarcode={true}
          onReadCode={(event: any) => {
            handleOnScanned(event.nativeEvent.codeStringValue);
          }}
          showFrame={true}
          laserColor="transparent"
          frameColor="white"
        />
      )}
    </View>
  );
}
