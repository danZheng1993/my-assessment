const Data = require("./sample.json");

const Cars = Data.cars;

const colors = Cars.reduce((prev, current) => {
  if (!prev.includes(current.car_color)) {
    return [...prev, current.car_color];
  }
  return prev;
}, []);

const extractUniqueFields = (field_name) =>
  Cars.reduce((prev, current) => {
    if (!prev.includes(current[field_name])) {
      return [...prev, current[field_name]];
    }
    return prev;
  }, []);

console.log("colors ===================++>");
console.log(colors);

const [max_year, min_year] = Cars.reduce(
  ([max, min], current) => {
    if (current.car_model_year > max) {
      return [current.car_model_year, min];
    }
    if (current.car_model_year < min) {
      return [max, current.car_model_year];
    }
    return [max, min];
  },
  [Cars[0].car_model_year, Cars[0].car_model_year]
);

console.log("max min year =============================>");
console.log({ max_year, min_year });

const model = extractUniqueFields("car_model");

console.log("models ==============================++>");
console.log(model);

const brands = extractUniqueFields("car");

console.log("brands=================================+>");
console.log(brands);
