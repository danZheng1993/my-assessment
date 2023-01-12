import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import Typography from "./Typography";

const styles = StyleSheet.create({
  primaryText: {},
  secondaryText: {
    color: "white",
  },
  baseBG: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: 36,
    margin: 8,
  },
  primaryBG: {
    borderColor: "#CFCFCF",
    backgroundColor: "white",
  },
  secondaryBG: {
    borderColor: "#1E1E1E",
    backgroundColor: "#1E1E1E",
  },
});

export type ButtonProps = {
  variant: "primary" | "secondary";
  buttonStyle?: ViewStyle;
  labelStyle?: TextStyle;
  title: string;
  onPress?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  variant,
  buttonStyle,
  labelStyle,
  title,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.baseBG, styles[`${variant}BG`], buttonStyle]}
      onPress={onPress}
    >
      <Typography variant="body" style={[styles[`${variant}Text`], labelStyle]}>
        {title}
      </Typography>
    </TouchableOpacity>
  );
};

export default Button;
