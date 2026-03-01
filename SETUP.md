# 🚀 Instrukcja uruchomienia projektu MLBevo Log Viewer

## 📦 Instalacja zależności

Projekt używa **npm** jako menedżera pakietów. Zainstaluj wszystkie zależności:

```bash
npm install
```

## 🎨 Dodanie ikony aplikacji (WAŻNE!)

Przed pierwszym buildem **MUSISZ** dodać ikonę Windows:

1. Przejdź do folderu: `src-tauri/icons/`
2. Przeczytaj plik `README.md` w tym folderze
3. **NAJŁATWIEJSZE** - Przygotuj PNG i konwertuj online:
   - Przygotuj kwadratowy PNG (min. 256x256, zalecane 512x512 px)
   - Wejdź na https://icoconvert.com/
   - Downloaduj jako `icon.ico`
   - Umieść w `src-tauri/icons/icon.ico`

4. **ALTERNATYWNIE** - Automatyczne generowanie:
   ```bash
   # Umieść plik icon.png w src-tauri/icons/
   # Następnie uruchom:
   npx tauricon src-tauri/icons/icon.png
   ```

**Potrzebujesz tylko:** `icon.ico` (nic więcej!)

## 🖥️ Uruchomienie w trybie deweloperskim

```bash
npm run dev          # Frontend tylko (Vite)
npm run tauri:dev    # Aplikacja Tauri (desktop app)
```

## 🏗️ Build produkcyjny (Windows EXE)

### Lokalnie (Windows):
```bash
npm run tauri:build
```

Build wygeneruje instalator w: `src-tauri/target/release/bundle/nsis/*.exe`

### GitHub Actions CI/CD:
1. Commit i push zmian do repozytorium
2. Przejdź do zakładki "Actions" na GitHubie
3. Wybierz workflow "Build MLBevo Log Viewer Windows EXE"
4. Kliknij "Run workflow"
5. Po zakończeniu pobierz artefakt EXE

## 📝 Skrypty package.json

- `npm run dev` - Uruchamia Vite dev server
- `npm run build` - Buduje frontend (Vite)
- `npm run tauri:dev` - Uruchamia aplikację Tauri w trybie dev
- `npm run tauri:build` - Buduje aplikację Tauri (.exe)
- `npm run lint` - Sprawdza kod (ESLint)
- `npm test` - Uruchamia testy (Vitest)

## 🔧 Wymagania systemowe

### Windows:
- Node.js 20+
- Rust (zainstaluj z https://rustup.rs/)
- Visual Studio Build Tools lub Windows 10/11 SDK

### Rust Installation:
```bash
# Pobierz i zainstaluj rustup
# https://rustup.rs/

# Po instalacji:
rustup default stable
```

## 📁 Struktura projektu

```
mlbevo-log-viewer/
├── src/                    # Frontend React + TypeScript
│   ├── components/         # Komponenty React
│   ├── pages/              # Strony (routing)
│   ├── lib/                # Utilities (logParser, utils)
│   └── hooks/              # Custom React hooks
├── src-tauri/              # Backend Tauri (Rust)
│   ├── icons/              # Ikony aplikacji (dodaj tutaj!)
│   ├── src/                # Kod Rust
│   ├── Cargo.toml          # Zależności Rust
│   └── tauri.conf.json     # Konfiguracja Tauri
├── public/                 # Pliki statyczne
└── package.json            # Zależności Node.js
```

## 🐛 Rozwiązywanie problemów

### Błąd: "Schema not found" w tauri.conf.json
- To tylko ostrzeżenie VS Code
- Uruchom `npm install` aby zainstalować @tauri-apps/cli

### Błąd buildu Rust
- Upewnij się że Rust jest zainstalowany: `rustc --version`
- Zainstaluj Visual Studio Build Tools (Windows)

### Brak ikon
- Zobacz instrukcję w `src-tauri/icons/README.md`
- Potrzebujesz tylko `icon.ico` dla Windows
- Ikona jest WYMAGANA do buildu

## 📞 Wsparcie

Jeśli masz problemy:
1. Sprawdź zakładkę Issues w repozytorium
2. Upewnij się że wszystkie zależności są zainstalowane
3. Sprawdź logi błędów w terminalu
