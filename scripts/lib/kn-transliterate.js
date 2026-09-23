// Deterministic Kannada -> scientific transliteration (ISO 15919 / IAST-style):
// macrons for long vowels (ā ī ū ē ō), dotted letters for retroflex consonants
// (ṭ ḍ ṇ ḷ ṣ) vs plain dental (t d n), ṅ/ñ for the nasal series, ṃ/ḥ for
// anusvara/visarga. Works by walking the Kannada string codepoint by
// codepoint: a consonant takes its inherent "a" unless followed by a vowel
// sign (matra, which replaces it) or a virama (which suppresses it) — this
// also makes conjuncts (Ca + virama + Ca + vowel) fall out correctly.

const VOWELS = {
  'ಅ': 'a', 'ಆ': 'ā', 'ಇ': 'i', 'ಈ': 'ī',
  'ಉ': 'u', 'ಊ': 'ū', 'ಋ': 'ṛ', 'ಌ': 'ḷ',
  'ಎ': 'e', 'ಏ': 'ē', 'ಐ': 'ai',
  'ಒ': 'o', 'ಓ': 'ō', 'ಔ': 'au'
};

const MATRAS = {
  'ಾ': 'ā', 'ಿ': 'i', 'ೀ': 'ī',
  'ು': 'u', 'ೂ': 'ū', 'ೃ': 'ṛ', 'ೄ': 'ṝ',
  'ೆ': 'e', 'ೇ': 'ē', 'ೈ': 'ai',
  'ೊ': 'o', 'ೋ': 'ō', 'ೌ': 'au'
};

const CONSONANTS = {
  'ಕ': 'k', 'ಖ': 'kh', 'ಗ': 'g', 'ಘ': 'gh', 'ಙ': 'ṅ',
  'ಚ': 'c', 'ಛ': 'ch', 'ಜ': 'j', 'ಝ': 'jh', 'ಞ': 'ñ',
  'ಟ': 'ṭ', 'ಠ': 'ṭh', 'ಡ': 'ḍ', 'ಢ': 'ḍh', 'ಣ': 'ṇ',
  'ತ': 't', 'ಥ': 'th', 'ದ': 'd', 'ಧ': 'dh', 'ನ': 'n',
  'ಪ': 'p', 'ಫ': 'ph', 'ಬ': 'b', 'ಭ': 'bh', 'ಮ': 'm',
  'ಯ': 'y', 'ರ': 'r', 'ಱ': 'ṟ', 'ಲ': 'l', 'ಳ': 'ḷ',
  'ವ': 'v', 'ಶ': 'ś', 'ಷ': 'ṣ', 'ಸ': 's', 'ಹ': 'h',
  'ೞ': 'ḻ' // ೞ (old Kannada 'zha'; U+0CDE lives outside the CB* run)
};

function homorganicNasal(next) {
  if (!next) return 'ṃ';
  const cp = next.codePointAt(0);
  if (cp >= 0x0C95 && cp <= 0x0C99) return 'ṅ'; // velar: ka..ṅa
  if (cp >= 0x0C9A && cp <= 0x0C9E) return 'ñ'; // palatal: ca..ña
  if (cp >= 0x0C9F && cp <= 0x0CA3) return 'ṇ'; // retroflex: ṭa..ṇa
  if (cp >= 0x0CA4 && cp <= 0x0CA8) return 'n'; // dental: ta..na
  if (cp >= 0x0CAA && cp <= 0x0CAE) return 'm'; // labial: pa..ma
  return 'ṃ';
}

const VIRAMA = '್';
const ANUSVARA = 'ಂ';
const VISARGA = 'ಃ';
const NUKTA = '಼';
const DIGITS = { '೦': '0', '೧': '1', '೨': '2', '೩': '3', '೪': '4', '೫': '5', '೬': '6', '೭': '7', '೮': '8', '೯': '9' };

function transliterate(str) {
  if (!str) return '';
  const chars = [...str];
  let out = '';
  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i];
    if (CONSONANTS[ch]) {
      let next = chars[i + 1];
      // A trailing nukta (rare loan-sound marker) doesn't change the
      // romanization scheme used here, just skip over it.
      if (next === NUKTA) { i++; next = chars[i + 1]; }
      if (next === VIRAMA) {
        out += CONSONANTS[ch];
        i++; // consume the virama, no vowel
      } else if (next && MATRAS[next]) {
        out += CONSONANTS[ch] + MATRAS[next];
        i++; // consume the matra
      } else {
        out += CONSONANTS[ch] + 'a'; // inherent vowel
      }
    } else if (VOWELS[ch]) {
      out += VOWELS[ch];
    } else if (ch === ANUSVARA) {
      // Anusvara assimilates to the homorganic nasal of a following stop
      // consonant (standard academic convention, e.g. ಒಂದು -> "ondu" not
      // "oṃdu") and stays generic ṃ before a vowel/semivowel/sibilant/h or
      // at the end of a word.
      out += homorganicNasal(chars[i + 1]);
    } else if (ch === VISARGA) {
      out += 'ḥ';
    } else if (DIGITS[ch]) {
      out += DIGITS[ch];
    } else if (ch === VIRAMA || ch === NUKTA) {
      // stray/unhandled combining mark — drop silently
    } else {
      out += ch; // spaces, ASCII punctuation, etc. pass through
    }
  }
  return out;
}

module.exports = { transliterate };
