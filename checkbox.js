function handleCheckboxEdit(sheet, range, row) {
  const isChecked = range.getValue() === true; // Zjistí, zda je checkbox zaškrtnutý
  const assignedUserCell = sheet.getRange(row, 2); // Buňka ve sloupci B (jméno)
  const dateCell = sheet.getRange(row, 1); // Buňka ve sloupci A (datum)
  const dateValue = new Date(dateCell.getValue()); // Datum ve sloupci A
  const today = new Date(); // Aktuální datum
  today.setHours(0, 0, 0, 0); // Nastavení času na půlnoc pro přesné porovnání

  if (!isChecked && dateValue < today) {
    // Pokud je checkbox odškrtnutý a datum je v minulosti
    range.setValue(true); // Znovu zaškrtnutí checkboxu
    return; // Nedělej nic dalšího
  }

  const userName = sheet.getRange('F1').getValue(); // Načtení jména z buňky F1

  if (isChecked) {
    assignedUserCell.setValue(userName); // Zapsání jména do sloupce B
  } else {
    assignedUserCell.clearContent(); // Vymazání jména, pokud je checkbox odškrtnutý
  }
}