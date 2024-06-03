# Sitemap from Routes

This project is a simple way to generate a sitemap for your project based on your routing file. It uses the [sitemap](https://github.com/ekalinin/sitemap.js) library to generate the sitemap.

## Usage

First, install the dependency `sitemap`:

`yarn add sitemap` or `npm install sitemap`

Then add the file `generate-sitemap.js` to your project root folder and add the script to your `package.json` scripts property:

`"sitemap": "node generate-sitemap.js"`

Then run the script to generate your sitemap:

`yarn sitemap` or `npm run sitemap`
