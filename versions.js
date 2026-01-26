#!/usr/bin/env node
const { execSync } = require('child_process');

const version = process.argv[2];
const type = process.argv[3];
const component = process.argv[4];

if (!version || !type || !component) {
  console.error('Usage: node versions.js <version> <type> <component>');
  process.exit(1);
}

// Current branch
const branch = process.env.GITHUB_REF ? process.env.GITHUB_REF.replace('refs/heads/', '') : 'unknown';

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

let tag;

if(branch.endsWith('release')) {
  tag = `${component}-v${version}`;
} else if(branch.endsWith('master')) {
  tag = `${component}-v${version}-${type}-${count}`;
}
console.log(`Custom Tag: ${tag}`);

// Check if tag already exists on remote
const tagExists = execSync(`git ls-remote --tags origin ${tag}`).toString().trim();

if (tagExists) {
  console.log(`⚠️ Tag ${tag} already exists, skipping creation.`);
} else {
  // Create and push tag
  execSync(`git tag ${tag}`);
  execSync(`git push origin ${tag}`);
  console.log(`✅ Tag ${tag} created and pushed!`);
}
