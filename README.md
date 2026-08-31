# ROOT Lab Website

Official website source for **ROOT Lab — Physical-Layer Root of Trust for Intelligent Secure Systems** at National Korea Maritime & Ocean University.

- Website: <https://s2in0217.github.io/root-jylee.github.io/>
- Research: <https://s2in0217.github.io/root-jylee.github.io/research.html>
- Publications: <https://s2in0217.github.io/root-jylee.github.io/publications.html>
- Members: <https://s2in0217.github.io/root-jylee.github.io/members.html>

## Site structure

| Path | Purpose |
| --- | --- |
| `index.html` | Lab overview and recent news |
| `research.html` | Research vision and major themes |
| `publications.html` | Publications and patents |
| `members.html` | Principal investigator and lab members |
| `projects.html` | Funded research projects |
| `contact.html` | Contact information and location |
| `styles.css` | Shared visual system and responsive layout |
| `assets/` | Images and other static assets |

The site is intentionally static and does not require a Jekyll build. The `.nojekyll` file tells GitHub Pages to serve the files as written.

## Preview locally

Run any static HTTP server from the repository root. For example:

```bash
python -m http.server 4173
```

Then open <http://127.0.0.1:4173/>. Opening the HTML files directly can hide path and caching problems, so an HTTP preview is preferred.

## Branch and deployment workflow

1. Create a short-lived branch from `beta-site`.
2. Make one focused change and preview every affected page locally.
3. Open a pull request into `beta-site` for review.
4. Confirm the beta deployment before promoting the reviewed changes to the production repository or production branch.

Avoid editing the published branch directly. Keep content changes separate from broad design changes when practical.

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

Suggested publication metadata for a future data-driven version of the site:

```yaml
- title: Full paper title
  authors: Author One, Author Two
  venue: Journal or conference
  year: 2026
  tags: [covert-communication, physical-layer-security]
  paper_url: https://...
  code_url: https://github.com/root-jylee/...
  dataset_url: null
  project_url: null
```

## Updating people, projects, and news

- Add or update people in `members.html`.
- Add funded projects in `projects.html`, including the funder and project period.
- Keep the home-page news list short; move lasting research information to its dedicated page.
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

ROOT Lab is led by **Jinyoung Lee, Ph.D.**, Department of Electronics and Electrical Information Engineering, National Korea Maritime & Ocean University.

See the [contact page](https://s2in0217.github.io/root-jylee.github.io/contact.html) for current contact details.
