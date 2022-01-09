import React, { FC } from "react";
import LottieView from "lottie-react-native";
import animation from "./spinner.json";
import { RFValue } from "react-native-responsive-fontsize";

interface Props {
  size?: number;
}

export const Loader: FC<Props> = ({ size }) => {
  return (
    <LottieView
      loop
      autoPlay
      source={animation}
      style={{ height: size, width: size }}
    />
  );
};

Loader.defaultProps = {
  size: RFValue(250),
};
