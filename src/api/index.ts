import { FILTER_INFO, FILTER_TYPE, YEAR_FILTER_OPTION } from "../constants/dataTypes"

const BASE_URL = 'https://myfakeapi.com/'
export const IMAGE_BASE_URL = 'https://picsum.photos/seed/'

export const filterCars = (filter?: FILTER_INFO) => {
  if (!filter) {
    return fetchAllCars();
  }
  if (filter.type === FILTER_TYPE.BRAND) {
    return fetchCarsByBrand(filter.value);
  }
  if (filter.type === FILTER_TYPE.COLOR) {
    return fetchCarsByColor(filter.value);
  }
  if (filter.type === FILTER_TYPE.MODEL) {
    return fetchCarsByModel(filter.value);
  }
  if (filter.type === FILTER_TYPE.YEAR) {
    return fetchCarsByYear(filter.value, filter.option);
  }
}

const fetchAllCars = async () => {
  const result = await fetch(`${BASE_URL}/api/cars/`).then(res => res.json())
  return result
}

export const fetchCarDetailsByID = async (id: string) => {
  const result = await fetch(`${BASE_URL}/api/cars/${id}`).then(res => res.json())
  return result
}

const fetchCarsByBrand = async (brand: string) => {
  const result = await fetch(`${BASE_URL}/api/cars/name/${brand}`).then(res => res.json());
  return result
}

const fetchCarsByModel = async (model: string) => {
  const result = await fetch(`${BASE_URL}/api/cars/model/${model}`).then(res => res.json());
  return result;
}

const fetchCarsByColor = async (color: string) => {
  const result = await fetch(`${BASE_URL}/api/cars/color/${color}`).then(res => res.json());
  return result;
}

const fetchCarsByYear = async (year: string, option: YEAR_FILTER_OPTION = YEAR_FILTER_OPTION.EXACT) => {
  let url = `${BASE_URL}/api/cars/year/${year}`;
  if (option === YEAR_FILTER_OPTION.LT) {
    url = `${url}?q=lt`
  } else if (option === YEAR_FILTER_OPTION.GT) {
    url = `${url}?q=gt`
  }
  const result = await fetch(url).then(res => res.json());
  return result;
}
