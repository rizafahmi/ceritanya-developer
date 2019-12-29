const htmlmin = require('html-minifier');
const { DateTime } = require('luxon');
const pluginPWA = require('eleventy-plugin-pwa');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginPWA);
  // Folders to copy to build dir (See. 1.1)
  eleventyConfig.addPassthroughCopy('src/static');

  if (process.env.ELEVENTY_ENV === 'production') {
    // Minify HTML (including inlined CSS and JS)
    eleventyConfig.addTransform('compressHTML', function(content, outputPath) {
      if (outputPath.endsWith('.html')) {
        let minified = htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true
        });
        return minified;
      }
      return content;
    });
  }

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(
      'dd MMM yyyy'
    );
  });

  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(new Date(dateObj), { zone: 'utc' }).toFormat(
      'dd LLL yyyy'
    );
  });

  eleventyConfig.addPassthroughCopy('images');

  eleventyConfig.addFilter('w3cDate', function(date) {
    return date.toISOString();
  });
  // eleventyConfig.addCollection('episodes', function(collection) {
  //   return collection.getFilteredByGlob('_episodes/*.md');
  // });

  return {
    dir: {
      input: 'src/',
      output: 'dist',
      includes: '_includes'
    },
    templateFormats: ['html', 'md', 'njk'],
    htmlTemplateEngine: 'njk',

    // 1.1 Enable eleventy to pass dirs specified above
    passthroughFileCopy: true
  };
};
