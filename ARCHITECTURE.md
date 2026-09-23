# Kannada Flashcards - Architecture & Blueprint

This document outlines how the Kannada Flashcards application is built.

## 1. Overview
The application is a mobile-first React app featuring a Tinder-style swiping interface for studying Kannada vocabulary. It's a static frontend (Vite + React) that reads a pre-built JSON dataset — there's no backend and no live dictionary API.

## 2. The Dataset (`public/dataset.json`)
A flat JSON array of card objects, each shaped like:

```json
{
  "id": "0001",
  "kannada": "ಒಂದು",
  "transliteration": "ondu",
  "englishMeanings": ["one", "1"],
  "partOfSpeech": "noun",
  "tier": 1,
  "tierName": "Level 1 · Foundations",
  "theme": "Numbers",
  "packs": ["top-nouns", "numbers"],
  "audio": { "ttsText": "ಒಂದು", "lang": "kn-IN" },
  "exampleSentence": {
    "kannada": "ನನ್ನ ಬಳಿ ಒಂದು ಪುಸ್ತಕ ಇದೆ.",
    "transliteration": "nanna baLi ondu pustaka ide.",
    "english": "I have one book.",
    "tokens": [
      { "kn": "ನನ್ನ", "translit": "nanna", "pos": "pronoun", "m": ["my"] },
      { "kn": "ಒಂದು", "translit": "ondu", "pos": "noun", "m": ["one"] }
    ]
  }
}
```

Kannada is a single-script language, so there's no kanji/hiragana/katakana split and no stroke-order data — each card just carries the Kannada word, a simple diacritic-free romanized transliteration, and its English meaning(s). `packs.json` (pack name/color/order) and `image-map.json` (word → emoji, for the currently-disabled card illustrations) are separate small registries the frontend also loads.

## 3. The Frontend (`src/App.jsx`, `style.css`, `index.html`)
- Imports Google Fonts (`Plus Jakarta Sans` for UI, `Noto Sans Kannada` for Kannada text).
- Home screen: progress ring, word-of-the-day, a recommended lesson, and themed word packs.
- Flashcard "arena": one card re-used and updated in place as you progress, front face shows the Kannada word + transliteration + audio button, back face shows the English meaning, part of speech, a personal note field, and a tappable example sentence (tap a word for its own gloss).
- Swipe engine: Pointer Events (`pointerdown`/`pointermove`/`pointerup`) drag the card and judge it "known"/"unknown" past a distance/velocity threshold; the same judgement is available via on-screen buttons and arrow keys.
- Progress and per-word notes persist to `localStorage`.
- "All Words" view: searchable/filterable list (by level, pack, learnt status) that opens any word in a modal flashcard.

## 4. Building the dataset
There's no automated pipeline (no equivalent of a free Kannada dictionary/corpus API was used) — `public/dataset.json` was hand-authored to the schema above. `scripts/build-images.js` is the one remaining pipeline script: it downloads the Twemoji SVG for every emoji referenced in `image-map.json` into `public/emoji/` (`npm run build:images`).

## 5. Local development
```bash
npm install
npm run dev     # vite dev server
npm run build   # production build to dist/
```
