# ¡Vamos! — španielčina po slovensky

PWA appka na učenie španielčiny. Dáta sa ukladajú do localStorage — streak, XP, denný cieľ aj SRS progres vydržia natrvalo.

## Funkcie

- **Lekcie** — nové slová po témach v cykle predstavenie → spoznanie → napísanie
- **SRS kartičky** — Leitnerov systém, slová na zopakovanie sa vracajú podľa toho, ako ti idú
- **Slovník** — 316 slov v témach (A1/A2/B1) s príkladovými vetami a audio výslovnosťou
- **Quiz, Písanie, Skladanie viet** — rôzne režimy precvičovania
- **Slovesá** — časovanie: prítomný čas, pretérito, futuro, imperfecto (výber času na B1)
- **Denný cieľ + kalendár streaku** — kruhový ukazovateľ a posledných 7 dní
- **Účet** — meno, avatar, štatistiky, export/import zálohy (JSON), reset, nastavenie cieľa a zvukov
- **Zvuková spätná väzba** + španielske TTS

## Lokálne spustenie

```bash
npm install
npm run dev
```

## Deploy na Vercel

1. Vytvor GitHub repo a pushni projekt:
   ```bash
   git init
   git add .
   git commit -m "init"
   git remote add origin https://github.com/TVOJ_USER/vamos.git
   git push -u origin main
   ```
2. Na [vercel.com](https://vercel.com) → **Add New → Project** → importuj repo.
3. Vercel sám rozpozná Vite (Build: `npm run build`, Output: `dist`). Nič nemeníš.
4. **Deploy** → dostaneš URL typu `vamos-xyz.vercel.app`.

Alternatíva bez GitHubu (Vercel CLI): `npm i -g vercel && vercel --prod`

## Inštalácia na telefón

1. Otvor URL v Chrome (Android) alebo Safari (iOS).
2. Menu → **Pridať na plochu** / **Add to Home Screen**.
3. Appka beží fullscreen s ikonou, funguje aj offline.

## Poznámky

- **Dáta:** localStorage je viazaný na zariadenie. Na iné zariadenie prenesieš progres cez Účet → Export → Import. Sync cez cloud = budúci upgrade na Supabase.
- **Audio:** Web Speech API (es-ES hlas v systéme). Na iOS sa spustí až po prvom ťuknutí — limitácia Safari.

