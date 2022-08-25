import excelnode from "excel4node";
import data from "./index.js";
import {workbook, mainTitle, columnTitles} from "./excelStyles.js";

let worksheet = workbook.addWorksheet("DesafioTunts");

// merge line 1
//          (cel, column)
worksheet.cell(1, 1, 1, 4, true);

// row 1 title
worksheet.cell(1, 1)
.string("Countries List")
.style(mainTitle);

// Secondary titles
let secondaryTitles = ["Name", "Capital", "Area", "Currencies"];

for(let i= 1; i <= 4; i++)
{
    worksheet.cell(2,i)
    .string(`${secondaryTitles[i-1]}`)
    .style(columnTitles);
}

// async function insertDataInTable(data)
// {
//     let treatedData = await data;

//     // for - countries
//     worksheet.cell(1,1)
//     .string("Country")
//     for (let i = 0; i < treatedData.length; i++)
//     {
        
//     }
// }

// insertDataInTable(data);

workbook.write("Teste.xlsx");