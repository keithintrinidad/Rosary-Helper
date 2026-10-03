# The Rosary — PWA bundle

Everything in this folder is meant to be uploaded together, as loose
files (not inside another folder), to the root of a GitHub Pages
site — ideally a `username.github.io` repo, so `.well-known/`
verification works at the true domain root if you later package this
as an Android app with PWABuilder.

## What's here

- `index.html` — the whole app (prayers, mysteries, and the other
  devotions), self-contained apart from the two files below it needs.
- `manifest.json` — name, icon, theme color, and `"display":
  "fullscreen"` so an installed copy opens with no browser toolbar
  or status bar.
- `icon-192.png`, `icon-512.png` — the app icon, at the two sizes
  Android/PWA installs expect.
- `sw.js` — a service worker. Once someone visits the page a first
  time (online), it caches the app shell, so it keeps working with
  no connection on later visits — same as the single-file download,
  but automatic, and it updates itself when you push changes.

## Uploading to GitHub

1. Create (or reuse) a repo named exactly `yourusername.github.io`.
2. Upload these five files to its root — not nested in a subfolder.
3. In the repo's **Settings → Pages**, set the source to the `main`
   branch, root folder, and save.
4. Visit `https://yourusername.github.io` to confirm it loads.

From there, "Add to Home Screen" (Android/Chrome) or "Add to Dock"
(desktop Chrome/Edge) installs it as a proper PWA — fullscreen, with
its own icon, and working offline after the first visit.

## Updating the app later

If you come back with a changed `index.html` (new prayers, a fix,
etc.), bump the version number in `sw.js`'s `CACHE_NAME` line (e.g.
`rosary-companion-v1` → `rosary-companion-v2`) before you upload —
otherwise returning visitors' browsers may keep serving the old
cached copy for a while instead of fetching the update.

## Turning this into an Android APK

See the chat for the full walkthrough: run this site through
**pwabuilder.com** once it's live on GitHub Pages, and set the
Android package's Display Mode to **Fullscreen**. For the thin
browser toolbar to disappear entirely (not just the status bar),
you'll also need to add the `assetlinks.json` file PWABuilder gives
you at `https://yourusername.github.io/.well-known/assetlinks.json`.
