# ¡Vamos! — španielčina po slovensky

PWA appka na učenie španielčiny: lekcie, SRS kartičky, quiz, písanie, frázy, časovanie slovies. 316 slov (A1/A2/B1) s príkladovými vetami a audio výslovnosťou. Dáta sa ukladajú do localStorage — streak, XP a SRS progres vydržia natrvalo.

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
   git remote add origin git@github.com:TVOJ_USER/vamos.git
   git push -u origin main
   ```
2. Na [vercel.com](https://vercel.com) → **Add New → Project** → importuj repo.
3. Vercel sám rozpozná Vite (Framework Preset: **Vite**, Build: `npm run build`, Output: `dist`). Nič nemeníš.
4. **Deploy** → dostaneš URL typu `vamos-xyz.vercel.app`.

Alternatíva bez GitHubu (Vercel CLI):
```bash
npm i -g vercel
vercel --prod
```

## Inštalácia na telefón

1. Otvor URL v Chrome (Android) alebo Safari (iOS).
2. Menu → **Pridať na plochu** / **Add to Home Screen**.
3. Appka beží na celú obrazovku s ikonou, funguje aj offline (service worker).

## Poznámky

- **Dáta:** localStorage je viazaný na prehliadač v zariadení. Vydrží roky, zmizne len ak appku/dáta prehliadača ručne vymažeš. Sync medzi zariadeniami = budúci upgrade na Supabase.
- **Audio:** používa Web Speech API (es-ES hlas v systéme). Na iOS sa hlas spustí až po prvom ťuknutí používateľa — to je limitácia Safari, nie bug.
