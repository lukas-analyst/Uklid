/**
 * Funkce removeOldDates
 * ---------------------
 * Na listu 'Datum' smaže všechny řádky, kde je datum ve sloupci A menší než dnešní datum.
 * Zbylé (budoucí a dnešní) datumy posune nahoru, aby nebyly mezi nimi mezery.
 * Hlavička zůstává zachována.
 * 
 * Očekávaná struktura listu 'Datum':
 * | Datum      | Den      |
 * |------------|----------|
 * | 1.1.2025   | Středa   |
 * | 2.1.2025   | Čtvrtek  |
 * | ...        | ...      |
 */
function removeOldDates() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Datum');
  if (!sheet) return; // Pokud list neexistuje, ukonči funkci

  // Získání dnešního data (nastaveno na půlnoc)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return; // Pokud nejsou žádná data, ukonči funkci

  // Načtení všech dat (bez hlavičky)
  const data = sheet.getRange(2, 1, lastRow - 1, 2).getValues();
  const newData = [];

  // Výběr pouze těch řádků, kde je datum dnes nebo v budoucnosti
  for (let i = 0; i < data.length; i++) {
    const dateValue = new Date(data[i][0]);
    dateValue.setHours(0, 0, 0, 0);
    if (dateValue >= today) {
      newData.push(data[i]);
    }
  }

  // Vymazání starých dat (ponechá hlavičku)
  if (lastRow > 1) {
    sheet.getRange(2, 1, lastRow - 1, 2).clearContent();
  }

  // Zápis nových dat od druhého řádku (pod hlavičku)
  if (newData.length > 0) {
    sheet.getRange(2, 1, newData.length, 2).setValues(newData);
  }
}