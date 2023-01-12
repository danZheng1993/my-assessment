import React, { useMemo } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import {
  FILTER,
  FILTER_INFO,
  FILTER_TYPE,
  YEAR_FILTER_OPTION,
} from "../constants/dataTypes";
import { FiltersList } from "../constants/suggestions";
import { useAppSelector } from "../hooks/reducer";
import { selectFilter } from "../reducer/cars";
import Button from "./Button";
import Typography from "./Typography";

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 16,
    paddingBottom: 8,
    marginLeft: 16,
  },
  scroll: {
    flexGrow: 0,
    flexDirection: "row",
  },
});

export type FilterHeaderProps = {
  onSelectFilter?: (filterType: FILTER_TYPE) => void;
  onClear?: () => void;
};

type FilterButtonProps = {
  filterOption: FILTER;
  filter?: FILTER_INFO;
  onPress?: (filterType: FILTER_TYPE) => void;
};

const FilterButton: React.FC<FilterButtonProps> = ({
  filterOption,
  filter,
  onPress,
}) => {
  const label = useMemo(() => {
    if (filterOption.type === filter?.type) {
      if (filterOption.type === FILTER_TYPE.YEAR) {
        switch (filter.option) {
          case YEAR_FILTER_OPTION.EXACT:
            return `${filterOption.label}: ${filter.value}`;
          case YEAR_FILTER_OPTION.GT:
            return `${filterOption.label}: >${filter.value}`;
          case YEAR_FILTER_OPTION.LT:
          default:
            return `${filterOption.label}: <${filter.value}`;
        }
      }
      return `${filterOption.label}: ${filter.value}`;
    }
    return filterOption.label;
  }, [filterOption, filter]);
  const variant = filterOption.type === filter?.type ? "secondary" : "primary";
  return (
    <Button
      variant={variant}
      title={label}
      onPress={() => onPress?.(filterOption.type)}
    />
  );
};

const FilterHeader: React.FC<FilterHeaderProps> = ({
  onSelectFilter,
  onClear,
}) => {
  const filter = useAppSelector(selectFilter);
  return (
    <View style={styles.wrapper}>
      <Typography variant="subtitle">Filter By:</Typography>
      <ScrollView style={styles.scroll} horizontal>
        {FiltersList.map((filterOption, idx) => (
          <FilterButton
            filterOption={filterOption}
            filter={filter}
            onPress={onSelectFilter}
            key={`filterOption_${idx}`}
          />
        ))}
        {filter && (
          <Button variant="primary" title="Clear Filter" onPress={onClear} />
        )}
      </ScrollView>
    </View>
  );
};

export default FilterHeader;
