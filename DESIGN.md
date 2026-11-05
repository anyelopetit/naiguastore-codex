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

## Brand correction requested by the owner

The owner rejected the paper-colored editorial world: it did not read as NaiguaStore or PC hardware retail. This correction supersedes those palette and type choices while retaining static content, accessible shopping interactions and the same WhatsApp flow.

- The actual supplied emblem is the first identity asset, visible in header and footer. The white Naigua / gold Store lettering follows the supplied logo rather than a generic wordmark with a dot.
- Main background #080F1B, surfaces #142237, text #EDF3FB, secondary text #B5C3D5. Gold #E0BB65 is the brand accent; blue #225DC0 carries shopping controls. Light image stages remain only behind merchandise for clear product recognition.
- Exo 2 variable is the hardware-facing display font; Libre Franklin remains for readable shopping UI. Besley is retained only in the brand name to echo the original emblem's serif lettering.
- An ASUS manufacturer photograph of an RTX 4060 is the hero, explicitly identified as illustrative. No invented custom-PC photograph or inventory claim. Direct component category links make the store's domain recognizable without reading editorial prose.
- Search sits in the homepage header. The first screen explicitly says hardware for PC and names CPUs, GPUs, RAM and SSDs. No animated RGB backgrounds, artificial scarcity, competing mascots or decorative circuitry.
- Existing product and category URLs, metadata, specifications, reference-price disclosures and checkout semantics remain intact.
