import React, { useCallback, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { FILTER_TYPE, ROOT_STACK_PARAM_LIST } from "../constants/dataTypes";
import { FiltersList } from "../constants/suggestions";
import Button from "../components/Button";
import { useAppDispatch } from "../hooks/reducer";
import { fetchCars } from "../reducer/cars";

type Props = NativeStackScreenProps<ROOT_STACK_PARAM_LIST, "Filters">;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  suggestionsWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  inputWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    marginRight: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#1C1C1C",
  },
});

const Filters: React.FC<Props> = ({ route, navigation }) => {
  const dispatch = useAppDispatch();
  const filterType = route.params?.filterType;
  const filter = FiltersList.find((filter) => filter.type === filterType);

  const [value, setValue] = useState("");

  const handleSuggestion = useCallback(
    (suggestion: string) => {
      dispatch(
        fetchCars({
          type: filterType,
          value: suggestion,
        })
      );
      navigation.goBack();
    },
    [filterType]
  );

  const handleFilter = useCallback(() => {
    if (value) {
      dispatch(
        fetchCars({
          type: filterType,
          value,
        })
      );
      navigation.goBack();
    }
  }, [value, filterType]);

  if (filterType !== FILTER_TYPE.YEAR) {
    const renderingSuggestion =
      value.length === 0
        ? filter?.suggestion
        : filter?.suggestion?.filter((suggestion) =>
            suggestion.startsWith(value)
          );
    return (
      <View style={styles.wrapper}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={setValue}
            autoFocus
          />
          <Button
            variant="secondary"
            title="Apply Filter"
            onPress={handleFilter}
          />
        </View>
        <View style={styles.suggestionsWrapper}>
          {renderingSuggestion?.map((suggestion, idx) => (
            <Button
              title={suggestion}
              variant="primary"
              onPress={() => handleSuggestion(suggestion)}
              key={`suggestion_${idx}`}
            />
          ))}
        </View>
      </View>
    );
  }
  return <View style={styles.wrapper} />;
};

export default Filters;
