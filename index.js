import fetch from "node-fetch";
import chalk from 'chalk';

async function requestData()
{
    try
    {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if(response.ok)
        {
            return response.json();
        }

        throw new Error(`${response.status} - ${response.statusText}`);
    }
    catch(e)
    {
        console.log(chalk.bold.red(e.message));
    }   
}

async function essentialData()
{
    let data = await requestData();
    if(data == undefined) console.log(chalk.bold.red("Resquest error has occurred"));
    else
    {
        let treatedData = data.map(country => ({
            name: country.name.common,
            capital: country.capital,
            area: country.area,
            currency: country.currencies
        }));
    
        return treatedData;
    }
}

let treatedData = await essentialData();
export default treatedData;