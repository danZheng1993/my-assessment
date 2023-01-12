export enum FILTER_TYPE {
  BRAND,
  MODEL,
  COLOR,
  YEAR,
}

export enum YEAR_FILTER_OPTION {
  EXACT,
  LT,
  GT,
}

export type FILTER = {
  name: string
  label: string
  type: FILTER_TYPE,
  suggestion?: string[],
  min?: number,
  max?: number,
}

export type FILTER_INFO = {
  type: FILTER_TYPE
  value: string
  option?: YEAR_FILTER_OPTION
}

export type CAR_DETAILS = {
  id: string
  car: string
  car_model: string
  car_color: string
  car_model_year: number
  car_vin: string
  price: number
  availability: boolean
  image?: string
  big_image?: string
}

export type CAR_INFO_MAP = {[key: string]: CAR_DETAILS}

export type ROOT_STACK_PARAM_LIST = {
  Main: undefined;
  Detail: { carId: string };
  Filters: { filterType: FILTER_TYPE };
};
