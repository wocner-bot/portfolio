# Senior designer portfolio redesign

## Goal
Make the existing portfolio visually compelling and easy for recruiters to assess: identity, seniority, scope, personal contribution, outcomes and relevant work.

## Design
User-selected dark editorial foundation, light text, restrained lime accent, consistent type scale. Actual product names replace category headlines. The first screen uses an identity/experience introduction and an original automotive video preview. Preserve all seven projects, source facts, Figma galleries, full-size image links, existing mobile device compositions and video pause control. Current positioning is Senior Product Designer / 15+ years; historical employment roles remain unchanged.

## Implementation
- Rewrite homepage structure in dist/index.html: introduction, company track record, seven project cards with role and outcome, concise skills, visible experience, contact.
- Replace accumulated homepage overrides in dist/style.css with a coherent responsive stylesheet; preserve common classes required by case templates.
- Update build-cases.py: actual product titles, concise role/scope/outcome summary before the detailed narrative, original image preview and shared navigation. Keep factual prose and galleries.
- Refine case.css through a scoped editorial layer; maintain full-size images and existing device presentation.
- Verify generated output is idempotent, every local asset/link/anchor resolves, 390/768/1440 layouts fit, video controls work, and keyboard focus is visible.
- Review code, fix important findings, commit, merge to main and push to existing Render autodeploy. Verify published pages/assets match local output.
