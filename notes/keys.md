# Keys — Design Notes

Standalone play-by-ear piano app (`autodax/keys`, target URL `https://autodax.github.io/keys/`).
Companion to Steve's Ear Trainer (`autodax/ear`), but a clean-slate standalone app focused on playing directly on a piano keyboard by ear.

## Files

- `index.html`: standalone landscape iPhone web app (`APP_VERSION` in script).
- `manifest.json`: landscape home-screen web app settings (`scope: /keys/`).
- `keys-sw.js`: offline service worker caching the page, icons, and Salamander piano samples for the four-octave range.
- `icon-180.png`, `icon-512.png`: Option B chosen by Steve Nov 26 2026 — periwinkle piano keys with one burnt orange lit home key and deep indigo sharp keys on a pure black background (`?v=1`). Also set as `MediaMetadata` artwork in `AudioEngine` for the Dynamic Island and lock screen while playing.
- `piano/`: Salamander Grand Piano `.m4a` samples (CC BY 3.0, Alexander Holm, copied from `autodax/ear`).
- `assets/piano-warm-ivory.png`: reference keyboard artwork showing two keys pressed (one white, one black).
- `assets/piano-warm-ivory-template.png`: clean two-octave warm ivory template (15 white keys, 10 black keys, aspect ratio ~3.02:1).

## Decisions (Steve's, Nov 25 2026)

- **Standalone app:** Clean slate, separate from `ear`, focused purely on playing the piano by ear and internalizing the sounds of all the keys to pick out melodies quickly and ultimately chords.
- **Landscape orientation, minimal top strip:** The app operates in landscape orientation on the iPhone with really minimal information in the space above the keyboard.
- **Warm ivory keyboard:** Uses Steve's warm ivory two-octave keyboard look (`assets/piano-warm-ivory*.png`).
- **Full 2-octave keyboard always visible:** Keep the full two-octave keyboard on screen from the start, with the starting key illuminated and active keys gently spotlighted (inactive keys subtly dimmed).
- **Clean illumination (no dot):** Do not put a dot on the illuminated home/starting key unless it serves a real purpose; the soft glow on the key itself is cleaner.
- **Note names only in Free Play:** Keep the keys completely clean (no letters or numbers) during challenges; show note names only in Free Play, with larger but more subtle text.
- **Orientation lock:** Include a lock toggle so playing while lying down does not accidentally flip out of the keyboard into portrait mode.
- **Two-tier 4-octave keyboard:** Available to test live in Portrait → Settings (High on top / Low on top, plus optional Shared Middle C for 15 keys/tier) using all 4 octaves of Salamander piano samples (`C2`–`C6`).
- **No replay on correct answers & calm pause:** When an answer is correct (rhythm echo or melodic phrase), do not repeat the phrase back—leave a calm ~1.85 s pause before the next test starts (with a Pause button in the top strip anytime).
- **Pure-ear hunting:** During hunting, use only the real piano sound and soft key flash—no "Higher / Lower" text in the top strip.
- **Show me rescue button:** Include a subtle "Show me" button in the top strip when stuck to calmly reveal and replay the answer.
- **Play with iPhone on mute:** Must play even when the iPhone ringer/mute switch is on (`navigator.audioSession.type = 'playback'` before `AudioContext`, plus retrying the silent looping `<audio>` element on `touchstart`/`touchend`/`click` whenever `.paused`, since `pointerdown` alone does not always satisfy iOS media activation).
- **Hunting early, one-shot later:** In the early stages, allow hunting by ear (keep tapping keys, hearing each real piano note, until landing on the right key). Later on, transition to one-shot guesses.
- **No discrete levels (long-term goal):** Selectable levels are useful for testing while building, but the long-term goal is a **seamless, level-less adaptive progression** driven by successes and mistakes—gradually introducing one small new challenge at a time without hard level walls or pop-up announcements (a new key simply joins the lit zone and starts appearing).
- **Temporary hunting for new skills:** When something brand new arrives (a new key, longer phrase, or black key), hunting by ear turns back on briefly until it clicks, then tightens smoothly to one-shot guesses.
- **Confidence-building review & warm-up/recap:** Sprinkle easier review prompts (~20–25%) into sessions to build confidence, and run an automatic quick warm-up/recap (3–5 prompts ramping up to the current frontier) after a break, with a toggle in portrait settings to turn it off.
- **Musical prompts:** Use natural, gentle rhythms in phrases (not robotic equal spacing), play a soft warm backing chord under prompts (with a toggle in portrait settings), and sprinkle in short recognizable melody snippets once 3+ notes are active.
- **On-demand Jam groove:** Offer play-along jam grooves via an optional button/toggle when Steve feels like jamming, rather than interrupting automatically.
- **Portrait = guide, progress, settings & docs:** Turning the phone upright shows instructions, a Progress breakdown (per-skill accuracy bars using the Ear Trainer periwinkle/indigo/orange palette, a "Needs work" section, and one-tap Practice buttons to target any skill), settings (including two-step Reset confirmation), and documentation—keeping landscape completely clean and focused on the keyboard.
- **Drag across keys (glissando):** Sliding a finger across the piano plays each key it crosses smoothly.
- **Two-octave key height & width:** Side margin (`max(12px, 36% safe-area)`) confirmed good; 2-octave key height sits at `302px` (a touch taller than 272px, shorter than full stretch).
- **Chords after melodies:** Focus purely on melodies across all white and black keys first, then introduce chords afterward. When chords arrive, start by tapping the chord's keys one at a time (easy on a phone), then support pressing all keys together later (accepting either).
- **Color preferences (carried over from `ear`):** Blue/periwinkle accent palette (`#7eabff`, `#5a86ee`, `#bfe3ff`), muted orange (`#d9895a`) for gentle miss cues, **no green anywhere**.

