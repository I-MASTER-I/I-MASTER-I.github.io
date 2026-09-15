# v0.1.25 Release Candidate Checklist

## Automated
- [x] Markdown content validation
- [x] Duplicate document ID validation
- [x] Date format validation (`YYYY-MM-DD`)
- [x] Project → Career reference validation
- [x] Expertise Article → Group reference validation
- [x] Static route parameter generation
- [x] GitHub Pages workflow
- [x] Sitemap / robots / 404
- [x] Header version sourced from `package.json`

## Before first GitHub Pages release
- [ ] Repository Settings → Pages → Source: GitHub Actions
- [ ] Push to `main`
- [ ] Confirm Actions build succeeds
- [ ] Confirm `/career/[slug]/`, `/projects/[slug]/`, `/expertise/[slug]/`
- [ ] Desktop / tablet / mobile visual QA
- [ ] Confirm public image assets under repository base path

`npm install` could not be completed in the artifact environment, so the final Next.js production build must be confirmed by GitHub Actions after push.
