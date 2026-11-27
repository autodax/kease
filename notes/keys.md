# Kease — Design Notes

Standalone play-by-ear piano app (`autodax/keys`, live URL `https://autodax.github.io/keys/`).
Companion to Steve's Ear Trainer (`autodax/ear`), but a clean-slate standalone app focused on playing directly on a piano keyboard by ear.

## Files

- `index.html`: standalone landscape iPhone web app (`APP_VERSION` in script).
- `manifest.json`: landscape home-screen web app settings (`name: Kease`, `scope: /keys/`).
- `keys-sw.js`: offline service worker caching the page, icons, and Salamander piano samples for the full 88-key range.
- `icon-180.png`, `icon-512.png`: Option B chosen by Steve Nov 26 2026 — periwinkle piano keys with one burnt orange lit home key and deep indigo sharp keys on a pure black background (`?v=1`). Also set as `MediaMetadata` artwork in `AudioEngine` for the Dynamic Island and lock screen while playing.
- `piano/`: Salamander Grand Piano `.m4a` samples (CC BY 3.0, Alexander Holm, copied from `autodax/ear`).
- `assets/piano-warm-ivory.png`: reference keyboard artwork showing two keys pressed (one white, one black).
- `assets/piano-warm-ivory-template.png`: clean two-octave warm ivory template (15 white keys, 10 black keys, aspect ratio ~3.02:1).

## Decisions (Steve's, Nov 25–26 2026)

