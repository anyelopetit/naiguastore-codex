# NaiguaStore design contract

## Intent
A considered hardware counter with a familiar gaming signature. A customer should understand the component before being asked to contact the shop.

## What looked generated in the previous concept
Uniform nested blue panels, repeated outlines, bright actions on every line, generic upgrade copy, excessively equal visual weight and little meaningful relation to the supplied identity.

## Form
Taste selected split-stage after rejecting contact-sheet: its own sheet requires roughly 20 images and the actual catalog contains four. Seed 53901542, recorded in .taste-skill/direction.json. The split applies to the hero; a persistent half-screen rail across the entire catalog was rejected because it squeezes product comparison. Manufacturer photographs replace the dealt atmosphere set; no invented founder letter or unrelated scenery is used.

## Tokens
- Ink / brand navy: #122B45; secondary action blue #154D85.
- Main paper: #F6F5F1; product stage #EEEDE7.
- Gold brand accent: #D5B66C. No decorative UI gradients or glows.
- Besley variable, 600, for wordmark and editorial headings; Libre Franklin variable for shopping UI. Self-hosted OFL fonts.
- Main margins 5%, content max 1440px.
- Product grid 4 columns desktop and 2 mobile; product cards have no enclosing box or shadow. Repetition is retained intentionally for comparison, rather than applying Taste's marketing-card ban to an actual catalog.
- 3px control corners; focus outline 3px; touch targets generally 44px or greater.

## Motion
One RAM-object arrival, restrained text entrance, interruptible hover/press feedback and a native modal cart entering from the right. No animation delays block shopping. prefers-reduced-motion removes travel and animation. Utility labels can use 12–14px while explanatory body text stays 15–17px; avoid artificially enlarging financial metadata at the expense of comparison.

## Responsive topology
Desktop has one brand header, a balanced hero, catalog, identity/compatibility section, FAQ and functional footer. Mobile reflows the hero vertically, keeps search in the catalog and uses a full-height cart. No floating assistant or bottom bar obscures products.

## Truth and implementation
Reference prices must be labeled. No synthetic scarcity or guarantee durations. WhatsApp text must preserve quantities and known model distinctions, state unknown shipping, and ask for a current quote. The native dialog manages focus; cart data is normalized and totals use integer cents.

## Verification boundaries
Taste's local Chrome inspector could not launch in this sandbox. Browser screenshots and interactions are checked through Playwright in CI. Do not describe local inspector results as passed. Manufacturer images are source assets credited in /fuentes/ and docs/ASSETS.md, not proof of owned stock.
