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
  
    // Načtení dat z listu "Úklidový plán"
    const data = planSheet.getRange(2, 1, planSheet.getLastRow() - 1, 2).getValues(); // Sloupce A a B
    const userStats = {};
    let totalAssignedCleanings = 0; // Počet úklidů s přiřazeným uživatelem
  
    // Výpočet počtu úklidů pro každého uživatele
    data.forEach(row => {
      const userName = row[1]; // Jméno ve sloupci B
      if (userName) {
        userStats[userName] = (userStats[userName] || 0) + 1;
        totalAssignedCleanings++; // Zvýšení počtu přiřazených úklidů
      }
    });
  
    // Zápis statistik do listu "Statistiky"
    const statsData = [['Jméno', 'Počet úklidů', 'Poměr (%)']]; // Hlavičky
    for (const [userName, count] of Object.entries(userStats)) {
      const ratio = ((count / totalAssignedCleanings) * 100).toFixed(2); // Výpočet poměru pouze z přiřazených úklidů
      statsData.push([userName, count, `${ratio}%`]);
    }
  
    // Zápis dat do listu "Statistiky"
    statsSheet.getRange(1, 1, statsData.length, statsData[0].length).setValues(statsData);
  
    // Nastavení formátování
    statsSheet.getRange(1, 1, 1, 3).setFontWeight('bold'); // Zvýraznění hlaviček
    statsSheet.autoResizeColumns(1, 3); // Automatické přizpůsobení šířky sloupců
  }