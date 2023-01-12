import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import CarListItem from "../components/CarListItem";
import {
  CAR_DETAILS,
  FILTER_TYPE,
  ROOT_STACK_PARAM_LIST,
} from "../constants/dataTypes";
import { useAppDispatch, useAppSelector } from "../hooks/reducer";
import {
  fetchCars,
  selectCars,
  selectErrorState,
  selectFilter,
  selectLoadingState,
} from "../reducer/cars";
import FilterHeader from "../components/FilterHeader";
import Typography from "../components/Typography";

type Props = NativeStackScreenProps<ROOT_STACK_PARAM_LIST, "Main">;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "flex-start",
  },
  scrollView: {
    flex: 1,
  },
  emptyStateWrapper: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
});

const EmptyState: React.FC<{ loading: boolean; error: boolean }> = ({
  loading,
  error,
}) => {
  if (loading) {
    return (
      <View style={styles.emptyStateWrapper}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.emptyStateWrapper}>
        <Typography variant="body">Unknown error occured</Typography>
      </View>
    );
  }
  return (
    <View style={styles.emptyStateWrapper}>
      <Typography variant="body">No cars found</Typography>
    </View>
  );
};

const Main: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const cars = useAppSelector(selectCars);
  const isLoading = useAppSelector(selectLoadingState);
  const hasError = useAppSelector(selectErrorState);
  const filters = useAppSelector(selectFilter);

  useEffect(() => {
    if (!isLoading && !filters && cars.length === 0) {
      dispatch(fetchCars());
    }
  }, [filters, isLoading, cars]);

  const handleDetail = (carId: string) => {
    navigation.navigate("Detail", { carId });
  };

  const handleFilter = (filterType: FILTER_TYPE) => {
    navigation.navigate("Filters", { filterType });
  };

  const clearFilter = () => {
    dispatch(fetchCars());
  };

  const renderItem = ({ item }: { item: CAR_DETAILS; index: number }) => (
    <CarListItem carDetails={item} onPress={handleDetail} />
  );

  const keyExtractor = (item: CAR_DETAILS) => item.id;

  return (
    <SafeAreaView style={styles.wrapper}>
      <FilterHeader onSelectFilter={handleFilter} onClear={clearFilter} />
      <FlatList
        style={styles.scrollView}
        data={cars}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={20}
        windowSize={5}
        ListEmptyComponent={<EmptyState loading={isLoading} error={hasError} />}
      />
    </SafeAreaView>
  );
};

export default Main;
