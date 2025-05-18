# Úklidový plán

Tento projekt je určen pro správu úklidového plánu pro byt ve spolubydlení pomocí Google Sheets a Google Apps Script. Obsahuje funkce pro sledování úklidů a generování statistik.

## Funkce

### 1. **onOpen**
- Automaticky se spustí při otevření gSheet tabulky.
- Přidá vlastní menu **"Úklidový plán"** s následujícími položkami:
  - **Aktualizuj spolubydlícího**: Získá jméno aktuálně přihlášeného uživatele podle jeho e-mailu.
  - **Aktualizovat statistiky**: Spustí výpočet statistik.

### 2. **handleCheckboxEdit**
- Spouští se při úpravě checkboxu ve sloupci C na listu `Úklidový plán`.
- Pokud je checkbox zaškrtnutý:
  - Zapíše jméno aktuálního uživatele do sloupce B.
- Pokud je checkbox odškrtnutý:
  - Vymaže jméno ze sloupce B.
  - Pokud je datum ve sloupci A v minulosti, checkbox se automaticky znovu zaškrtne a nic se nestane.

### 3. **statistics**
- Generuje statistiky na základě dat z listu `Úklidový plán`.
- Vytvoří nebo aktualizuje list `Statistiky` s následujícími sloupci:
  - **Jméno**: Jméno uživatele.
  - **Počet úklidů**: Počet úklidů přiřazených uživateli.
  - **Poměr (%)**: Poměr úklidů uživatele k celkovému počtu přiřazených úklidů.

## Struktura projektu

- **`main.js`**: Obsahuje funkce `onOpen` a `getUserNameByEmail`.
- **`checkbox.js`**: Obsahuje logiku pro práci s checkboxy.
- **`statistics.js`**: Obsahuje logiku pro generování statistik.

## Jak používat
1. Otevřete Google Sheets a přejděte do editoru Apps Script.
2. Zkopírujte kód z jednotlivých souborů (`main.js`, `checkbox.js`, `statistics.js`) do odpovídajících skriptů v editoru.
3. Uložte a aktualizujte oprávnění, pokud je to vyžadováno.
4. Otevřete tabulku a použijte vlastní menu **"Úklidový plán"** pro spuštění funkcí.


## Příklad struktury listů

### List `Úklidový plán`
| Datum       | Jméno       | Checkbox | ... |
|-------------|-------------|----------|-----|
| 2025-05-01  | Jan Novák   | ✅       | ... |
| 2025-05-02  | Petra Malá  | ✅       | ... |
| 2025-05-03  |             | ⬜       | ... |

### List `Spolubydlící`
| E-mail               | Jméno       |
|----------------------|-------------|
| jan.novak@email.com  | Jan Novák   |
| petra.mala@email.com | Petra Malá  |

### List `Statistiky`
| Jméno       | Počet úklidů | Poměr (%) |
|-------------|--------------|-----------|
| Jan Novák   | 5            | 50.00%    |
| Petra Malá  | 3            | 30.00%    |

## Licence

Tento projekt je poskytován "tak, jak je" bez jakýchkoli záruk. Používejte na vlastní riziko.
