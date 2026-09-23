---
project: UNNATURAL
register: brand
aesthetic_direction: industrial / signage
color_strategy: restrained
design_system: bespoke native HTML with Astro and React
motion_intensity: 5
visual_density: 4
---
# Design read
An ordinary person's philosophical field book viewed through black metal: crisp editorial typography, quiet reading surfaces, liquid silver reflections where a reader acts.

Every screen must read as the same product if placed side by side.

## User direction
The user approved expressive serif titles and crisp modern controls, then specified: “I want a black metallic liquid mirror look for transitions and stuff.” The primary appearance is dark graphite with warm white prose and restrained chrome reflections. Offer a light reading appearance as a user preference. Preserve content, chapter sequence, references, and exercises.

## Signature
Curved liquid-silver reflections appear on deliberate interaction. Fine metallic edges, a black interior, and silver primary actions. Reflections stay inside buttons and action controls; disclosures use quiet state changes. On fine pointers, the reflection follows the pointer within the hovered control, using one animation frame per input update. No idle animation, cursor trail, parallax, or reflection over paragraphs. Use layered CSS gradients without canvas, WebGL, video, or an animation package. Reading surfaces stay still.

## Tokens
Normative color values; derive other surfaces with color-mix from these. Keep existing token names for compatibility.
- Default/dark: ground #0c0e10; tint #14171b; warm #1d2227; ink #f0efea; soft #ced1d3; muted #a3a9af; faint #939aa1; rule #626c75; rule-soft #2a3036.
- Light: ground #f5f5f2; tint #eceeeb; warm #e1e5e2; ink #1b2023; soft #354047; muted #56636b; faint #627078; rule #75838b; rule-soft #ced4d5.
- Primary action is silver/ink contrast, not a saturated accent. --color-accent aliases ink. --color-metal-high #ffffff / #ffffff; --color-metal-low #78848e / #879399.
- Existing semantic act colors (want/distinction/growth): dark #e4a18f/#a5bfd3/#aac9b0; light #914b3c/#365c77/#396349. These are content semantics, not competing primary action colors. Wiki dark #cfb889 / light #765a2d.
- Add --color-surface (tint), --color-surface-raised (warm), --color-field (ground), --color-danger (act-i), --color-focus (ink), --radius-sm: 6px, --radius-md: 12px, --radius-lg: 20px, --radius-pill: 999px, --control-height: 48px, --header-height (responsive actual header), --shadow-panel.
- Use existing --space-* 4px rhythm. Page max 72rem, prose 40rem. Gutters 20px phone, 32px tablet, 40px desktop plus safe areas.

## Typography
Retain Fraunces display and Source Serif 4 body as existing book identity (intentional exception to generic font bans). Add --font-ui: 'Manrope', ui-sans-serif, sans-serif for navigation, labels, inputs, buttons. Keep JetBrains Mono for short metadata only. No all-caps long input labels. Text inputs >=16px. Main body 18px desktop, 17px mobile; long-form adjustable 18/20/22px. Fluid h1 up to 80px homepage and 64px page, minimum 36px phone; no forced horizontal clipping. Headings balance and wrap. Utilities 13–14px minimum, prose 1.7 line-height.

## Components and surfaces
Primary button: light silver fill, dark text, 48px min, 6px radius, curved reflective feedback; dark silver surface for secondary controls. Native controls remain native. Inputs have visible borders, label above, spacious fill, matching focus. Quiet reading paragraphs have no enclosing cards. Panels have 12px radius and 1px edge; never nest visual cards. Tags pill-shaped only for categories/selectable chips. Native disclosures get plus/minus and a clear open surface. Logo retains existing three-bar mark.

## Motion
--dur-fast 160ms; --dur-med 280ms; --dur-slow 560ms. --ease-out cubic-bezier(.2,.7,.2,1). Reflections settle over 280–560ms on hover/focus/activation, with no infinite animation. Pointer positioning is enabled only for fine pointers without reduced motion; keyboard and touch feedback use CSS. At most 4px translation on page/section reveal. Cross-document View Transitions API progressive enhancement where supported: a 440ms curved reveal without a brightness flash; the site header stays visually anchored. Ordinary navigation works everywhere. prefers-reduced-motion disables transforms/animations and smooth scrolling. JS must never hide essential content waiting for intersection.

## Voice and accessibility
Preserve the author's plain, curious, occasionally wry text. No rewriting manuscript, adding claims, or fake stats. Buttons name actions. Keyboard focus uses 2px ink ring + 3px offset; all standalone targets >=44px (prefer48). Honor reduced motion and forced colors. Every control has label and state; native details/select/checkbox, no custom combobox. Contrast text >=4.5:1, larger text >=3:1; interactive border/focus >=3:1. Data labels never decorative faint colors.

## Anti-default rationale
Industrial reading surface follows explicit user choice. Metallic transitions are specific to this request; no purple glow, gradient text, generic bento features, rotating orbs, nested cards, or hover-only content. Existing serif and act palette are deliberately kept for continuity. Main content remains immediately visible.

## Contrast review
Measured sRGB contrast: dark muted text on raised surface 6.76:1; light muted text on raised surface 4.87:1; darkest silver-button region with dark label 5.06:1. Interactive border corrected to #626c75 dark (3.36:1 on panel) and #75838b light (3.35:1 on panel). Decorative separators use rule-soft. Curved reflections cap combined white opacity at .2169; conservative soft-label contrast on the brightest reflected dark raised surface is 5.13:1. Keep theme colors separate from responsive token specificity so dark mode follows the same viewport rules.
