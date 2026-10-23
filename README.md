# Samara

She will haunt you in various ways.

## Origin
First appeared as a motion-triggered clip on a Samsung Family Hub fridge.
Then she moved.

## Desktop
Without warning, she crawls out of a well somewhere on your screen and begins walking toward you.
Click her, and she vanishes in a puff of logic.

```bash
cd desktop
npm install
npm start
```

If macOS blocks Electron:
```bash
xattr -cr node_modules/electron/dist/Electron.app
```

### Controls
- **Click / push her** — RGB glitch + smoke, she disappears
- **Ctrl+Shift+S** (Cmd+Shift+S) — summon now (for testing)
- **Ctrl+Shift+R** — dismiss

### Behavior
- Starts on the empty well, then she climbs out and walks
- Appears at a random position
- Comes slightly closer during the walk
- Default interval: every 3 hours (change `INTERVAL_MS` in `desktop/main.js`)
- First appearance ~2 seconds after launch so you can test

## Phone
Subscribe once. Messages arrive through the day via ntfy.

Open `ntfy/index.html` (or the hosted page).
Queue the day's messages with:
```bash
cd ntfy
python publish.py
```
