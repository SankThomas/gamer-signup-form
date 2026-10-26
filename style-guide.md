# Front-end Style Guide

## Layout

The designs were created to the following widths:

- Mobile: 375px
- Desktop: 1440px

> 💡 These are just the design sizes. Ensure content is responsive and meets WCAG requirements by testing the full range of screen sizes from 320px to large screens.

## Colors

### Neutral

- Neutral 950: hsl(214 37% 4%)
- Neutral 900: hsl(210 39% 7%)
- Neutral 800: hsl(211 30% 13%)
- Neutral 700: hsl(211 22% 24%)
- Neutral 600: hsl(210 18% 42%)
- Neutral 500: hsl(211 14% 50%)
- Neutral 400: hsl(211 13% 55%)
- Neutral 300: hsl(211 18% 68%)
- Neutral 100: hsl(208 49% 92%)
- Neutral 50: hsl(204 60% 97%)

### Lime

- Lime 500: hsl(77 90% 59%)
- Lime 700: hsl(77 67% 39%)

### Red

- Red 400: hsl(4 100% 74%)

### Amber

- Amber 400: hsl(40 100% 65%)

### Navy

- Navy 950: hsl(214 60% 2%)

### Transparent

- Lime alpha 60: hsl(77 90% 59% / 0.6)
- Lime alpha 40: hsl(77 90% 59% / 0.4)
- Navy alpha 80: hsl(214 60% 2% / 0.8)
- Navy alpha 60: hsl(214 60% 2% / 0.6)

## Typography

### Body Copy

- Font size (inputs): 16px

### Fonts

- Family: [Orbitron](https://fonts.google.com/specimen/Orbitron)
  - Weights: 800
- Family: [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)
  - Weights: 400, 700

### Text presets

Uppercase text in the design is set with CSS (`text-transform: uppercase`), so write it in normal case in your HTML.

- Preset 1: Orbitron 800, 72px / 80px, letter spacing 0.04em, uppercase (tablet: 40px / 48px, mobile: 36px / 40px)
- Preset 2: Orbitron 800, 24px / 32px, letter spacing 0.04em
- Preset 3: Orbitron 800, 16px / 24px, letter spacing 0.16em
- Preset 4: JetBrains Mono 400, 16px / 24px (masked passwords: letter spacing 0.16em)
- Preset 5: JetBrains Mono 400, 14px / 24px
- Preset 5 (bold): JetBrains Mono 700, 14px / 24px, letter spacing 0.16em, uppercase
- Preset 6: JetBrains Mono 400, 12px / 16px, letter spacing 0.16em, uppercase
- Preset 7: JetBrains Mono 400, 12px / 16px

## Spacing and corners

- Spacing follows a 4px scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80
- Border radius: 0 everywhere

## Accessibility notes

- Errors that appear when a field loses focus aren't announced. Connect each message to its field with `aria-describedby`, so screen readers read it with the field.
- On an invalid submit, announce how many fields need attention, for example "3 fields need attention".

> 💎 [Upgrade to Pro](https://www.frontendmentor.io/pro?ref=style-guide) for design file access to see all design details and get hands-on experience using a professional workflow with tools like Figma. The design file for this challenge also includes a design system and tablet layout to help you build a more accurate solution faster.
