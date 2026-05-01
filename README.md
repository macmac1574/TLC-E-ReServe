# TLC E-Reserve — Landing Page

Clean, modern, mobile-responsive landing page for the **TLC E-Reserve: Facility and Equipment Reservation System** Android app.

## Stack

- **HTML5**
- **Tailwind CSS** (via CDN)
- **Vanilla JavaScript**
- **AOS** — scroll animations (CDN)
- **Lucide** — icons (CDN)
- **Inter** — Google Fonts

No build step required.

## Run Locally

Just open `index.html` in your browser. Or, for proper relative-path behavior, serve the folder with any static server:

```powershell
# Python (built-in on most systems)
python -m http.server 8080

# Node (if installed)
npx serve .
```

Then visit `http://localhost:8080`.

## File Structure

```
.
├── index.html          # All page sections
├── styles.css          # Custom styles (phone mockup, cards, lightbox)
├── script.js           # Navbar, mobile menu, lightbox, AOS init
├── assets/
│   ├── qr-code.svg          # PLACEHOLDER — replace with real QR
│   ├── app-mockup.svg       # Phone mockup illustration
│   ├── screenshot-1.svg ... screenshot-6.svg
│   └── app.apk              # PLACE YOUR APK HERE
└── README.md
```

## Replacing Placeholders

### 1. QR Code

Generate a real QR code pointing to your APK download URL using any free tool:

- https://www.qr-code-generator.com/
- https://qrcode-monkey.com/

Save it as `assets/qr-code.png` (or `.svg`) and update the `src` in `index.html` (search for `qr-code.svg`).

### 2. APK File

Drop your built APK into `assets/app.apk`. The hero and download buttons already link to it via:

```html
<a href="assets/app.apk" download>...</a>
```

### 3. Screenshots

Replace `assets/screenshot-1.svg` through `screenshot-6.svg` with real screenshots (recommended: 9:16 aspect ratio, ~1080×1920 PNG/JPG). Update the `src` references in the Screenshots section if you change extensions.

### 4. App Preview / Mockup

Replace `assets/app-mockup.svg` with a real screenshot of your app's home screen. The phone-frame chrome (notch, bezel) is rendered in CSS, so use a clean screen capture without the device frame.

## Customization

### Brand color

In `index.html`, find the `tailwind.config` block and tweak the `brand` palette:

```js
brand: {
  600: '#2563eb',  // primary
  700: '#1d4ed8',  // hover
  ...
}
```

### App version, contact, links

Update directly in `index.html`:

- **Version / file size / Android version** → Download section `<dl>`
- **Contact email** → System Information section + Footer
- **Developer name** → Footer + System Information section

## Sections

1. **Hero** — App name, tagline, description, QR, download button, phone mockup
2. **About** — Purpose, audience, benefits
3. **How to Use** — 8 numbered steps
4. **Features** — 9 feature cards
5. **Screenshots** — 6-image grid with click-to-enlarge lightbox
6. **Download** — Large QR + button + version info
7. **System Information** — Version, developer, devices, contact
8. **Footer** — Copyright, navigation, contact

## Browser Support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari). No IE support.

## License

Internal use — Mark L. Sicad.
