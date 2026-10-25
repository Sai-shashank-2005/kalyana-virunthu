# Wedding Invitation Website — AGY Development Instructions

## 1. Project Goal

Build a premium, minimal, mobile-first South Indian wedding invitation website for **Santhosh Ananth and Shunmugapriya**.

The existing scroll-parallax hero section is already implemented. **Preserve it** and build the remaining sections around it so the entire website feels like one cohesive invitation. Use the supplied design reference image as the visual direction.

The result should feel like elegant wedding stationery brought to life on the web: warm ivory paper, temple-maroon typography, antique-gold details, restrained traditional illustrations, generous whitespace, and smooth but subtle motion.

## 2. Wedding Information — Use These Details

### Couple and family
- Groom: **Santhosh Ananth**
- Groom's parents: **Muthuram and Santhanammal**
- Bride: **Shunmugapriya**
- Bride's parents: **Shunmugavel and Geetha**

### Wedding ceremony
- Date: **Wednesday, 11 November 2026**
- Venue: **Palani Andavar Mahal**
- Address: **Sembatti Road, Nilakottai, Dindigul District – 624707**
- Time: **6:30 AM to 7:30 AM**

### Reception
- Date: **Monday, 16 November 2026**
- Venue: **Thangam Residency**
- Address: **New Bus Stand, Nanguneri Road, Tirunelveli – 627005**
- Time: **4:00 PM to 8:00 PM**

### Invitation message
Use polished, natural English based on this sentiment:

“Together with our families, and with the divine blessings of God and our ancestors, we joyfully invite you to witness and celebrate the union of our hearts and souls.”

Closing sentiment:
“Please grace the occasion and bless the newlyweds. We look forward to your esteemed presence.”

Do not invent additional family members, dates, times, venues, or religious details.

## 3. Visual Identity

### Color palette
Use these CSS custom properties consistently:

```css
:root {
  --color-ivory: #F8F5EE;
  --color-antique-gold: #B08D57;
  --color-temple-maroon: #6A252B;
  --color-deep-olive: #34372D;
  --color-warm-sand: #E8DCC7;
  --color-paper: #FFFCF5;
  --color-muted-text: #756B60;
  --color-border: rgba(176, 141, 87, 0.38);
}
```

### Color usage
- Ivory and paper tones are the primary background.
- Antique gold is for fine rules, separators, small icons, and subtle emphasis.
- Temple maroon is for names, section headings, and important dates.
- Deep olive is for restrained botanical accents and secondary text.
- Warm sand is for alternating section backgrounds and quiet cards.
- Maintain readable contrast. Never use pale gold for long body text.
- Avoid bright red, neon colors, glossy gradients, heavy shadows, and excessive glass effects.

### Typography
- Headings: an elegant editorial serif such as **Cormorant Garamond** or **Playfair Display**.
- Body: a readable serif or restrained sans-serif such as **Lora** or **Inter**.
- Script font: use sparingly for event labels such as “Wedding” and “Reception,” if a suitable font is already available or can be loaded reliably.
- Use no more than three font families.
- Keep body text readable on small mobile screens. Avoid excessive letter spacing in paragraphs.

### Traditional design details
Use a restrained selection of:
- Fine kolam-inspired line motifs.
- Small lotus or floral line art.
- Brass kuthu vilakku (traditional lamp) illustrations.
- Banana leaves or subtle botanical details.
- Temple gopuram line art.
- Small auspicious symbol only if appropriate to the family's tradition.

These should be used as occasional accents, not repeated in every corner of every section. Prefer existing assets or lightweight SVG/CSS illustrations over large, unrelated stock images. Do not use culturally mismatched imagery.

## 4. Page Structure

Build one vertically scrolling invitation page with the following sections. Keep the existing hero as section 01.

### Section 01 — Existing Parallax Hero
- Preserve the current hero component, animation, asset paths, and working scroll behaviour.
- Do not rebuild or replace the hero just to match the mockup.
- Keep the couple's names and the current hero artwork intact unless a specific bug must be fixed.
- Ensure the hero transitions naturally into the next section.
- Do not add a second competing full-screen hero.

