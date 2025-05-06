function onOpen() {
    const ui = SpreadsheetApp.getUi();
    const menu = ui.createMenu('Úklidový plán');
    
    menu.addItem('Aktualizuj spolubydlícího', 'getUserNameByEmail') // Přidání do menu
        .addItem('Aktualizovat statistiky', 'statistics') // Přidání do menu
        .addToUi();
  
    // Získání aktuálního uživatele a vložení jeho jména do buňky F1
    const email = Session.getActiveUser().getEmail();
    const userName = getUserNameByEmail(email);
    const planSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Úklidový plán');
    planSheet.getRange('F1').setValue(userName || 'Neznámý uživatel');
  }
  
  // Funkce pro získání jména podle e-mailu
  function getUserNameByEmail(email) {
    const userSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Spolubydlící');
    const data = userSheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) { // Začínáme od řádku 1 (předpokládáme, že řádek 0 obsahuje hlavičky)
      if (data[i][0] === email) {
        return data[i][1]; // Vrátí jméno
      }
    }
    return null; // Pokud není nalezeno, vrátí null
  }
  
  function onEdit(e) {
      const sheet = e.source.getActiveSheet();
      const range = e.range;
      const column = range.getColumn();
      const row = range.getRow();
    
      if (sheet.getName() === 'Úklidový plán') {
        if (column === 3) { // Sloupec C (checkboxy)
          handleCheckboxEdit(sheet, range, row);
          }
      }
  }
      