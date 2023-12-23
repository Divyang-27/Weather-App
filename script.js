let btn = document.querySelector("#submit");
async function fetchData(city) {
  try {
    const response = await fetch(
      `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "2ce7d8b8dfmsha90355e4828fdddp193fc8jsn7d0575bbde16",
          "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
        },
      }
    );
    const result = await response.json(); // Assuming the response is JSON, use json() instead of text()
    //Classes Values
    if (result.temp != undefined) {
      document.querySelector(".temp").innerHTML = result.temp;
      document.querySelector(".min-temp").innerHTML = result.min_temp;
      document.querySelector(".max-temp").innerHTML = result.max_temp;
      document.querySelector(".sunrise-time").innerHTML = result.sunrise;
      document.querySelector(".sunset-time").innerHTML = result.sunset;
      document.querySelector(".humidity").innerHTML = result.humidity;
      document.querySelector(".Wind_degrees").innerHTML = result.wind_degrees;
      document.querySelector(".Wind_speed").innerHTML = result.wind_speed;
      document.querySelector(".Feels_like").innerHTML = result.feels_like;

      const tablebody = document.querySelector("tbody");
      const row = document.createElement("tr");
      row.classList.add(city);
      tablebody.appendChild(row);
      const tablerow = document.querySelector(`.${city}`);
      tablerow.classList.add(city);
      const tableheader = document.createElement("th");
      const tablespan = document.createElement("span");
      tableheader.classList.add("text-start");
      tableheader.scope = "row";
      tableheader.append(tablespan);
      tablerow.appendChild(tableheader);
      tablespan.innerHTML = city;
      console.log(tableheader);
      const columns = [
        "feels_like",
        "humidity",
        "max_temp",
        "min_temp",
        "sunrise",
        "sunset",
        "temp",
        "wind_degrees",
        "wind_speed",
      ];

      columns.forEach((el) => {
        const td = document.createElement("td");
        td.innerHTML = result[el];
        tablerow.appendChild(td);
      });
    } else {
      alert("Data is not Available");
    }
  } catch (error) {
    console.error(error);
  }
}

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  let cityName = document.querySelector("#cityName").value;
  const city = document.querySelector(".city");
  if (cityName === city.textContent) {
    alert("Please select a different city name");
    return;
  }
  city.innerHTML = cityName;
  await fetchData(cityName);
});

fetchData("Delhi");
