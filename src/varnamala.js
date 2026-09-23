// The Kannada alphabet (ವರ್ಣಮಾಲೆ), grouped the way it's traditionally taught:
// vowels first, then consonants by place of articulation, then the two
// standard compound letters. Transliteration matches scripts/lib/kn-transliterate.js.
const VARNAMALA = [
  {
    label: 'ಸ್ವರಗಳು · Vowels',
    letters: [
      { kn: 'ಅ', translit: 'a' }, { kn: 'ಆ', translit: 'ā' },
      { kn: 'ಇ', translit: 'i' }, { kn: 'ಈ', translit: 'ī' },
      { kn: 'ಉ', translit: 'u' }, { kn: 'ಊ', translit: 'ū' },
      { kn: 'ಋ', translit: 'ṛ' },
      { kn: 'ಎ', translit: 'e' }, { kn: 'ಏ', translit: 'ē' }, { kn: 'ಐ', translit: 'ai' },
      { kn: 'ಒ', translit: 'o' }, { kn: 'ಓ', translit: 'ō' }, { kn: 'ಔ', translit: 'au' },
      { kn: 'ಅಂ', translit: 'aṃ' }, { kn: 'ಅಃ', translit: 'aḥ' }
    ]
  },
  {
    label: 'ಕ-ವರ್ಗ · Velar',
    letters: [
      { kn: 'ಕ', translit: 'ka' }, { kn: 'ಖ', translit: 'kha' },
      { kn: 'ಗ', translit: 'ga' }, { kn: 'ಘ', translit: 'gha' }, { kn: 'ಙ', translit: 'ṅa' }
    ]
  },
  {
    label: 'ಚ-ವರ್ಗ · Palatal',
    letters: [
      { kn: 'ಚ', translit: 'ca' }, { kn: 'ಛ', translit: 'cha' },
      { kn: 'ಜ', translit: 'ja' }, { kn: 'ಝ', translit: 'jha' }, { kn: 'ಞ', translit: 'ña' }
    ]
  },
  {
    label: 'ಟ-ವರ್ಗ · Retroflex',
    letters: [
      { kn: 'ಟ', translit: 'ṭa' }, { kn: 'ಠ', translit: 'ṭha' },
      { kn: 'ಡ', translit: 'ḍa' }, { kn: 'ಢ', translit: 'ḍha' }, { kn: 'ಣ', translit: 'ṇa' }
    ]
  },
  {
    label: 'ತ-ವರ್ಗ · Dental',
    letters: [
      { kn: 'ತ', translit: 'ta' }, { kn: 'ಥ', translit: 'tha' },
      { kn: 'ದ', translit: 'da' }, { kn: 'ಧ', translit: 'dha' }, { kn: 'ನ', translit: 'na' }
    ]
  },
  {
    label: 'ಪ-ವರ್ಗ · Labial',
    letters: [
      { kn: 'ಪ', translit: 'pa' }, { kn: 'ಫ', translit: 'pha' },
      { kn: 'ಬ', translit: 'ba' }, { kn: 'ಭ', translit: 'bha' }, { kn: 'ಮ', translit: 'ma' }
    ]
  },
  {
    label: 'Semivowels & Others',
    letters: [
      { kn: 'ಯ', translit: 'ya' }, { kn: 'ರ', translit: 'ra' },
      { kn: 'ಲ', translit: 'la' }, { kn: 'ವ', translit: 'va' },
      { kn: 'ಶ', translit: 'śa' }, { kn: 'ಷ', translit: 'ṣa' },
      { kn: 'ಸ', translit: 'sa' }, { kn: 'ಹ', translit: 'ha' }, { kn: 'ಳ', translit: 'ḷa' }
    ]
  },
  {
    label: 'ಒತ್ತಕ್ಷರಗಳು · Compound',
    letters: [
      { kn: 'ಕ್ಷ', translit: 'kṣa' }, { kn: 'ಜ್ಞ', translit: 'jña' }
    ]
  }
];

export default VARNAMALA;
