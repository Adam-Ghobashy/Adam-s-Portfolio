# Adam Ghobashy — Portfolio

Personal portfolio site. Single page, built with plain HTML, CSS, and JavaScript — no frameworks, no build step.

## Sections

- **Hero** — intro and links to the CV and project list
- **Experience** — internship and education timeline
- **Skills** — languages, tools, and embedded/hardware stack, grouped
- **Projects** — BMO Assistant, a Qt-based hospital records GUI, and a couple of C++ data-structures/embedded projects
- **Contact** — a form with client-side validation (no backend wired up yet — see To do)

## Project structure

```
.
├── index.html
├── styles.css
├── script.js
└── assets/
    ├── resume.pdf
    └── projects/
        ├── bmo-assistant.png
        ├── hospital-system-gui.png
        └── elevator-prototype.png
```

## Running locally

No build tools required. Either open `index.html` directly in a browser, or serve the folder so relative paths and any future fetch calls behave the same as they would in production:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## To do

- [ ] Wire the contact form to a real backend or email service (Formspree, EmailJS, or a small serverless function)
- [ ] Replace `assets/resume.pdf` with the real CV
- [ ] Add real project screenshots to `assets/projects/`
- [ ] Swap the placeholder GitHub / LinkedIn / Email links in the footer for the real ones

## License

Not currently licensed for reuse.
