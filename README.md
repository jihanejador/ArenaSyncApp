## ArenaSync (React + Vite + Tailwind)

### تشغيل المشروع (khtwa b khtwa)

1) Install

```bash
npm install
```

2) Start dev server

```bash
npm run dev
```

3) Build (اختياري)

```bash
npm run build
npm run preview
```

### فين كاينت الداتا؟

- **Remote (default)**: `src/services/dataSource.js` كيجبد data من الرابط اللي عطيتيني.
- **Fallback local**: `src/data/tournamentDB.js` كيتستعمل إلا كان مشكل فـ fetch ولا parsing.

إذا بدّلتي status ديال شي tournament ولا participant فـ الداتا، الواجهة كتتبدل أوتوماتيكياً (ما كاين حتى content مكتوب باليد فالـUI).

### Structure

```
/src
  /components
    ParticipantRow.jsx
    StatusBadge.jsx
    TabSystem.jsx
    TournamentCard.jsx
  /data
    tournamentDB.js
  /services
    dataFilter.js
    dataSource.js
  App.jsx
  main.js
/styles
  app.css
```

