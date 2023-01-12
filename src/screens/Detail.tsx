import React from "react";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { ROOT_STACK_PARAM_LIST } from "../constants/dataTypes";
import { useAppSelector } from "../hooks/reducer";
import { selectCarDetails } from "../reducer/cars";
import Typography from "../components/Typography";

type Props = NativeStackScreenProps<ROOT_STACK_PARAM_LIST, "Detail">;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 300,
  },
  content: {
    padding: 16,
  },
});

const Detail: React.FC<Props> = ({ route }) => {
  const carDetailsSelector = useAppSelector(selectCarDetails);
  const carId = route.params.carId;
  const carDetails = carDetailsSelector(carId);
  return (
    <SafeAreaView style={styles.wrapper}>
      <Image
        source={{ uri: carDetails.big_image }}
        resizeMode="cover"
        style={styles.image}
      />
      <View style={styles.content}>
        <Typography variant="title">Details</Typography>
        <Typography variant="subtitle">Brand: {carDetails.car}</Typography>
        <Typography variant="subtitle">
          Model: {carDetails.car_model}
        </Typography>
        <Typography variant="subtitle">
          Year: {carDetails.car_model_year}
        </Typography>
        <Typography variant="subtitle">Model: {carDetails.car}</Typography>
      </View>
    </SafeAreaView>
  );
};

export default Detail;
