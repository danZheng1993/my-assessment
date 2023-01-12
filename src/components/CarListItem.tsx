import React from "react";
import { Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { CAR_DETAILS } from "../constants/dataTypes";
import Typography from "./Typography";

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
    flexDirection: "row",
    alignItems: "stretch",
  },
  previewImage: {
    width: 64,
    height: 64,
  },
  content: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 8,
  },
  disabled: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
});

export interface CarListItemProps {
  carDetails: CAR_DETAILS;
  onPress?: (id: string) => void;
}

const CarListItem: React.FC<CarListItemProps> = ({ carDetails, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.wrapper, !carDetails.availability && styles.disabled]}
      onPress={() => onPress?.(carDetails.id)}
      disabled={!carDetails.availability}
    >
      <Image
        style={styles.previewImage}
        source={{ uri: carDetails.image }}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Typography variant="subtitle">
          {carDetails.car} {carDetails.car_model} {carDetails.car_model_year}
        </Typography>
        <Typography variant="body">Color: {carDetails.car_color}</Typography>
        <Typography variant="body">VIN: {carDetails.car_vin}</Typography>
      </View>
    </TouchableOpacity>
  );
};

export default CarListItem;