### Section 02 — Auspicious Opening
- Use a calm ivory background.
- Center a small traditional illustration or line-art motif.
- Add a short blessing/invitation paragraph.
- Use thin antique-gold divider lines and a small ornament.
- Keep this section short and spacious, with no oversized card.

Suggested copy:
“Together with our families, and with the divine blessings of God and our ancestors, we joyfully invite you to witness and celebrate the union of our hearts and souls.”

### Section 03 — The Couple
- Introduce **Santhosh Ananth** and **Shunmugapriya**.
- Use a balanced two-column layout on wider screens and a comfortable stacked layout on mobile.
- If real couple photographs are not available, do not fabricate realistic portraits or insert unrelated stock wedding photos. Use elegant typography and ornamental frames instead.
- Include parent names beneath each person:
  - “Son of Muthuram and Santhanammal”
  - “Daughter of Shunmugavel and Geetha”
- Add a small gold divider and optional short line: “Two souls, one journey, blessed by tradition, bound by love.”
- Avoid excessive animations or large photo cards.

### Section 04 — Family Invitation
- Present the family invitation wording in a refined editorial layout.
- Show both family names in a balanced arrangement.
- Groom's family: Muthuram and Santhanammal.
- Bride's family: Shunmugavel and Geetha.
- Keep typography clear, dignified, and centered.
- Avoid duplicating the entire invitation paragraph if it makes the page repetitive. This section can focus on the family names and a brief invitation line.

### Section 05 — Wedding Ceremony
Clearly display:
- Wednesday, 11 November 2026
- Wedding ceremony
- 6:30 AM – 7:30 AM
- Palani Andavar Mahal
- Sembatti Road, Nilakottai, Dindigul District – 624707

Design direction:
- Strong date hierarchy.
- Use a compact date block or thin vertical separator.
- Add a subtle traditional lamp or floral line illustration near the bottom.
- Keep the venue and time legible without requiring zooming.
- Do not use the inaccurate venue shown in the existing hero reference if the hero currently contains placeholder data; retain the hero's current visual design but align event information elsewhere with the details in this document.

### Section 06 — Reception
Clearly display:
- Monday, 16 November 2026
- Reception
- 4:00 PM – 8:00 PM
- Thangam Residency
- New Bus Stand, Nanguneri Road, Tirunelveli – 627005

Design direction:
- Visually pair this with the wedding ceremony section.
- Use the same date, typography, spacing, and border system.
- Use a distinct but subtle ornament if desired.
- Do not merge the reception and wedding into one confusing date/time block.

### Section 07 — Venue and Directions
Create two clearly separated venue entries:
1. Wedding — Palani Andavar Mahal, Sembatti Road, Nilakottai, Dindigul District – 624707.
2. Reception — Thangam Residency, New Bus Stand, Nanguneri Road, Tirunelveli – 627005.

For each entry:
- Display venue name and full address.
- Include a “Get Directions” link/button that opens a map search for that exact venue/address.
- Do not invent coordinates or claim that an unverified map pin is exact.
- If a map embed is not available, a Google Maps search URL is acceptable.
- Use an accessible external link and make its purpose clear.

### Section 08 — Traditions / Gallery (Optional)
- Include this section only if suitable real images or appropriate existing assets are available.
- A small, editorial gallery is preferred over a large grid.
- Use consistent image ratios, subtle rounded corners (or square corners if that better matches the design), and generous spacing.
- If no real photos are available, use a restrained illustration panel or omit the gallery. Never show fake couple photos or unrelated wedding photography as if it depicts this couple.
- Do not add unnecessary gallery tabs or complex filtering unless actual content justifies it.

### Section 09 — Closing Blessing
- Return to a calm ivory background.
- Use a small lotus, kolam, or traditional line illustration.
- Add the closing message:
  “Please grace the occasion and bless the newlyweds. We look forward to your esteemed presence.”
- Finish with the couple's names in refined typography.
- Keep the final section peaceful and not overly tall.

