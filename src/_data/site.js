/**
  Your global data folder is controlled by the dir.data configuration option. 
  All *.json and module.exports values from *.js files in this directory will 
  be added into a global data object available to all templates.

  This file can be accessed using: {{ site.title }}
*/

var pkgJSON = require('../../package.json');

module.exports = {
  title: 'Ceritanya Developer Podcast',
  author: 'Riza Fahmi',
  url: 'https://ceritanyadeveloper.com', // Don't end with a slash /
  description:
    'Developer inspiratif bercerita tentang bagaimana mereka mulai menjadi developer. Mulai dari komputer pertama, pengalaman ngoding pertama, hingga hal random lainnya.',
  meta_data: {
    theme_color: '#E7FFFA', // used in Chrome, Firefox OS and Opera
    twitter: '@rizafahmi22',
    default_social_image:
      'https://ceritanyadeveloper.com/static/images/logo-2020.png'
  },
  ENV: process.env.ELEVENTY_ENV,
  version: pkgJSON.version
};
