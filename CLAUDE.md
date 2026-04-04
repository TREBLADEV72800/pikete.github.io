# CLAUDE.md - Guida Completa per lo Sviluppo di PIKETE

## 📋 INDICE
1. [Panoramica del Progetto](#panoramica-del-progetto)
2. [Requisiti del Cliente](#requisiti-del-cliente)
3. [Struttura del Sito](#struttura-del-sito)
4. [Contenuti Real](#contenuti-real)
5. [File e Asset](#file-e-asset)
6. [Modifiche da Fare](#modifiche-da-fare)
7. [Design System](#design-system)
8. [Note Tecniche](#note-tecniche)

---

## 🎯 PANORAMICA DEL PROGETTO

**Nome:** Pikete
**Tipo:** Sito web per una label/collettivo musicale
**Tecnologia:** React 19 + TypeScript + Vite + TailwindCSS + shadcn/ui

### Concetto
Pikete è una **label/gruppo di amici che fanno musica**, NON una band. È un collettivo di 4 artisti che hanno la stessa visione ma percorsi personali distinti.

### Obiettivo del Sito
- Presentazione, archivio, promo e sponsor
- Target: fan (pochi ma reali) e curiosi
- Effetto finale: "Voglio andare ad ascoltare questa gente"
- Artisti al centro di tutto

---

## 📝 REQUISITI DEL CLIENTE (DALLA CHAT)

### Identità e Contenuti
- **Tono:** Sperimentale, musicale, convincente
- **Stile:** Underground, minimal con dettagli
- **Colori:** Nero, grigio scuro, bianco (dark theme)
- **Lingua:** Solo italiano

### Struttura Pagine
1. **Home** - Impatto visivo, logo, testo manifesto, accesso immediato agli artisti
2. **Artisti** - Griglia dei 4 artisti (stesso spazio, totale parità)
3. **Pagina Artista** - Foto, bio, spoiler audio, link social
4. **Spoiler** - Tutti gli spoiler divisi per artista
5. **Contatti** - Email, social Pikete

### Requisiti Specifici
- Gli artisti devono avere pari importanza (nessuno evidenziato)
- Ogni artista ha genere/stile diverso
- Spoiler audio: 20-30 secondi, solo ascolto (no download)
- Play solo su click
- Bio modificabili nel tempo
- Aneddoti come brevi pillole
- Mobile-first fondamentale

### Priorità
1. Artisti al centro
2. Estetica > chiarezza
3. Audio spoiler come gancio
4. Logo sempre visibile

---

## 🗂️ STRUTTURA DEL SITO

### Mappa delle Pagine
```
Home (Landing)
├── Logo Pikete
├── Testo manifesto
├── Call-to-action verso Artisti
└── Anteprima artisti

Artisti (Pagina centrale)
├── Griglia 4 artisti
└── Click → Pagina personale

Pagina Artista (x4)
├── Foto profilo
├── Nome
├── Biografia
├── Spoiler audio (MP3/MP4)
├── Descrizione brani
└── Link social

Spoiler
├── Tutti gli spoiler
└── Divisi per artista

Contatti
├── Email Pikete
└── Social Pikete
```

---

## 📄 CONTENUTI REALI

### Email Pikete
```
piketelabel@gmail.com
```

### Social Pikete
```
YouTube: https://youtube.com/@pikete_pkt?si=vjJTQ7kz9Ct0Yr27
Instagram: [da definire]
TikTok: [da definire]
Spotify: [da definire]
```

## 👥 ARTISTI - DATI COMPLETI

### 1. ORION
```typescript
{
  id: 'orion',
  name: 'Orion',
  role: '',
  image: '/artists/orion.webp',
  bio: 'Orion è un artista classe 2009, nato a Santo Domingo e cresciuto ad Asti. Unisce trap melodica, reggaeton e un vibe urbano‑latino legato alle sue origini cubane. Passa dall\'italiano allo spagnolo con naturalezza, senza forzature, e si ispira a Bad Bunny, Travis Scott, Ghali e Rauw Alejandro. Non si pone limiti: sperimenta nuovi sound, cambia flow, gioca con le melodie e continua ad affinare il suo stile. La sua musica nasce dall\'istinto, dalla cultura che porta con sé e da una vera fame di creare, costruendo un\'identità fresca, personale e riconoscibile. Non si chiude in una formula: segue l\'istinto, sperimenta, cambia flow e lascia che cultura e radici restino presenti.',
  quote: '"Si formano stars perché siamo nella nebula"',
  genres: [],
  socialLinks: {
    spotify: 'https://open.spotify.com/artist/4xNXfzCYzsyWQzDCb4R1nf?si=2V5fB6A9Rquzztzm6Ci2NQ',
    appleMusic: 'https://music.apple.com/it/artist/%C3%B3rion/1806929389',
    youtube: 'https://youtube.com/@orion_pkt?si=jBKWvYEz-QWcdGe6',
    instagram: 'https://www.instagram.com/orion_.top?igsh=ZnRqMGJoanlxbzU3&utm_source=qr',
    tiktok: 'https://www.tiktok.com/@orion_.top?_r=1&_t=ZN-920adNhRVBu'
  },
  spoiler: {
    videoFile: '/spoilers/spoilerorion.mp4',
    description: 'Spoiler 20 secondi'
  }
}
```

### 2. BLISTER
```typescript
{
  id: 'blister',
  name: 'Blister',
  role: '',
  image: '/artists/blister.webp',
  bio: 'Blister, nato a Palermo, porta nei suoi pezzi la stessa rabbia e fame di strada con cui è cresciuto. Si muove tra vibes scure, trap e un rap tagliente, trasformando ogni barra in un colpo e ogni ritornello in qualcosa che resta. Si ispira a Fedez, Noyz Narcos e Chicoria, ma il suo stile è subito riconoscibile: crudo, diretto, senza filtri. Scrive per lasciare il segno, perché dietro ogni traccia c\'è una story vera. Ogni brano è un percorso, un indizio per capire chi è davvero. Non cerca approvazione: si costruisce la strada da solo, deciso a dimostrare che non puoi fermare chi è disposto a dare tutto per arrivare dove vuole.',
  quote: '"Occhi spariscono, fine di un film / Odi sta wave ma resto nel chill"',
  genres: [],
  socialLinks: {
    youtube: 'https://youtube.com/@blistermine?si=Lq8CuhLcQMadBcqn',
    instagram: 'https://www.instagram.com/blistermine?igsh=MXBoZjJneG9pN2VhNQ==',
    tiktok: 'https://www.tiktok.com/@bstr_pkt?_r=1&_t=ZN-920c82yrUNq'
    // Spotify e Apple Music: da aggiungere
  },
  spoiler: {
    videoFile: '/spoilers/spoilerblister.mp4',
    description: 'Spoiler 20 secondi'
  }
}
```

### 3. DYSA
```typescript
{
  id: 'dysa',
  name: 'Dysa',
  role: '',
  image: '/artists/dysa.webp',
  bio: 'Dysa è un giovane artista italo-cubano classe 2009 che sta costruendo il suo nome nel genere urbano con un sound personale e riconoscibile. Cresciuto tra vibes latine e mood da festa, mescola reggaeton e trap melodica con flow sempre diversi. Le sue influenze (Bad Bunny, Luar La L, Nicky Jam ed Eladio Carrión) gli hanno dato un\'impronta forte, spingendolo a creare tracce che oscillano tra energia caliente e melodie più deep. La musica è la sua benzina, il suo playground, la sua passione più vera. Per lui è un playground: energia caliente, melodie deep e flow diversi convivono tra vibes latine, mood da festa, reggaeton e trap melodica.',
  quote: '"Siempre estoy de pie, aunque tenga il mundo en contra"',
  genres: [],
  socialLinks: {
    spotify: 'https://open.spotify.com/intl-it/artist/7DpAbgKOSps2rESKx2wVlW?si=QYhVPkOYQgK2B41-jzA8UA',
    instagram: 'https://www.instagram.com/dysapkt?igsh=eHNibzlhZTNocHU5'
  },
  spoiler: {
    videoFile: '/spoilers/dysa.mp4',
    description: 'Nuove vibes in arrivo',
    locked: true
  }
}
```

### 4. LICORE
```typescript
{
  id: 'licore',
  name: 'LiCore',
  role: '',
  image: '/artists/licore.webp',
  bio: 'LiCore è classe 2009 ed è nato ad Asti. Unisce il rap più classico a un suono più moderno, portando la sua voce e la sua fame a chi non ce l\'ha e vuole farsi sentire. La rabbia con cui è cresciuto e la lucidità ereditata dal fratello sono punti chiave della sua scrittura. I suoi flow restano classici, con influenze di colossi come Guè, Marracash, Ernia e Mezzosangue. Ogni testo nasce da fame di verità e vittoria. Il suo logo, la croce rovesciata, rappresenta la ribellione che LiCore urla nella sua musica. LiCore è Libertà. Parla a chi ha la stessa fame e non trova spazio per urlarla.',
  quote: '"LiCore è per il popolo, fra, come i dogo"',
  genres: [],
  socialLinks: {
    instagram: 'https://www.instagram.com/licore_swgg?igsh=MWJ3NTRjYmR4eGxlag==',
    tiktok: 'https://www.tiktok.com/@asktofrancesco?_r=1&_t=ZN-920cJKQlsaU'
    // Altri: da aggiungere
  },
  spoiler: {
    videoFile: '/spoilers/spoilerlicore.mp4',  // MANCANTE - chiedere all'utente
    description: 'Spoiler 20 secondi'
  }
}
```

---

## 📁 FILE E ASSET

### Cartella `.assets_raw/` - Fonte (Hidden/Backup)
```
C:\Users\alber\Desktop\app\.assets_raw\
├── orionfotoprofilo.jpeg      → /public/artists/orion.webp
├── blisterfotoprofilo.jpeg    → /public/artists/blister.webp
...
└── scripts/convert-images.js  → Utility di conversione
```

### Cartelle da Creare
```
public/
├── artists/
│   ├── orion.webp
│   ├── blister.webp
│   ├── dysa.webp
│   └── licore.webp
├── loghi/
│   ├── pikete.webp    (CON SFONDO TRASPARENTE)
│   └── trebla.webp    (CON SFONDO TRASPARENTE)
└── spoilers/
    ├── orion.mp4
    ├── blister.mp4
    ├── dysa.mp4
    └── licore.mp4     (MANCANTE - chiedere all'utente)
```

---

## 🔧 MODIFICHE DA FARE

### 1. Aggiornare `src/types/index.ts`
```typescript
// Aggiungere dopo interfaccia Track:
export interface Spoiler {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  videoFile: string;
  description?: string;
  locked?: boolean;
}

// Aggiungere a Track:
audioFile?: string;
description?: string;
```

### 2. Sostituire COMPLETAMENTE `src/data/artists.ts`
Vedi sezione "ARTISTI - DATI COMPLETI" sopra.

### 3. Aggiornare `src/sections/SpoilerPage.tsx`
- Caricare spoiler reali dagli artisti
- Mostrare video player invece di placeholder locked
- Dividere per artista

### 4. Aggiornare `src/sections/ContactsPage.tsx`
- Email: piketelabel@gmail.com
- Social Pikete reali

### 5. Aggiornare `src/sections/ArtistDetail.tsx`
- Mostrare spoiler video dell'artista
- Aggiungere descrizione brevissima
- Link social reali

### 6. Aggiornare `src/sections/Hero.tsx` o Home
- Aggiungere sezione "Chi siamo" che spiega:
  - "Pikete non è una band, è una label/gruppo di amici che fanno musica"
  - Breve descrizione del collettivo

### 7. Aggiornare il Logo
- Sostituire SVG attuale con immagine del logo Pikete
- Usare /loghi/pikete.webp

### 8. Conversione Immagini
- Convertire tutti i .jpeg in .webp
- Rendere trasparente lo sfondo dei loghi

---

## 🎨 DESIGN SYSTEM

### Colori
```css
--background: #0a0a0a;      /* Nero principale */
--foreground: #ededed;      /* Bianco/grigio chiaro */
--primary: #f97316;         /* Orange accent */
--secondary: #1a1a1a;       /* Grigio scuro */
--muted: #404040;           /* Grigio medio */
--border: #262626;          /* Bordo */
```

### Tipografia
- Font: Inter
- Titoli: Bold, uppercase per labels
- Testo: Regular, leading rilassato

### Animazioni (Framer Motion)
- Fade in per le sezioni
- Scale su hover card artisti
- Slide per transizioni pagine
- Pulse per elementi interattivi

### Componenti UI
- shadcn/ui - tema "new-york"
- Dark mode attivo
- Border radius: rounded-xl / rounded-2xl / rounded-3xl

---

## 📋 NOTE TECNICHE

### Comandi Utili
```bash
# Installa dipendenze
npm install

# Avvia dev server
npm run dev

# Build per produzione
npm run build

# Preview build
npm run preview
```

### Alias Import
```typescript
@/ → ./src/
```

### Struttura Componenti
```
src/
├── components/
│   ├── Navbar.tsx
│   ├── Logo.tsx
│   └── ui/ (shadcn)
├── sections/
│   ├── Hero.tsx
│   ├── ArtistsPage.tsx
│   ├── ArtistDetail.tsx
│   ├── SpoilerPage.tsx
│   └── ContactsPage.tsx
├── data/
│   └── artists.ts
├── types/
│   └── index.ts
└── App.tsx
```

---

## ✅ CHECKLIST COMPLETAMENTO

- [x] Leggere tutti i contenuti da txt.txt
- [ ] Aggiornare types/index.ts
- [ ] Aggiornare data/artists.ts
- [ ] Convertire immagini in WebP
- [ ] Rendere trasparenti i loghi
- [ ] Copiare spoiler video
- [ ] Aggiornare ContactsPage.tsx
- [ ] Aggiornare SpoilerPage.tsx
- [ ] Aggiornare ArtistDetail.tsx
- [ ] Aggiungere sezione "Chi siamo" nella Home
- [ ] Testare tutte le pagine
- [ ] Testare responsività mobile
- [ ] Verificare link social

---

## 🚨 NOTE IMPORTANTI

1. **Spoiler LiCore MANCANTE** - Chiedere all'utente se ha il file
2. **Social mancanti** - Some artisti non hanno tutti i link (Spotify, Apple Music per Blister, ecc.)
3. **Conversione immagini** - Usare工具 online o ImageMagick:
   ```bash
   magick input.jpeg -quality 85 output.webp
   ```
4. **Trasparenza loghi** - Usare Photoshop/GIMP o工具 online

---

## 📞 CONTATTI CLIENTE

- Email: piketelabel@gmail.com
- Chat: requisiti già forniti

---

**Documento creato il: 31/01/2026**
**Ultimo aggiornamento: v1.0**
