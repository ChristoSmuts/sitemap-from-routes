const { SitemapStream } = require("sitemap");
const { createWriteStream } = require("fs");
const path = require("path");
const ts = require("typescript");
const fs = require("fs");
const { once } = require("events");

const ROUTES_FILE = "./src/app/app-routes.ts";
const HOSTNAME = "https://www.domain.com";

// Function to extract routes from TypeScript file
function extractRoutes(filePath) {
  const source = fs.readFileSync(filePath, "utf8");
  const sourceFile = ts.createSourceFile(
    filePath,
    source,
    ts.ScriptTarget.Latest
  );
  const routes = [];

  function visit(node) {
    if (ts.isArrayLiteralExpression(node)) {
      node.elements.forEach((element) => {
        if (ts.isObjectLiteralExpression(element)) {
          element.properties.forEach((property) => {
            if (
              ts.isPropertyAssignment(property) &&
              property.name.text === "path"
            ) {
              const routeString = property.initializer.text;
              // Check if the route contains a colon (:) which indicates a parameter or catch all (**) and don't add those to the sitemap
              if (!routeString.includes(":") && !routeString.includes("**")) {
                routes.push(routeString);
              }
            }
          });
        }
      });
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return routes;
}

let routes = extractRoutes(ROUTES_FILE);

// Add additional routes that aren't in the route file
routes = [...routes, "example-route"];

const sitemap = new SitemapStream({ hostname: HOSTNAME });
const writeStream = createWriteStream(
  path.join(__dirname, "src", "sitemap.xml")
);

sitemap.pipe(writeStream);

routes.forEach((route) => {
  // Generate last modified date based on the date the script is run
  const lastmod = new Date().toISOString().split("T")[0];

  // Create priority based on the number of parts in the route
  const crawlDepth = route.split("/").filter((part) => part !== "").length;
  const priority = calculatePriority(crawlDepth);

  // Sitemap properties
  sitemap.write({ url: `/${route}`, changefreq: "yearly", priority, lastmod });
});

sitemap.end();

once(writeStream, "close")
  .then(() => {
    console.log("Sitemap generated successfully");
  })
  .catch((err) => {
    console.error("Error generating sitemap:", err);
  });

function calculatePriority(crawlDepth) {
  switch (crawlDepth) {
    case 0:
      return 1; // Root URL (home page)
    case 1:
      return 0.9; // Top-level pages
    case 2:
      return 0.8; // Second-level pages
    case 3:
      return 0.7; // Third-level pages
    default:
      return 0.6; // Deeper pages
  }
}
