---
title: How Browsers Work
---

## Reference
https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work

## Conclusion
Here is a brief summary of the key points:

1. **User Input**: The process starts when a user enters a URL in the browser's address bar.
2. **DNS Lookup**: The browser performs a DNS lookup to translate the domain name into an IP address.
3. **TCP Connection**: A TCP connection is established between the browser and the server.
4. **HTTP Request**: The browser sends an HTTP request to the server for the desired resource.
5. **Server Response**: The server responds with the requested resources, such as HTML, CSS, JavaScript, images, etc.
6. **Rendering**: The browser renders the page by parsing the HTML and building the DOM tree, parsing CSS to create the CSSOM tree, combining them into the render tree, and then performing layout and paint operations to display the content on the screen.

Here is a more detailed breakdown of the rendering process:

- **HTML Parsing**: The browser parses the HTML to create the DOM (Document Object Model) tree.
- **CSS Parsing**: The browser parses the CSS to create the CSSOM (CSS Object Model) tree.
- **Style Calculation**: The browser combines the DOM and CSSOM trees to create the render tree.
- **Layout**: The browser calculates the layout of each element in the render tree.
- **Paint**: The browser paints the pixels to the screen based on the layout.
- **Composite**: The browser composites the layers to create the final visual representation.