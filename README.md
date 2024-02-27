# The Hitchikers Guide to NBIS

> System Developer Onboarding Document

This is a small, static site for managing NBIS Systtem Developer Onboarding Workflows.

## What's In Here?

The `package.json` defines compile-time dependencies and some scriptes to assist with developer tooling, as well as some small content transformation scripts.

The `src` directory contains all the HTML fragments, a collection of small resources covering various onboarding topics.

The `src/lib` directory contains `.js` and `.css` files for styling and defining components.

A `bin` directory contains the content transformation scripts. These scripts handle basic content indexing and structure data extraction.

## Scripts

### `❯ npm start`

Starts an HTTP Server out of the `src` directory.

### `❯ npm run extract`

Reads the contents of `src/*.html` and transforms all the RDFa content to JSON-LD. Writes the result to `src/index.json`.