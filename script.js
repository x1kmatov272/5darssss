const countryInput = document.getElementById("countryInput");
const searchButton = document.getElementById("searchButton");
const countryInfo = document.getElementById("countryInfo");

async function fetchCountryData(countryName) {
  try {
    const url = `https://restcountries.com/v3.1/name/${countryName}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.length > 0) {
      displayCountryInfo(data[0]);
    } else {
      countryInfo.innerHTML = `<p style="color:red;">Country not found.</p>`;
    }
  } catch (error) {
    countryInfo.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
  }
}

function displayCountryInfo(country) {
  const currencyKey = Object.keys(country.currencies)[0];
  const currency = country.currencies[currencyKey];

  countryInfo.innerHTML = `
    <h2>${country.name.common}</h2>
    <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" width="200">
    <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "No capital"}</p>
    <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
    <p><strong>Region:</strong> ${country.region}</p>
    <p><strong>Currency:</strong> ${currency.name} (${currencyKey})</p>
    <p><strong>Languages:</strong> ${Object.values(country.languages).join(", ")}</p>
  `;
}

searchButton.addEventListener("click", () => {
  const countryName = countryInput.value.trim();
  if (countryName) {
    fetchCountryData(countryName);
  }
});