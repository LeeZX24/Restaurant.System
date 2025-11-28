const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const tailwind = require('@tailwindcss/postcss');
const autoprefixer = require('autoprefixer');

const inputFile = path.resolve(__dirname, 'src/styles.css');
const outputFile = path.resolve(__dirname, 'src/tailwind-output.css');

fs.readFile(inputFile, 'utf8', (err, css) => {
  if (err) throw err;

  postcss([tailwind(), autoprefixer()])
    .process(css, { from: inputFile, to: outputFile })
    .then(result => {
      fs.writeFileSync(outputFile, result.css);
      if (result.map) fs.writeFileSync(outputFile + '.map', result.map.toString());
      console.log('✅ Tailwind CSS built successfully!');
    })
    .catch(err => console.error(err));
});
