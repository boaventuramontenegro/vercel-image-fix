<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# AGENTS.md

- Keep all editable brand copy, contact details, image paths, section labels, gallery records and optional fields in `src/content.ts` so owners never need to edit UI components.
- Keep the institutional experience on the index route with section anchors because this project explicitly requires a single scrolling page.
- Isolate the logo, gallery, comparison control and testimonials into focused components; use Radix Dialog for keyboard focus and modal dismissal.
- Use global semantic CSS tokens and named design-system classes for the glass identity; keep image-less project slots visibly abstract rather than suggesting real completed work.
- Render the logo from the single `logo-branca.png` asset only, with the `Logo` component's `variant` choosing `brightness(0)` on the light top bar and the original white on the dark footer; never duplicate the logo file.
- Keep a single `whatsappUrl(message)` helper in `src/content.ts` so every WhatsApp link (floating button, service cards, contact form) shares the same encoding and the official WhatsApp glyph.
- All sections use the global page-background token separated by 1px lines; preserve the distinct footer surface for contact, optional Google Maps embed and the back-to-top control.
- Use a shared react-icons brand wrapper for WhatsApp and IntersectionObserver in FloatingWhatsApp to hide it whenever the hero or footer intersects the viewport; this keeps brand glyphs consistent and avoids duplicate calls to action.
- Keep ServiceSelector as an in-flow group of native checkboxes driven by the content service list, preserving selection order; this keeps multi-service quotes keyboard accessible without a popup.
- Register document capture-phase pointer dismissal and Escape handling only while ServiceSelector is open; capture ensures outside controls cannot prevent dismissal, and scroll must not dismiss or lock the page.
- Keep carousel scroll updates in requestAnimationFrame with direct attribute/style writes, not React state; this avoids scroll-driven renders while keeping centered-card selection and progress synchronized.
- Keep testimonials index-based with a single visible figure, hidden same-grid measurements and counter/navigation below; sanitize contacts out of names without abbreviating them to preserve privacy and stable height.
- Render the two supplied service PNGs through a shared currentColor CSS mask; preserve the other SVGs and the existing icon layout.
- Load the owner-approved collection from content through the existing public query loader, taking precedence over imported database rows; this prevents stale or unapproved photographs after a remix.
- Keep FAQ content in the shared content object and render it through the existing Radix accordion in a focused component; this keeps answers editable and keyboard accessible.
- Render every successfully displayed gallery row in the existing carousel without a category selector; categories remain photograph metadata, not navigation.
- Use approved CDN asset previews from `src/gallery-previews.ts` for gallery cards, keyed to original CDN URLs, and unchanged uploaded originals for enlargement; this reduces transfers without sacrificing quality.
- Preload and eagerly render only the above-fold hero; lazy-load About and gallery previews so below-fold media never competes with the first screen.
- Use AccentText to emphasize phrases configured in content without rewriting visible titles; this preserves owner-approved copy across editorial compositions.
- Keep quote message templates and formatters in `src/content.ts`, sharing `whatsappUrl` across all calls to action; this ensures service names, optional fields and line breaks stay consistent and testable.
- Keep gallery enlargement in GalleryLightbox using Radix Dialog for scroll locking/focus and react-zoom-pan-pinch for bounded gestures; arrow keys mount a fresh zoom instance, and explicit double-tap/double-click handling avoids touch-end animation cancellation while photo gestures never dismiss the background.
- Bound enlarged images to the measured picture area and keep its backdrop opaque; this preserves complete photos and prevents underlying page content showing through.
- Scope hero typography overrides to `.hero-copy` and `.hero-brand`; shared editorial emphasis must not change other section titles.
- Center carousel navigation using track-relative geometry and recenter the active desktop card on resize; mobile gestures retain their existing position.
- Apply ScrollReveal through a shared observer scoped to the single-page content, using independent translate/scale properties and excluding carousel cards; this preserves native transforms and keeps SSR content visible before initialization.
