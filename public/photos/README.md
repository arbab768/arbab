# Photos Upload Directory (`/public/photos`)

Upload your images, portfolio photos, lab inspection pictures, certificates, or profile pictures here!

### How to use uploaded photos:
Because this folder is inside `public/photos/`, any file you drop here is instantly accessible in your website or code:

- **File location:** `/public/photos/my-photo.jpg`
- **Web URL in code:** `/photos/my-photo.jpg`
- **Example in HTML/React:**
  ```tsx
  <img src="/photos/my-photo.jpg" alt="Description" />
  ```

### Supported formats:
- JPG / JPEG (`.jpg`, `.jpeg`)
- PNG (`.png`)
- WebP (`.webp`)
- SVG (`.svg`)
- GIF (`.gif`)

*Note: Files placed in this directory are tracked by Git and will be preserved when exported or deployed.*
