import excelnode from "excel4node";

// Impossible to create the Style before the workbook, so i needed to put it in here.
let workbook = new excelnode.Workbook();

let mainTitle = workbook.createStyle({
    font: {
        color: "#4F4F4F",
        size: 16,
        bold: true
    },
    alignment: {
        horizontal: "center"
    }
});

let columnTitles = workbook.createStyle({
    font: {
        color: "#808080",
        size: 12,
        bold: true
    },
    alignment: {
        horizontal: "center"
    }
});

export {workbook ,mainTitle, columnTitles};