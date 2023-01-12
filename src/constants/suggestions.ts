import { FILTER, FILTER_TYPE } from "./dataTypes";

const COLOR_SUGGESTION = [
  'Yellow',     'Maroon',
  'Red',        'Violet',
  'Purple',     'Indigo',
  'Teal',       'Pink',
  'Aquamarine', 'Green',
  'Mauv',       'Turquoise',
  'Blue',       'Puce',
  'Orange',     'Khaki',
  'Fuscia',     'Goldenrod',
  'Crimson'
]

const MAX_YEAR = 2013
const MIN_YEAR = 1926

const MODEL_SUGGESTION = [
  'Montero',         'Passat',           'L-Series',
  'Compass',         'Lancer Evolution', 'Suburban',
  'Ram Van B350',    'Ascender',         '6 Series',
  'GTO',             'Mazda5',           'Q7',
  'SL-Class',        'C70',              'Envoy XL',
  'Vandura G3500',   'CTS',              'X5 M',
  'Viper',           'Taurus',           'Swift',
  'Town & Country',  '430',              'Tacoma Xtra',
  'Eurovan',         'Econoline E150',   'Sierra Denali',
  'Esprit',          'Expo',             'Discovery Series II',
  'Tracker',         'Monterey',         '3 Series',
];

const BRANDS_SUGGESTION = [
  'Mitsubishi', 'Volkswagen', 'Saturn',        'Jeep',
  'Chevrolet',  'Dodge',      'Isuzu',         'BMW',
  'Mazda',      'Audi',       'Mercedes-Benz', 'Volvo',
  'GMC',        'Cadillac',   'Ford',          'Suzuki',
  'Chrysler',   'Maserati',   'Toyota',        'Lotus',
  'Land Rover', 'Geo',        'Mercury',       'Lamborghini',
  'Jaguar',     'Subaru',     'Porsche',       'Acura',
  'Kia',        'Nissan',     'Lexus',         'Bentley',
  'Honda',      'Ferrari',    'Pontiac',       'Aston Martin',
  'Hyundai',    'Lincoln',    'Buick',         'MINI',
  'Plymouth',   'Saab',       'Maybach',       'Eagle',
  'Oldsmobile', 'Infiniti',   'Scion',         'Smart',
  'Daewoo',     'Alfa Romeo', 'Hummer',        'Corbin',
  'Panoz',      'Morgan',     'Peugeot',       'Rolls-Royce',
  'Holden',     'Tesla'
]

export const FiltersList: FILTER[] = [
  {
    name: 'brand',
    label: 'Brand',
    type: FILTER_TYPE.BRAND,
    suggestion: BRANDS_SUGGESTION,
  },
  {
    name: 'model',
    label: 'Model',
    type: FILTER_TYPE.MODEL,
    suggestion: MODEL_SUGGESTION,
  },
  {
    name: 'year',
    label: 'Year',
    type: FILTER_TYPE.YEAR,
    min: MIN_YEAR,
    max: MAX_YEAR,
  },
  {
    name: 'color',
    label: 'Color',
    type: FILTER_TYPE.COLOR,
    suggestion: COLOR_SUGGESTION,
  },
]
