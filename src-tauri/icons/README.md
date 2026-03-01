# 📁 INSTRUKCJA: Dodawanie ikony do aplikacji Windows EXE

## 📍 Gdzie umieścić ikony

Wszystkie ikony należy umieścić w tym katalogu: `src-tauri/icons/`

## 🖼️ Co jest potrzebne dla Windows EXE

Dla aplikacji Windows (27" standardowy monitor) potrzebujesz **TYLKO**:

### ✅ **Wymagane:**
- **icon.ico** - Ikona Windows (powinna zawierać rozmiary: 16x16, 32x32, 48x48, 256x256)

**To wszystko!** Nie musisz dodawać PNG, ICNS ani innych formatów.

## 🎨 Zalecenia dotyczące projektu ikony

- Użyj prostego, rozpoznawalnego symbolu
- Zachowaj przejrzystość w małych rozmiarach (32x32)
- Użyj transparentnego tła (alpha channel)
- Unikaj zbyt małych szczegółów, które znikną po zmniejszeniu

## 🔧 Tworzenie pliku .ico

### **OPCJA 1: Narzędzie online (NAJŁATWIEJSZE)**
1. Przygotuj kwadratową grafikę PNG (min. 256x256 px, zalecane 512x512 px)
2. Wejdź na: https://icoconvert.com/
3. Uploaduj swój PNG
4. Zaznacz rozmiary: 16x16, 32x32, 48x48, 256x256
5. Pobierz wygenerowany plik `icon.ico`
6. Umieść go tutaj: `src-tauri/icons/icon.ico`

### **OPCJA 2: Użyj tauricon (automatyczne)**
Jeśli masz plik PNG:

```bash
# 1. Umieść swój plik jako icon.png w tym folderze
# 2. Uruchom:
npx tauricon src-tauri/icons/icon.png
```

To wygeneruje `icon.ico` (i inne pliki, które możesz zignorować).

### **OPCJA 3: Narzędzia lokalne**
- **GIMP** (darmowy) - zapisz jako .ico z wieloma rozmiarami
- **ImageMagick** - `convert icon.png -define icon:auto-resize=16,32,48,256 icon.ico`

## 📋 Struktura po dodaniu ikony

```
src-tauri/
├── icons/
│   └── icon.ico  ← TYLKO TEN PLIK!
├── src/
├── Cargo.toml
└── tauri.conf.json
```

## ✅ Po dodaniu ikony

1. Sprawdź czy plik istnieje: `src-tauri/icons/icon.ico`
2. Uruchom build lokalnie: `npm run tauri:build`
3. Sprawdź czy plik .exe ma twoją ikonę
4. Commit i push do repozytorium
5. Uruchom GitHub Actions workflow

---

**💡 Najszybsza metoda:**
1. Przygotuj PNG 512x512 px
2. Wejdź na https://icoconvert.com/
3. Pobierz icon.ico
4. Umieść w `src-tauri/icons/icon.ico`
5. Gotowe! 🎉
