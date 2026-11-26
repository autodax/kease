# Keys — Design Notes

Standalone play-by-ear piano app (`autodax/keys`, target URL `https://autodax.github.io/keys/`).
Companion to Steve's Ear Trainer (`autodax/ear`), but a clean-slate standalone app focused on playing directly on a piano keyboard by ear.

## Files

- `index.html`: standalone landscape iPhone web app (`APP_VERSION` in script).
- `manifest.json`: landscape home-screen web app settings (`scope: /keys/`).
- `keys-sw.js`: offline service worker caching the page and the Salamander piano samples for the two-octave range.
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
- **Two-tier 4-octave keyboard (for later):** Steve liked the two-tier 4-octave layout (with options for High-on-Top vs. Low-on-Top and 14 vs. 15 keys per tier, and possibly wider on the phone) as a future expansion once wider range / chords + melodies come in.
- **Stage 1 (one note repeated rhythmically):** Include both call-and-response (app plays a short rhythm on the lit key, user taps it back) and playing along with a gentle backing chord/groove. Do not replay the rhythm after echoing it—move straight to the next one.
- **Keyboard sizing & Dynamic Island (from iPhone test):** Keep the keyboard slightly narrower than full edge-to-edge so the Dynamic Island may sit over the leftmost white key but never intrudes on the first black key. Keys do not need to be stretched full height—keeping them closer to natural piano proportion saves room at the top for a few TBD controls.
- **Pause before next prompt:** Leave a calm, unhurried pause before the next test starts so it never feels rushed.
- **Play with iPhone on mute:** Must play even when the iPhone ringer/mute switch is on (`navigator.audioSession.type = 'playback'` before `AudioContext`, plus retrying the silent looping `<audio>` element on `touchstart`/`touchend`/`click` whenever `.paused`, since `pointerdown` alone does not always satisfy iOS media activation).
- **Hunting early, one-shot later:** In the early stages, allow hunting by ear (keep tapping keys, hearing each real piano note, until landing on the right key). Later on, transition to one-shot guesses.
- **No discrete levels (long-term goal):** Selectable levels are useful for testing while building, but the long-term goal is a **seamless, level-less adaptive progression** driven by successes and mistakes—gradually introducing new challenges without hard level walls.
- **Confidence-building review & warm-up/recap:** Sprinkle easier review prompts into sessions to build confidence, and consider a quick warm-up/recap at the start of a session that ramps rapidly up to the current difficulty.
- **Portrait = guide, settings & docs:** Turning the phone upright shows instructions, settings, and documentation—keeping landscape completely clean and focused on the keyboard.
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
- **iPhone PWA lessons:** Reuse the audio session unlocking (`navigator.audioSession` + silent element for the mute switch), safe-area handling, no-zoom (`maximum-scale=1`), and clean audio release from `autodax/ear/notes/ear.md`.
- **Landscape viewport:** Design specifically for landscape iPhone (e.g. `874 × 402` / standalone safe areas on left & right for Dynamic Island and home indicator).

## Open questions to brainstorm next

- In the hunting stage, should "higher / lower" text appear, or should the ear alone (plus the soft key flash) be the only feedback so the top strip stays ultra-minimal?
- When moving into chords, should multi-touch (pressing 2–3 keys at once) be supported from the start, or arpeggiated (one key at a time) first and simultaneous later?
- Should progress sync across devices (like `ear`'s private GitHub gist) or stay simple local storage at first?
