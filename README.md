# The Rosary — A Companion for Prayer

**Use the app:** [keithintrinidad.github.io/Rosary-Helper](https://keithintrinidad.github.io/Rosary-Helper/)
· **Source code:** [github.com/keithintrinidad/Rosary-Helper](https://github.com/keithintrinidad/Rosary-Helper)

Everything below describes the PWA bundle that powers it.

Everything in this folder is meant to be uploaded together, as loose
files (not inside another folder), to the root of a GitHub repo that
is published with GitHub Pages.

## What's here

- `index.html` — the whole app (prayers, mysteries, and the other
  devotions), self-contained apart from the two files below it needs.
  Includes an "About This App" panel, behind the (i) button, with
  authorship credit and a license summary.
- `manifest.json` — name, icon, theme color, and `"display":
  "fullscreen"` so an installed copy opens with no browser toolbar
  or status bar.
- `icon-192.png`, `icon-512.png` — the app icon, at the two sizes
  Android/PWA installs expect.
- `sw.js` — a service worker. Once someone visits the page a first
  time (online), it caches the app shell, so it keeps working with
  no connection on later visits — same as the single-file download,
  but automatic, and it updates itself when you push changes.
- `LICENSE.md` — the terms this project is shared under (see below).

## Uploading to GitHub

1. Create (or reuse) the repo, e.g. `Rosary-Helper`.
2. Upload these files to its root — not nested in a subfolder.
3. In the repo's **Settings → Pages**, set the source to the `main`
   branch, root folder, and save.
4. Visit `https://keithintrinidad.github.io/Rosary-Helper/` to confirm it loads.

From there, "Add to Home Screen" (Android/Chrome) or "Add to Dock"
(desktop Chrome/Edge) installs it as a proper PWA — fullscreen, with
its own icon, and working offline after the first visit.

## Updating the app later

If you come back with a changed `index.html` (new prayers, a fix,
etc.), bump the version number in `sw.js`'s `CACHE_NAME` line (e.g.
`rosary-companion-v1` → `rosary-companion-v2`) before you upload —
otherwise returning visitors' browsers may keep serving the old
cached copy for a while instead of fetching the update.

## License & authorship

This app is free to share and adapt — but never to sell, and any
version made from it must stay free too. It was built by Claude
(Anthropic), prompted and directed by **Keith Francis**
([@keithintrinidad](https://github.com/keithintrinidad)). Full terms
are in `LICENSE.md`. The same credit and a license summary are also
shown inside the app itself, behind the (i) information button —
useful for anyone who only ever sees the installed app, not this
repository (an APK install, say, carries no README with it).

## Companion apps

Built the same way, under the same license:

- **Catholic Prayers** — [use the app](https://keithintrinidad.github.io/Catholic-Prayers/) · [source code](https://github.com/keithintrinidad/Catholic-Prayers)
- **Bread of the Presence** — [use the app](https://keithintrinidad.github.io/Bread-of-the-Presence/) · [source code](https://github.com/keithintrinidad/Bread-of-the-Presence)

## Turning this into an Android APK

Run the live site through **pwabuilder.com** and set the Android
package's Display Mode to **Fullscreen**. Note that for the thin
browser toolbar to disappear entirely (not just the status bar), the
`assetlinks.json` file PWABuilder gives you must be served from the
root of the domain, `https://keithintrinidad.github.io/.well-known/assetlinks.json`
— which means it has to live in a repo named `keithintrinidad.github.io`,
since this app is served from a sub-path of that domain.
