# 🔐 Password Generator

A clean, browser-based password generator with a dark UI. No dependencies, no frameworks — just HTML, CSS, and vanilla JavaScript.

![Password Generator Preview](preview.png)

---

## Features

- **Customizable length** — slider from 8 to 64 characters
- **Character set toggles** — Uppercase, Lowercase, Numbers, Symbols
- **Click to copy** — click anywhere on the password box to copy it instantly
- **Strength indicator** — live bar that rates the password Weak / Fair / Good / Strong
- **Auto-generates** a password on page load

---

## File Structure

```
password_generator/
├── index.html   # Markup and layout
├── style.css    # All styling (dark theme, gradients, animations)
├── index.js     # Password logic, copy-to-clipboard, strength calculation
└── README.md
```

---

## How It Works

### `index.js`

Four character pools are defined at the top:

```js
const UPPER   = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
const LOWER   = "abcdefghijklmnopqrstuvwxyz".split('');
const DIGITS  = "0123456789".split('');
const SYMBOLS = `!@#$%^&*()_+-=[]{}|:;<>,./?'"` + "`~\\".split('');
```

When **Generate Password** is clicked:
1. `buildCharPool()` merges only the checked character sets
2. A loop picks random characters from the pool up to the selected length
3. The result is written to the display box
4. `calcStrength()` scores it based on length and variety, and `updateStrength()` updates the bar

### Copy to Clipboard

Clicking the password display (or the copy icon button) calls:

```js
navigator.clipboard.writeText(display.value)
```

The box flashes green and a "Copied!" hint appears for 2 seconds, then resets.

### Strength Scoring (`calcStrength`)

| Criteria | Points |
|---|---|
| Length ≥ 12 | +1 |
| Length ≥ 20 | +1 |
| Has uppercase AND lowercase | +1 |
| Has a digit | +1 |
| Has a symbol | +1 |

Score is scaled to 4 levels: **Weak → Fair → Good → Strong**.

---

## Usage

Just open `index.html` in any modern browser — no build step or server needed.

```bash
open index.html
```
