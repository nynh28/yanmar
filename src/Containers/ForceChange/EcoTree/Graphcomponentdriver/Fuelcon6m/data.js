const energySources = [
  { value: 'hydro', name: 'Hydro-electric' },
  { value: 'oil', name: 'Oil' },
  { value: 'gas', name: 'Natural gas' },
  { value: 'coal', name: 'Coal' },
  { value: 'nuclear', name: 'Nuclear' }
];

const countriesInfo = [{
  country: 'Jul',
  hydro: 5.45,

}, {
  country: 'Aug',
  hydro: 5.23,

}, {
  country: 'Sep',
  hydro: 5.69,

}, {
  country: 'Nov',
  hydro: 5.68,

}, {
  country: 'Dec',
  hydro: 5.78,

}, {
  country: 'Jan',
  hydro: 5.05,

}];

export default {
  getEnergySources() {
    return energySources;
  },
  getCountriesInfo() {
    return countriesInfo;
  }
};
