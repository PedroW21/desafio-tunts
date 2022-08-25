import fetch from "node-fetch";

async function requestData()
{
    let response = await fetch("https://restcountries.com/v3.1/all");
    let countries = await response.json();
    return countries;
}

async function essentialData()
{
    let data = await requestData();

    return data.map(country => ({
        name: country.name.common,
        capital: country.capital,
        area: country.area,
        curreny: country.currencies.code
    }))
}

export default essentialData;