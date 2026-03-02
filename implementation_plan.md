# Goal Description
The objective is to make the React app downloadable as a Progressive Web App (PWA) under the name "Glo-Med".

## User Review Required
None

## Proposed Changes
### Root Directory
#### [MODIFY] [index.html](file:///c:/Users/Kisakye%20Israel%20Ezra/Desktop/Glo-med/index.html)
- Add `<meta name="theme-color" content="#10847E">`
- Add `<link rel="manifest" href="/manifest.json" />`
- Add `<link rel="apple-touch-icon" href="https://cdn-icons-png.flaticon.com/512/3063/3063822.png">`
- Set `<meta name="apple-mobile-web-app-capable" content="yes">`

#### [NEW] [public/manifest.json](file:///c:/Users/Kisakye%20Israel%20Ezra/Desktop/Glo-med/public/manifest.json)
- Move existing `manifest.json` into a new `public` directory so it gets hosted properly by Vite.
- Ensure correct configuration matching PWA standards.

#### [NEW] [public/sw.js](file:///c:/Users/Kisakye%20Israel%20Ezra/Desktop/Glo-med/public/sw.js)
- Move existing `sw.js` to the `public` directory.

### Src Directory
#### [MODIFY] [src/main.jsx](file:///c:/Users/Kisakye%20Israel%20Ezra/Desktop/Glo-med/src/main.jsx)
- Register the service worker (`/sw.js`) on window load if `serviceWorker` is supported by the browser.

## Verification Plan
### Manual Verification
1. Run `npm run dev` or `npm run preview`.
2. Open the app in Chrome/Edge.
3. Verify that the "Install App" or download icon appears in the browser's URL bar.
4. Verify that the app asks to be downloaded on mobile devices.
