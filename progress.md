Original prompt: In Mobile View the Colours and all look different when they should look like what it is in the Desktop Menu For Example the sky is a different colour and stuff

- Investigated responsive CSS and 3D scene setup.
- Found the main visual mismatch in `src/components/Map.tsx`: mobile skips post-processing entirely, while desktop uses bloom + vignette.
- Applying a lightweight mobile-safe post-processing path so mobile retains the same overall color grading as desktop.
- Matched the mobile nav drawer glass background to the desktop menu so the tint/sky behind it stays consistent.
- Verified the project builds successfully with `npm.cmd run build`.
- Could not run the bundled Playwright visual client because the repo does not currently include the `playwright` package.
