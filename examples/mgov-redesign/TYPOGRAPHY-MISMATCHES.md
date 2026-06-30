# Typography mismatches — for design review

Audit of the redesign components against the 12 Figma "Modern" type styles
(`src/styles/typography.css`, sourced from Figma node 1658:8406).

The **exact matches** (Featured Title, Section Title, Pair Title, Action Title,
Body) have already been wired up — those components now use the
`.ds-c-mgov-type--*` classes. The items below are the ones held back because the
component and the type scale **disagree**, so they need a design decision before
being encoded. Nothing here has been changed in code.

Reference type styles:

| Style               | Spec                          |
| ------------------- | ----------------------------- |
| Text Link           | Inter · 500 · 16 / 22 · -2.5% |
| Button (type style) | Inter · 500 · 15 / 20 · -2.5% |
| Lede                | Rubik · 400 · 22 / 32 · -2.5% |
| Body                | Rubik · 400 · 16 / 24 · 0     |
| Body Small          | Rubik · 400 · 15 / 21 · 0     |

---

## A. Component diverges from an existing type style (needs a decision)

### 1. Links vs **Text Link**

- **Components:** `Breadcrumbs` link, `FeatureCard` small-card CTA link
- **Current:** Inter · **600** · 16 / **20** · -2.5%
- **Text Link style:** Inter · **500** · 16 / **22** · -2.5%
- **Discrepancy:** weight (600 vs 500) and line-height (20 vs 22).
- **Decision:** Should redesign links adopt the canonical Text Link style (500 / 22)?
  If yes, update `Breadcrumbs.css` and `FeatureCard.css` link rules (and the
  Tooltip trigger link, which is currently weight-inherited) to Text Link, then
  apply `.ds-c-mgov-type--text-link` in the markup.

### 2. `Banner` body vs **Lede**

- **Current:** Rubik · 400 · **24 / 36** · -2.5% (`.ds-c-banner__body`)
- **Lede style:** Rubik · 400 · **22 / 32** · -2.5%
- **Discrepancy:** one size larger (24 vs 22, 36 vs 32).
- **Decision:** Is the banner intro meant to be Lede (shrink to 22/32) or is the
  larger size intentional? If Lede, swap to `.ds-c-mgov-type--lede`.

### 3. `Button` component vs **Button type style**

- **Component:** Inter · **600** · **20px** (large) / **16px** (small) · -2.5%
- **Button type style:** Inter · **500** · **15px** · -2.5%
- **Discrepancy:** size _and_ weight both differ; they describe different things.
- **Decision:** Which is canonical? The component matches the Figma Button
  component node (1930:5728); the "Button" text style in the type ramp is
  smaller/lighter. Reconcile so there's one button text definition. (Note: the
  large button text actually equals **Action Title** — 20/24/600 — today.)

---

## B. Component styles that aren't in the 12-style content scale

These are legitimately component-level styles (forms, labels) rather than the
marketing/content ramp, so they have no matching `--type` class. Flagged in case
the team wants to formalize them as named styles/tokens.

### 4. Field labels / Alert heading / Pill label — the "Label" style

- **Used by:** `TextField`/`Dropdown`/`Search` labels, `Alert` heading, `Pill` label
- **Current:** Inter · 600 · 16 / 20 (Pill is 16 / 24) · -2.5% ("Label" in Figma)
- **Note:** Matches Figma's separate "Label" style, not the content ramp.
  Consider adding a `--type--label` style if this recurs.

### 5. Hints vs **Body Small**

- **Components:** `TextField` / `Dropdown` / `Search` hint text
- **Current:** Rubik · 400 · **16** / 21 · 0
- **Body Small style:** Rubik · 400 · **15** / 21 · 0
- **Discrepancy:** size (16 vs 15). Hints are Body-size with a Body-Small
  line-height. Decide whether hints should be 15px (Body Small) or stay 16px.

### 6. Field input text

- **Components:** `TextField` / `Dropdown` / `Search` input
- **Current:** Inter · 400 · 20 / 28 · -2.5%
- **Note:** Form-input style; not in the content ramp. Could be a `--type--input`.

### 7. `FeatureCard` large body — "Body medium"

- **Current:** Inter · 400 · 20 / 28 · -2% (`.ds-c-feature-card--large .ds-c-feature-card__body`)
- **Note:** Figma "Body medium" (Inter, not Rubik). Not one of the 12 styles.

---

## C. Known limitation (not a mismatch)

### 8. `Dialog` heading — matches Featured Title but can't take a class in TSX

- The Dialog heading is a `<h2>` rendered **internally** by the DS `Dialog`
  (you pass `heading` text, not the element), so `.ds-c-mgov-type--featured-title`
  can't be applied in markup like the other titles were.
- It currently matches Featured Title via `.ds-c-mgov-dialog .ds-c-dialog__heading`
  in `Dialog.css`. Options: leave the CSS as-is (no visual difference), or have
  `Dialog.tsx` pass a pre-classed node as the `heading` prop.
