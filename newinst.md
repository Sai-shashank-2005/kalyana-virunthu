Implement a premium, mobile-first South Indian wedding invitation website using the existing project and the design specification in instructions.md.

The mobile experience is the highest priority. Preserve the existing parallax hero and build the remaining sections around it using the ivory, antique-gold, temple-maroon, and olive palette.

Add minimal continuous animations that complement the existing artwork:
- Slowly sway selected existing floral assets by 2–3 degrees.
- Add a gentle opacity pulse to selected gold ornaments.
- Give existing brass lamp artwork a subtle warm glow.
- Use smooth, one-time fade-and-rise reveals for headings, dates, venue details, and section dividers.
- Animate existing SVG kolam or lotus line art gently when its section enters the viewport, where appropriate.

Keep continuous animations slow, low-intensity, and limited to a few decorative elements at a time. Use CSS animations where possible and reuse existing dependencies. Do not add cartoon characters, excessive falling petals, glitter effects, autoplay audio, or distracting animations.

MOBILE REQUIREMENTS:
1. Design and test at 320px, 360px, 390px, and 430px widths.
2. Preserve readable typography, balanced spacing, and the full visibility of names and event details.
3. Keep the page smooth during scrolling and avoid horizontal overflow.
4. Reduce or simplify parallax and decorative motion on low-powered devices.
5. Use lightweight image assets, appropriate responsive image sizing, and lazy-load below-the-fold images.
6. Ensure all links and buttons remain accessible and easy to tap.
7. Respect prefers-reduced-motion by disabling nonessential animations.
8. Avoid fixed decorative overlays that obstruct the content.

Inspect the repository before changing files. Preserve existing hero code and assets, reuse installed dependencies, and avoid unrelated rewrites. Run the available build and type checks, fix any errors introduced, and report what changed.

Design principle: the animations should make the invitation feel gently alive, while the couple, wedding date, and ceremony information remain the visual priority.