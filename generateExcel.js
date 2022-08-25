import excelnode from "excel4node";
import extractedData from "./index.js";
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

async function extractNames()
{
    let treatedData = await extractedData;

    let justNames = treatedData.map( (countries) => countries.name);

    return justNames;
}

async function extractCapital()
{
    let treatedData = await extractedData;

    let nameCapitals = treatedData.map( (countries) => countries.capital);

    return nameCapitals;
}

async function extractCountry()
{
    let treatedData = await extractedData;

    let areaCountry = treatedData.map( (countries) => countries.area);

    return areaCountry;
}

async function extractCurrency()
{
    let treatedData = await extractedData;

    let countryCurrency = treatedData.map(countries => countries.currency);

    return countryCurrency;

    // #TODO IMPROVE THIS - JUST TAKE THE ABBREVIATION
}

function insertDataInTable(countryNames, countryCapitals, areaCountry, countryCurrency)
{  
    // Country Names
    for (let i = 0; i < countryNames.length; i++)
    {   
        worksheet.cell(i+3,1)
        .string(`${countryNames[i]}`);
    }

    // Country Capitals
    for (let i = 0; i < countryCapitals.length; i++)
    {   
        worksheet.cell(i+3,2)
        .string(`${countryCapitals[i]}`);
    }
    
    // Area
    for (let i = 0; i < areaCountry.length; i++)
    {   
        worksheet.cell(i+3,3)
        .string(`${areaCountry[i]}`);
    }

    // Currency
    for (let i = 0; i < countryCurrency.length; i++)
    {   
        worksheet.cell(i+3,4)
        .string(`${countryCurrency[i]}`);
    }
}

//insertDataInTable(await extractNames(), await extractCapital(), await extractCountry(), await extractCurrency());

console.log(await extractCurrency());

//workbook.write("Teste.xlsx");