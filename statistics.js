/**
 * Funkce statistics
 * -----------------
 * Vypočítá statistiky úklidů podle uživatelů na základě dat z listu "Úklidový plán".
 * Vytvoří nebo aktualizuje list "Statistiky" se sloupci:
 *  - Jméno
 *  - Počet úklidů (pouze přiřazené záznamy)
 *  - Poměr (%) k celkovému počtu přiřazených úklidů
 *
 * Prázdné záznamy (bez jména) nejsou do statistik započítány.
 */
function statistics() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const planSheet = spreadsheet.getSheetByName('Úklidový plán');
  const statsSheetName = 'Statistiky';

  // Získání nebo vytvoření listu "Statistiky"
  let statsSheet = spreadsheet.getSheetByName(statsSheetName);
  if (!statsSheet) {
    statsSheet = spreadsheet.insertSheet(statsSheetName);
  } else {
    statsSheet.clear(); // Vymazání existujícího obsahu
  }

  // Načtení dat z listu "Úklidový plán" (sloupce A a B, bez hlavičky)
  const data = planSheet.getRange(2, 1, planSheet.getLastRow() - 1, 2).getValues();
  const userStats = {};
  let totalAssignedCleanings = 0; // Počet úklidů s přiřazeným uživatelem

  // Výpočet počtu úklidů pro každého uživatele
  data.forEach(row => {
    const userName = row[1]; // Jméno ve sloupci B
    if (userName) {
      userStats[userName] = (userStats[userName] || 0) + 1;
      totalAssignedCleanings++;
    }
  });

  // Příprava dat pro zápis do listu "Statistiky"
  const statsData = [['Jméno', 'Počet úklidů', 'Poměr (%)']]; // Hlavičky
  for (const [userName, count] of Object.entries(userStats)) {
    const ratio = totalAssignedCleanings > 0 ? ((count / totalAssignedCleanings) * 100).toFixed(2) : '0.00';
    statsData.push([userName, count, `${ratio}%`]);
  }

  // Zápis dat do listu "Statistiky"
  statsSheet.getRange(1, 1, statsData.length, statsData[0].length).setValues(statsData);

  // Nastavení formátování
  statsSheet.getRange(1, 1, 1, 3).setFontWeight('bold'); // Zvýraznění hlaviček
  statsSheet.autoResizeColumns(1, 3); // Automatické přizpůsobení šířky sloupců
}