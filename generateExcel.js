import chalk from 'chalk';
import treatedData from "./index.js";
import {workbook, mainTitle, columnTitles} from "./excelStyles.js";

let worksheet = workbook.addWorksheet("DesafioTunts");

// Basic things: 1 row - merge in the first row with 4 columns and putting the title| 2 row: putting the column's titles; 

worksheet.cell(1, 1, 1, 4, true);

worksheet.cell(1, 1)
.string("Countries List")
.style(mainTitle);

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

function insertDataInTable(data, column)
{
    for(let i = 0; i < data.length; i++)
    {
        if(typeof(data[i]) == "number")
        {
            worksheet.cell(i+3,column)
            .number(data[i]);
        }
        else
        {
            worksheet.cell(i+3,column)
            .string(`${data[i]?.length ? data[i] : '-'}`);
        }

    }
}

async function generateExcel()
{
    insertDataInTable(await extractData("name"), 1);
    insertDataInTable(await extractData("capital"), 2);
    insertDataInTable(await extractData("area"), 3);
    insertDataInTable(await extractData("currency"), 4);
    worksheet.row(2).filter();
}

workbook.write("Countries.xlsx");

console.log(chalk.green("Everything went well! Check the result!\n"))

export {generateExcel};