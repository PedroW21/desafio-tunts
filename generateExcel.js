import excelnode from "excel4node";
import treatedData from "./index.js";
import {workbook, mainTitle, columnTitles} from "./excelStyles.js";

let worksheet = workbook.addWorksheet("DesafioTunts");

// merge line 1
//          (cells, column)
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

async function extractData(wantedData)
{
    let data = await treatedData;
    
    if(wantedData === "currency")
    {
        let extractedData = data.map( (countries) => Object.keys(countries.currency??{}));
        return extractedData;
    }

    let extractedData = data.map( (countries) => countries[wantedData]);

    return extractedData;
}

function insertDataInTable2(data, column)
{
    for(let i = 0; i < data.length; i++)
    {
        if(typeof(data[i]) === "number")
        {
            worksheet.cell(i+3,column)
            .number(data[i]);
        }

        worksheet.cell(i+3,column)
        .string(`${data[i] !== undefined ? (data[i].length !== 0 ? data[i] : "-") : "-"}`);
    }
}

insertDataInTable2(await extractData("name"), 1);
insertDataInTable2(await extractData("capital"), 2);
insertDataInTable2(await extractData("area"), 3);
insertDataInTable2(await extractData("currency"), 4);

workbook.write("Teste.xlsx");