### Footer
- Minimal footer with “Santhosh Ananth & Shunmugapriya”.
- Optionally include a small gold ornament.
- Avoid unrelated branding, large navigation menus, or unnecessary social links.

## 5. Motion and Interaction

- The hero is the primary animated experience. Everything below it should feel calmer.
- Use subtle fade/translate reveals on section entry only if the project already supports a suitable animation library.
- Respect `prefers-reduced-motion`.
- Do not animate every text line or ornament independently.
- No autoplay music or audio.
- No intrusive popups, loading gates, or forced countdown screens.
- A countdown is optional and must calculate from the real wedding date. Do not hardcode a changing countdown value.
- Any buttons or links must work; do not add decorative controls that appear interactive.

## 6. Mobile-First and Accessibility Requirements

- Design for narrow mobile widths first, then tablet and desktop.
- Prevent horizontal overflow at 320px, 360px, 390px, and 430px widths.
- Use responsive typography with `clamp()` where helpful.
- Ensure body text is comfortably readable and line lengths are controlled.
- Keep touch targets around 44px or larger.
- Use semantic HTML (`main`, `section`, headings, paragraphs, `address`, and links).
- Give meaningful images appropriate alt text; mark purely decorative artwork as decorative.
- Ensure focus indicators and keyboard navigation work.
- Maintain sufficient text/background contrast.
- Respect reduced-motion preferences.
- Optimize images and avoid layout shifts.

## 7. Implementation Rules

1. First inspect the existing repository, package scripts, component tree, styles, installed dependencies, and hero implementation.
2. Identify the framework and follow its existing conventions. Do not assume a framework different from the current project.
3. Preserve the current hero and its asset paths. Do not overwrite working parallax code.
4. Reuse existing dependencies. Do not install new packages unless genuinely needed.
5. Build reusable components for repeated elements, such as event details, divider ornaments, and venue cards, where it makes the code clearer.
6. Keep wedding details in one clearly named data/config object if the current architecture supports it, so the content can be updated easily.
7. Use the exact wedding and reception details in this document. Avoid inconsistent placeholder content.
8. Do not use remote images that are unreliable, hotlinked without permission, or likely to disappear. Prefer project assets or reliable, appropriately licensed resources.
9. Do not generate fake real-person photos.
10. Do not introduce a backend, database, authentication, or CMS; this is a static invitation website unless the repository already requires otherwise.
11. Keep the code maintainable and avoid unnecessary abstractions.
12. Do not rewrite unrelated files or reformat the whole project.

## 8. Suggested Component Breakdown

Adapt names to the existing project structure rather than forcing this exact structure:

```text
src/
  components/
    WeddingHero.tsx            # Existing — preserve
    AuspiciousOpening.tsx
    CoupleSection.tsx
    FamilyInvitation.tsx
    WeddingEventSection.tsx
    ReceptionSection.tsx
    VenueDirections.tsx
    TraditionsGallery.tsx       # Optional
    ClosingBlessing.tsx
    WeddingFooter.tsx
  styles/
    wedding-theme.css           # Or integrate with existing styles
```

If the project uses Astro, keep its Astro component/page conventions. If it uses React/Vite, follow its current React/Vite structure. Do not create a duplicate application or duplicate hero.

## 9. Quality Checks Before Finishing

- Run the existing lint, type-check, build, and test commands that are available.
- Fix errors introduced by the implementation.
- Check the browser console for errors.
- Test the page at mobile and desktop sizes.
- Verify both map links open the correct address search.
- Verify the displayed dates and times match the source details.
- Confirm the hero still animates and scrolls as before.
- Confirm there is no horizontal overflow.
- Confirm reduced-motion settings are respected.
- Report the files changed, checks run, any remaining issues, and any assumptions.
- Do not claim tests passed unless they were actually run.

## 10. Final Design Standard

The finished website should feel:
- Minimal, not empty.
- Traditional, not ornate everywhere.
- Premium, not glossy.
- Romantic, not cluttered.
- Mobile-first, not a desktop page squeezed onto a phone.

**Priority order:** preserve the hero → accurate event details → beautiful typography and spacing → mobile usability → subtle traditional accents → optional extras.
