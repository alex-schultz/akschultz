# akschultz.com

Skills-first personal portfolio. A single, readable page: expertise, approach,
community involvement, interests, and contact.

Plain HTML, CSS, and JavaScript. No framework, no build step, no dependencies.

## Files

- `index.html`: the whole page, including all copy. By design it contains no
  employer names or dates.
- `styles.css`: design tokens (dark slate, green accent) and all styling.
- `script.js`: highlights the current section in the nav and sets the footer
  year. The page reads fine without it.
- `assets/portrait.jpg`: hero photo.
- `favicon.svg`: favicon.

Fonts (Bricolage Grotesque, Barlow, Barlow Condensed) load from Google Fonts.

## Preview locally

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000   # http://localhost:8000
```
