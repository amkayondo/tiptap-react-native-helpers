const DomParser = require('react-native-html-parser').DOMParser;

export function elementFromString(value) {
  // add a wrapper to preserve leading and trailing whitespace
  const wrappedValue = `<body>${value}</body>`;
  return new DomParser().parseFromString(wrappedValue, 'text/html');
}
