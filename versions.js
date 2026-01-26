#!/usr/bin/env node
const { execSync } = require('child_process');

const version = process.argv[2];
const type = process.argv[3];
const component = process.argv[4];

if (!version || !type || !component) {
  console.error('Usage: node versions.js <version> <type> <component>');
  process.exit(1);
}

let lastTag;
try {
  lastTag = execSync(`git tag --list '${component}-v*' --sort=-creatordate | head -n1`)
    .toString()
    .trim();
} catch {
  lastTag = '';
}

// count commits since last tag
const count = lastTag
  ? execSync(`git rev-list ${lastTag}..HEAD --count`).toString().trim()
  : execSync('git rev-list HEAD --count').toString().trim();

// create custom tag
const customTag = `${component}-v${version}-${type}-${count}`;
console.log(`Custom Tag: ${customTag}`);

// create git tag and push
execSync(`git tag ${customTag}`);
execSync(`git push origin ${customTag}`);
