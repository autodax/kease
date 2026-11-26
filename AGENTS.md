# keys: rules for AI agents (AGENTS.md)

This repo is **Keys**, Steve's standalone play-by-ear piano keyboard web app for GitHub Pages (`https://autodax.github.io/keys/`).

**This repo is public.** Anything written here, including these notes, can be read by anyone.
Never put personal details in the repo: no addresses, account numbers, balances, salary, or tokens.

## Working with Steve

- Steve doesn't read code. Describe changes in plain language: what he'll see and do, not how it's built. Don't paste code into replies.
- For simple choice questions, use clickable choice buttons rather than plain-text questions.
- He uses an iPhone (Safari, and saved to the home screen as a web app), in **landscape orientation** for this app. Mobile-first.
- When a choice is visual (icons, layouts, sounds), show a few options side by side before committing to one.
- Once the app is live: do the work, test it, and push it; then say briefly what changed and anything he must do (for example, swipe the app away and reopen it). Always put the version number (`APP_VERSION`) **at the very end** of that message so he can spot it easily, every time something is pushed.

## Start here

Read `README.md` for the overview and `notes/keys.md` for every decision, brainstormed idea, and open question before changing anything.

## Every change

1. `git fetch` and rebase onto `origin/main` before pushing.
2. Test before pushing (once the app exists), using a landscape iPhone-sized viewport (e.g. `874 × 402` or home-screen landscape dimensions).
3. Commit messages in plain language, describing what changed for the user.
4. Keep `notes/keys.md` current in the same commit whenever a decision is made, a preference is learned, or an idea evolves. Only record Steve's stated decisions under **Decisions**; keep proposals and guesses separate.
