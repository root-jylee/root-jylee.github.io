# ROOT Lab Website

Source for the official website of **ROOT Lab (보안통신 연구실)** — *Root of Trust from the Physical Layer* — at the Department of Information, Communications and Electronic Engineering, The Catholic University of Korea.

- Website: <https://root-jylee.github.io/>
- Research: <https://root-jylee.github.io/research.html>
- Publications: <https://root-jylee.github.io/publications.html>
- Members: <https://root-jylee.github.io/members.html>

## Site structure

| Path | Purpose |
| --- | --- |
| `index.html` | Home: hero, lab introduction, open positions, news, research areas, gallery teaser |
| `members.html` | Principal investigator and lab members |
| `research.html` | Research overview and the four research axes |
| `publications.html` | Publications and patents |
| `projects.html` | Funded research projects |
| `gallery.html` | Lab photos |
| `contact.html` | Contact information and location (Michael Hall T710) |
| `404.html` | Not-found page |
| `styles.css` | Shared visual system, Latin Modern web fonts, responsive layout |
| `assets/img/` | Emblem, logo lockups, hero image, figures |
| `assets/fonts/` | Latin Modern Roman web fonts (GUST Font License) |

The site is intentionally static and does not require a Jekyll build. The `.nojekyll` file tells GitHub Pages to serve the files as written.

## Preview locally

Run any static HTTP server from the repository root. For example:

```bash
python -m http.server 4173
```

Then open <http://127.0.0.1:4173/>. Opening the HTML files directly can hide path and caching problems, so an HTTP preview is preferred.

## Deployment

GitHub Pages publishes the `main` branch. A push to `main` goes live within about a minute.

- Preview every affected page locally before pushing, at desktop and phone widths.
- When `styles.css` or an image changes, bump the `?v=` query string on its references so browsers pick up the new file.
- Keep content changes separate from broad design changes when practical.

## Adding a publication

Add the entry to the appropriate year and category in `publications.html`. Use the published title, author order, venue, and year exactly as they appear in the paper.

When an artifact is publicly available, add compact links after the citation:

```html
<a href="PAPER_URL">Paper</a>
<a href="CODE_REPOSITORY_URL">Code</a>
<a href="DATASET_URL">Dataset</a>
<a href="PROJECT_PAGE_URL">Project page</a>
```

Only include links that are public and maintained. Code should normally live in a dedicated repository in the ROOT Lab GitHub organization. Each artifact repository should follow the template in [`docs/paper-repository-template.md`](docs/paper-repository-template.md).

## Updating people, projects, news, and photos

- Add or update people in `members.html`.
- Add funded projects in `projects.html`, including the funder and project period.
- Keep the home-page news list short; move lasting research information to its dedicated page.
- Put gallery photos in `assets/img/gallery/` and add them to `gallery.html`.
- Do not commit private contact details, unpublished manuscripts, credentials, or restricted datasets.

## Organization profile

The ROOT Lab organization landing page uses a separate special repository:

```text
root-jylee/.github/profile/README.md
```

A ready-to-copy draft is maintained in [`docs/organization-profile-README.md`](docs/organization-profile-README.md). This website repository's `README.md` is for website contributors; it does not automatically become the organization profile.

## Repository policy

- Use clear commit messages written in the imperative mood.
- Obtain permission before publishing third-party images or datasets.
- Add a license to each public code repository. Do not assume that the website repository's terms apply to research software.
- Include a `CITATION.cff` file or BibTeX entry in every paper artifact repository.

## Contact

ROOT Lab is led by **Jinyoung Lee, Ph.D.**, Assistant Professor, Department of Information, Communications and Electronic Engineering, The Catholic University of Korea.

See the [contact page](https://root-jylee.github.io/contact.html) for current contact details.
