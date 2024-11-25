let allCountriesData;

const CountryContainer = document.querySelector(".countries-container");

const p = fetch("https://restcountries.com/v3.1/all");
const q = p.then((res) => res.json());
q.then((data) => {
  renderCountries(data);
  allCountriesData = data;
});

function renderCountries(data) {
  CountryContainer.innerHTML = "";
  data.forEach((country) => {
    const CountryCard = document.createElement("a");
    CountryCard.classList.add("country-card");
    // console.log(country.name.common);

    CountryCard.href = `./country.html?name=${encodeURIComponent(
      country.name.common
    )}`;

    const cardhtml = `<img class="flagimg"
                src="${country.flags.svg}"
                alt="flag"
              />
              <div class="card-text">
                <h3 class="country-title">${country.name.common}</h3>
                <p><b>Population: </b>${country.population.toLocaleString(
                  "en-IN"
                )}</p>
                <p><b>Region:</b>${country.region}</p>
                <p><b>Capital:</b>${country.capital?.[0]}</p>
              </div>`;
    CountryCard.innerHTML = cardhtml;

    CountryContainer.append(CountryCard);
  });
}

const searchInput = document.querySelector(".search-container input");

searchInput.addEventListener("input", (e) => {
  const filtered_countries = allCountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  );
  renderCountries(filtered_countries);
  // console.log(filtered_countries);
});

//IMPLEMENTING DARK AND LIGHT MODE(DONE BY ME)

const themechanger = document.querySelector(".theme-changer");
const value1 = localStorage.getItem("key1") || "nothing";
if (value1 == "dark" || value1 == "nothing") {
  document.body.classList.remove("dark");
} else {
  document.body.classList.add("dark");
}
themechanger.addEventListener("click", () => {
  const value = localStorage.getItem("key1") || "nothing";

  if (value == "dark" || value == "nothing") {
    document.body.classList.add("dark");
    localStorage.setItem("key1", "light");
  } else {
    document.body.classList.remove("dark");
    localStorage.setItem("key1", "dark");
  }
});