- **Name & opening screen:** Named **Kease** with catchphrase *"Learn Keyboard with Ease"* (Nov 26 2026). Portrait opening screen leads with the centered app icon, large **Kease** title, and catchphrase directly above **How it works** (with the landscape/lying-down guidance combined as the first bullet with an inline landscape phone icon) and larger section headings.
- **Standalone app:** Clean slate, separate from `ear`, focused purely on playing the piano by ear and internalizing the sounds of all the keys to pick out melodies quickly and ultimately chords.
- **Landscape orientation, minimal top strip:** The app operates in landscape orientation on the iPhone with really minimal information in the space above the keyboard.
- **GarageBand-style 3D keys:** Clean ivory-white keys with a subtle top cast shadow and recessed grey pressed state, paired with sculpted 3D black keys (raised satin top face, angled glossy bottom bevel, darker flattened pressed state) modeled after Steve's GarageBand reference screenshot.
- **Full 2-octave keyboard always visible (no dimming):** Keep all keys bright and luminous; mark active keys with a crisp periwinkle bottom lip (Option B), with a **Highlight active keys** toggle in Portrait → Settings to turn it off completely.
- **Clean illumination (no dot):** Do not put a dot on the illuminated home/starting key unless it serves a real purpose; the soft glow on the key itself is cleaner.
- **C-only GarageBand labels:** Label only the C keys (`C2`, `C3`, `C4`, `C5`, `C6`) in larger, subtle type (default On, toggleable via **C key labels** in Portrait → Settings). Tapped note names in Free Play pop up in larger crisp text above the keyboard.
- **Playing lying down (no orientation lock button):** Removed the CSS orientation lock button (Nov 26 2026) — holding the iPhone upside down (cameras at the bottom) naturally keeps iOS in whichever full-size landscape orientation is active on either side, with no portrait blur zone or shrunk viewport. Explained in the portrait instructions.
- **Two-tier 4-octave keyboard:** Available to test live in Portrait → Settings (High on top / Low on top, plus optional Shared Middle C for 15 keys/tier) using all 4 octaves of Salamander piano samples (`C2`–`C6`).
- **No replay on correct answers & calm pause:** When an answer is correct (rhythm echo or melodic phrase), do not repeat the phrase back—leave a calm ~1.85 s pause before the next test starts (with a Pause button in the top strip anytime).
- **Polite wait & prompt restart on key taps:** Tapping keys while the app is pausing between tests delays the next test until ~1.4 s after the last key press; tapping keys while a prompt is playing cancels and cleanly replays that same prompt after ~1.1 s of quiet so you never miss a test.
- **Earned octave shifts with I–IV–V–I cadence & hunt retry:** Only shift to a new octave once the user is comfortable in the current octave (6+ clean answers and 2 clean in a row)—never while struggling—and play a smooth I–IV–V–I cadence in the new octave before testing. When a hunt-mode prompt takes extra tries, say *"Got it — once more"* and replay that same phrase once cleanly before moving on.
- **Two-day 90% mastery calibration (Nov 26 2026):** Each skill requires **≥90% clean accuracy** across a rolling window (**40 recent prompts** for 1–2 note skills, **30** for 3–5 note melodies and chords) to reach **Day 1 Ready** (85% bar), then holding **≥90%** on a **second separate calendar day** (at least a third of the window answered that day) to stamp **Mastered** (100% bar). Auto · Adaptive stays on the current unready skill (with ~20% interleaved review of mastered/ready skills and priority Day-2 confirmation), and overall mastery reflects the average across all skills.
- **Merged Ear Trainer curriculum — no rhythm (Nov 27 2026):** Adopted Ear Trainer's exact 36-step non-rhythm sequence (`e01`–`e36`, grouped into 5 chapters in Progress: Home & Triad 1-3-5 + stepping stones, Full Scale & Keys, Melodies & Phrases, Chromatic Notes, Chords & Harmony + Chord Changes). Removed all rhythm drills. Added Ear Trainer's **Cadence style**, **Cadence frequency**, and **Resolution style** in Portrait → Settings; single-note lessons play and light up the stepwise resolution back to the nearest home key. Every step seamlessly opens in **Hunt** and automatically tightens to **Clean** (one-shot) once it clicks (`>=8` tries at `>=75%`).
- **Pure-ear hunting:** During hunting, use only the real piano sound and soft key flash—no "Higher / Lower" text in the top strip.
- **Show me rescue button:** Include a subtle "Show me" button in the top strip when stuck to calmly reveal and replay the answer.
- **Play with iPhone on mute:** Must play even when the iPhone ringer/mute switch is on (`navigator.audioSession.type = 'playback'` before `AudioContext`, plus retrying the silent looping `<audio>` element on `touchstart`/`touchend`/`click` whenever `.paused`, since `pointerdown` alone does not always satisfy iOS media activation).
- **Hunting early, one-shot later:** In the early stages, allow hunting by ear (keep tapping keys, hearing each real piano note, until landing on the right key). Later on, transition to one-shot guesses.
- **No discrete levels (long-term goal):** Selectable levels are useful for testing while building, but the long-term goal is a **seamless, level-less adaptive progression** driven by successes and mistakes—gradually introducing one small new challenge at a time without hard level walls or pop-up announcements (a new key simply joins the lit zone and starts appearing).
- **Temporary hunting for new skills:** When something brand new arrives (a new key, longer phrase, or black key), hunting by ear turns back on briefly until it clicks, then tightens smoothly to one-shot guesses.
- **Confidence-building review & warm-up/recap:** Sprinkle easier review prompts (~20–25%) into sessions to build confidence, and run an automatic quick warm-up/recap (3–5 prompts ramping up to the current frontier) after a break, with a toggle in portrait settings to turn it off.
- **Full 88-key track, C2–C7 lessons, fractional-octave centering:** The continuous sliding keyboard holds all 88 piano keys (`A0`–`C8`, all 30 Salamander samples cached offline), while lessons stay strictly within `C2`–`C7` (octaves 2–6). On every stage and octave shift, the keyboard slides smoothly by exact fractional octaves so the current spread of active keys sits centered right in the middle of the screen (with a 1.5 s glide, gentle 4-note piano sweep, C-label pulse, and 2-prompt ear warm-up on octave changes). Toggleable in Portrait → Settings (**Vary octaves**).
- **Deep, non-repetitive exercise supply:** Smart shuffle memory (no back-to-back repeats, 14-prompt history, gentle return of missed phrases), 24 one-note rhythm grooves + 32 melodic phrase timings with subtle tempo variation, starting on any active key (enabling upward and downward phrases), 48 recognizable short melody hooks + musical contour generator (arches, valleys, leap-then-step), and varied warm backing harmony (triads, open fifths, rolled arpeggios) toggleable in portrait settings.
- **On-demand Jam groove:** Offer play-along jam grooves via an optional button/toggle when Steve feels like jamming, rather than interrupting automatically.
- **Portrait = guide, progress, settings & docs:** Turning the phone upright shows instructions, a Progress breakdown (per-skill accuracy bars using the Ear Trainer periwinkle/indigo/orange palette, a "Needs work" section, and one-tap Practice buttons to target any skill), settings (including two-step Reset confirmation), and documentation—keeping landscape completely clean and focused on the keyboard.
- **Drag across keys & hold-to-sustain:** Sliding a finger across the piano plays each key it crosses smoothly; holding a key sustains the full natural ring of the piano note until released, with a gentle damper fade-out on lift.
- **Two-octave key height & width:** Side margin (`max(12px, 36% safe-area)`) confirmed good; 2-octave key height sits at `302px` (a touch taller than 272px, shorter than full stretch).
- **Chords after melodies (built in `v2026-11-26.14`):** Seamless progression runs through 5-note melodies (`s12`–`s13`) and pure-ear melodies with no lit starting key (`s14`), then enters chords: Chord Roots (`s15`–`s16`), Two-Note Blend (`s17`), Build the 3-Note Chord (`s18`–`s19`, accepting keys in any order, one at a time or pressed together simultaneously), and Chord Changes (`s20`).
- **Progress backup:** Portrait → Settings includes **Export** and **Import** JSON backup buttons so progress is safe before removing/re-adding the home-screen icon.
- **Keep mode picker in Landscape:** Steve chose to keep the mode dropdown accessible in the landscape top bar for now.
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
- **Landscape while lying down on iPhone:** iOS Safari does not support `screen.orientation.lock('landscape')` or manifest `orientation: "landscape"`. Holding the iPhone upside down (cameras at the bottom) keeps iOS locked in whichever full-size landscape direction is active without rotating to portrait.
- **Auto-updates:** Checks GitHub's `APP_VERSION` on open and when returning to the foreground (`checkForUpdate()`), reloading via `?v=<version>` when idle (guarded by `sessionStorage` `keys.updateTried` so it never loops on iOS). Always bump `APP_VERSION` on every push.
- **Landscape viewport:** Design specifically for landscape iPhone (e.g. `874 × 402` / standalone safe areas on left & right for Dynamic Island and home indicator).

## Open questions to brainstorm next

- Should progress sync across devices (like `ear`'s private GitHub gist) or stay simple local storage at first?
