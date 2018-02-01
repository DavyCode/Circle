const dependable = require('dependable'),
      path = require('path'),
      container = dependable.container();

const simpleDependencies = [
  ['_', 'lodash']
];

simpleDependencies.forEach( val => {
  container.register(val[0], () => {
    return require(val[1]);
  })
});

