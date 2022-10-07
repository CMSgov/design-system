## Example: Consuming assets from the CDN

This shows the usage of CMS design system components from the CDN:

- Include the CSS bundle
- Include the JS vendor files and bundle
- Use CSS layout, utility, and component classes
- Render React components from our library

See also: https://reactjs.org/docs/add-react-to-a-website.html

## Getting started

1. Run `yarn install && yarn build` in the main repo to build the cdn assets
2. Run `copy_build.sh` in this folder to copy assets from the build folder to this folder.
3. Utilize a simple http server like `http-server` (downloadable from npm/yarn) to serve the contents of this folder.
4. Open localhost at the served port to view. (default for http-server is http://localhost:8080)