## Brainstormed progression (ideas, not yet finalized)

How the seamless adaptive engine could expand challenges gradually from zero knowledge to melodies and chords:

1. **One-note groove (pulse & anchor):**
   - Call-and-response rhythm echoes on one illuminated key (e.g. middle C).
   - Play-along groove over a gentle four-chord backing loop on that same key.
2. **Two notes, first key lit (hunting by ear):**
   - Start with 2 contrasting target keys (e.g. a small step and a wide fifth) so early wins feel immediate.
   - Widen to the home triad (C–E–G), then the 5-note pentatonic set (C–D–E–G–A), where everything sounds musical.
   - Gradually open the rest of the white keys, then introduce black keys.
3. **Short call-and-response phrases (3–5 notes with rhythm):**
   - First key still lit as the anchor; transition gradually from hunting to one-shot guesses as accuracy rises.
   - Mix in tiny recognizable melody hooks alongside generated musical phrases.
4. **Moving the starting key (any key on the 2-octave keyboard):**
   - Shift the illuminated starting key to new white and black keys so the ear internalizes relative distances and shapes anywhere on the piano.
5. **Growing into chords:**
   - Hear a chord and find its bottom (root) key.
   - Light the root and find a second note that blends with it (two-note harmonies: thirds, fifths).
   - Build full three-note chords (major, minor, and common progressions) by ear on the keyboard.

## Adaptive engine & session flow (ideas to design next)

- **Continuous skill model:** Track recent hits, misses, and "hunts needed" (how many tries before landing on the right key). When recent accuracy is strong and hunts drop to 1, smoothly unlock the next small increment (one more key, one more note in a phrase, a new starting key, or tighter one-shot feedback). If accuracy dips, quietly ease back without any punishment message.
- **Sprinkled confidence review:** Mix in a small percentage (~20–25%) of comfortable, already-mastered prompts so every session has easy musical wins and momentum.
- **Session warm-up / recap:** At the start of a new session (or after a break), run a quick 3–5 prompt ramp starting well below the current frontier and stepping briskly up to the current challenge level.
- **Testing switcher:** Keep a hidden or subtle dev/testing stage selector while prototyping so Steve can jump straight to any behavior and give feedback.

## Technical notes & reuse from `ear`

- **Piano audio:** Reuse the Salamander Grand Piano `.m4a` samples (CC BY 3.0, Alexander Holm) and the offline service worker pattern from `autodax/ear` so it sounds like a real grand piano and works offline on iPhone.
- **iPhone PWA lessons:** Reuse the audio session unlocking (`navigator.audioSession` + silent element for the mute switch), safe-area handling, no-zoom (`maximum-scale=1`), and clean audio release from `autodax/ear/notes/ear.md`. On the keyboard, attach a non-passive `touchstart` listener with `e.preventDefault()` to suppress iOS Safari's long-press magnifying glass (CSS `user-select: none` and `pointerdown` alone are not enough).
- **Orientation lock on iPhone:** iOS Safari does not support `screen.orientation.lock('landscape')`, so when Orientation Lock is enabled and the phone tilts to portrait, `.app` rotates 90° via CSS to stay full-size landscape (matching holding the phone with the Dynamic Island on the left).
- **Auto-updates:** Checks GitHub's `APP_VERSION` on open and when returning to the foreground (`checkForUpdate()`), reloading via `?v=<version>` when idle (guarded by `sessionStorage` `keys.updateTried` so it never loops on iOS). Always bump `APP_VERSION` on every push.
- **Landscape viewport:** Design specifically for landscape iPhone (e.g. `874 × 402` / standalone safe areas on left & right for Dynamic Island and home indicator).

## Open questions to brainstorm next

- Should progress sync across devices (like `ear`'s private GitHub gist) or stay simple local storage at first?
