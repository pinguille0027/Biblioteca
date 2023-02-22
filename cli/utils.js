
// Deberes: Functional programming & OOP ( Object Oriented Programing )
export const appendCell = (row, value, type = 'td', classList = []) => {
    if (!['td', 'th'].includes(type)) {
        this.row.appendChild(document.createElement('td'));
        return;
    }

    const cell = document.createElement(type);
    row.appendChild(cell);

    if (!Array.isArray(classList)) { return; }

    cell.innerHTML = value;
    if (classList.length > 0) { cell.classList = classList; }
};