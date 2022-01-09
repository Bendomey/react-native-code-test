import { useTheme } from "@ui-kitten/components";
import React, { FC } from "react";
import { View as RNView, ViewProps } from "react-native";

export const ThemedView: FC<ViewProps> = ({ children, ...props }) => {
  const theme = useTheme();

  return (
    <RNView
      {...props}
      style={[
        props.style,
        {
          backgroundColor: theme["background"],
        },
      ]}
    >
      {children}
    </RNView>
  );
};
