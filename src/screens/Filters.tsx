import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import Slider from "@react-native-community/slider";
import RadioGroup from "react-native-radio-buttons-group";
import type { RadioButtonProps } from "react-native-radio-buttons-group";

import {
  FILTER_TYPE,
  ROOT_STACK_PARAM_LIST,
  YEAR_FILTER_OPTION,
} from "../constants/dataTypes";
import { FiltersList } from "../constants/suggestions";
import Button from "../components/Button";
import { useAppDispatch, useAppSelector } from "../hooks/reducer";
import { fetchCars, selectFilter } from "../reducer/cars";
import Typography from "../components/Typography";

type Props = NativeStackScreenProps<ROOT_STACK_PARAM_LIST, "Filters">;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 16,
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
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#1C1C1C",
  },
  clearButton: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  valueIndicator: {
    textAlign: "center",
  },
  options: {
    alignSelf: "center",
    alignItems: "flex-start",
  },
});

const YEAR_OPTION_MAP: { [key: string]: YEAR_FILTER_OPTION } = {
  lt: YEAR_FILTER_OPTION.LT,
  gt: YEAR_FILTER_OPTION.GT,
  exact: YEAR_FILTER_OPTION.EXACT,
};

const Filters: React.FC<Props> = ({ route, navigation }) => {
  const dispatch = useAppDispatch();
  const filterType = route.params?.filterType;
  const filterOption = FiltersList.find((filter) => filter.type === filterType);
  const selectedFilter = useAppSelector(selectFilter);

  const [value, setValue] = useState(
    filterType === FILTER_TYPE.YEAR ? `${filterOption?.min}` : ""
  );

  useEffect(() => {
    if (selectedFilter?.type === filterType) {
      setValue(selectedFilter.value);
      if (filterType === FILTER_TYPE.YEAR) {
        setYearOptions([
          {
            id: "1",
            value: "exact",
            label: "Exact year",
            selected: selectedFilter?.option === YEAR_FILTER_OPTION.EXACT,
          },
          {
            id: "2",
            value: "gt",
            label: "Greater than",
            selected: selectedFilter?.option === YEAR_FILTER_OPTION.GT,
          },
          {
            id: "3",
            value: "lt",
            label: "Less than",
            selected: selectedFilter?.option === YEAR_FILTER_OPTION.LT,
          },
        ]);
      }
    }
  }, [selectedFilter, filterType]);

  const [yearOptions, setYearOptions] = useState<RadioButtonProps[]>([
    {
      id: "1",
      value: "exact",
      label: "Exact year",
      selected: true,
    },
    {
      id: "2",
      value: "gt",
      label: "Greater than",
    },
    {
      id: "3",
      value: "lt",
      label: "Less than",
    },
  ]);

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
        fetchCars(
          filterType === FILTER_TYPE.YEAR
            ? {
                type: filterType,
                value,
                option:
                  YEAR_OPTION_MAP[
                    yearOptions?.find((option) => option.selected)?.value ??
                      "exact"
                  ],
              }
            : {
                type: filterType,
                value,
              }
        )
      );
      navigation.goBack();
    }
  }, [value, filterType, yearOptions]);

  const handleOptionChange = (options: RadioButtonProps[]) => {
    setYearOptions(options);
  };

  const handleClear = () => setValue("");

  if (filterType !== FILTER_TYPE.YEAR) {
    const renderingSuggestion =
      value.length === 0
        ? filterOption?.suggestion
        : filterOption?.suggestion?.filter((suggestion) =>
            suggestion.startsWith(value)
          );
    return (
      <View style={styles.wrapper}>
        <View style={styles.inputWrapper}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={setValue}
              autoFocus
            />
            <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
              <Text>X</Text>
            </TouchableOpacity>
          </View>
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
              variant={suggestion === value ? "secondary" : "primary"}
              onPress={() => handleSuggestion(suggestion)}
              key={`suggestion_${idx}`}
            />
          ))}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <Typography variant="subtitle">Please select a model year</Typography>
      <Slider
        minimumValue={filterOption?.min ?? 1900}
        maximumValue={filterOption?.max ?? new Date().getFullYear()}
        step={1}
        onValueChange={(value) => setValue(`${value}`)}
        value={Number(value)}
      />
      <Typography variant="body" style={styles.valueIndicator}>
        {value}
      </Typography>
      <RadioGroup
        radioButtons={yearOptions}
        onPress={handleOptionChange}
        containerStyle={styles.options}
      />
      <Button variant="secondary" title="Apply Filter" onPress={handleFilter} />
    </View>
  );
};

export default Filters;
