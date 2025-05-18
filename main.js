/**
 * onOpen
 * ------
 * Při otevření souboru:
 * - Přidá do menu položky pro správu úklidového plánu.
 * - Získá aktuálního uživatele podle e-mailu a jeho jméno vloží do buňky F1 na listu "Úklidový plán".
 */
function onOpen() {
    const ui = SpreadsheetApp.getUi();
    const menu = ui.createMenu('Úklidový plán');
    menu.addItem('Aktualizuj spolubydlícího', 'getUserNameByEmail')
        .addItem('Aktualizovat statistiky', 'statistics')
        .addItem('Odstranit staré datumy', 'removeOldDates')
        .addToUi();

    // Získání aktuálního uživatele a vložení jeho jména do buňky F1
    const email = Session.getActiveUser().getEmail();
    const userName = getUserNameByEmail(email);
    const planSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Úklidový plán');
    planSheet.getRange('F1').setValue(userName || 'Neznámý uživatel');
}

/**
 * getUserNameByEmail
 * ------------------
 * Vrátí jméno uživatele podle jeho e-mailu z listu "Spolubydlící".
 * Pokud není nalezen, vrátí null.
 */
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

/**
 * onEdit
 * ------
 * Reaguje na změnu v listu "Úklidový plán".
 * Pokud je změněn checkbox ve sloupci C, zavolá handleCheckboxEdit.
 */
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