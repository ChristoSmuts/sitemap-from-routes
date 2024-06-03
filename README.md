# Sitemap from Routes

This project is a simple way to generate a sitemap for your project based on your routing file. It uses the [sitemap](https://github.com/ekalinin/sitemap.js) library to generate the sitemap.

## Notes

You can also setup your project to generate the sitemap each time you run your build, allowing your sitemap to always be up to date based on your project routes.

``"build": "... node generate-sitemap.js"``

Add additional routes to the `routes` object in the [generate-sitemap.js](https://github.com/ChristoSmuts/sitemap-from-routes/blob/main/generate-sitemap.js) script.

`routes = [...routes, "example-route"];`

## Usage

First, install the dependency **sitemap**:

`yarn add sitemap` or `npm install sitemap`

Then add the file [generate-sitemap.js](https://github.com/ChristoSmuts/sitemap-from-routes/blob/main/generate-sitemap.js) to your project root folder and add the script to your **package.json** scripts property:

`"sitemap": "node generate-sitemap.js"`

Then run the script to generate your sitemap:

`yarn sitemap` or `npm run sitemap`

## Dependencies
- sitemap - https://github.com/ekalinin/sitemap.js
- typescript - https://www.npmjs.com/package/typescript
