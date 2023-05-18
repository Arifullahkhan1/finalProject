import { StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import LottieView from "lottie-react-native";

const LoadingAnimation = ({source, width = 200, height = 200}) => {
  const animation = useRef(null);
  return (
    <View>
    <LottieView
      autoPlay
      loop
      ref={animation}
      speed={.5}
      style={{
        width: width,
        height: height,
        backgroundColor: "#141B41",
      }}
      onFinish={{}}
      // Find more Lottie files at https://lottiefiles.com/featured
      source={source}
    />
    </View>
  );
};

export default LoadingAnimation;