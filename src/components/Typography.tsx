import React from "react";
import { Text, StyleSheet } from "react-native";
import type { TextProps as BaseTextProps } from "react-native";

export interface TextProps extends BaseTextProps {
  variant: "title" | "subtitle" | "header" | "body";
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  header: {
    fontSize: 24,
    fontWeight: "600",
  },
  body: {
    fontSize: 16,
    fontWeight: "400",
  },
});

const Typography: React.FC<TextProps> = ({
  variant = "body",
  style,
  ...props
}) => {
  const typographyStyle = StyleSheet.flatten([styles[variant], style]);
  return <Text style={typographyStyle} {...props} />;
};

export default Typography;
