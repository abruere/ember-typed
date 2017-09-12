/* jshint node: true */
'use strict';

var MergeTrees = require('broccoli-merge-trees');
var Funnel     = require('broccoli-funnel');
var map        = require('broccoli-stew').map;

module.exports = {
  name: 'ember-typed',

  included: (app) => {
      app.import('vendor/typed.js');
  },

  treeForVendor(vendorTree) {
    let trees = [];
    let typedTree = new Funnel('bower_components/typed.js/js', {
      files: ['typed.js']
    });

    if (vendorTree) {
      trees.push(vendorTree);
    }

    typedTree = map(typedTree, (content) => `if (typeof FastBoot === 'undefined') { ${content} }`);

    trees.push(typedTree);

    return new MergeTrees(trees);
  },
};
