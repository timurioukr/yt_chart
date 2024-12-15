// Дані для чарту
const chartData = [
  { country: "USA", gdp: 4353 },
  { country: "China", gdp: 3432 },
  { country: "India", gdp: 2900 },
  { country: "Germany", gdp: 4000 },
  { country: "Japan", gdp: 3500 },
];

const chartContainer = document.getElementById("chart");
const countryInput = document.getElementById("countryInput");
const gdpInput = document.getElementById("gdpInput");
const addDataButton = document.getElementById("addDataButton");

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const renderChart = () => {
  
  const maxGDP = Math.max(...chartData.map((data) => data.gdp)); // Знаходимо максимальне значення ВВП

  chartData.forEach((data) => {
    // Створення стовпчика
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.backgroundColor = getRandomColor();
    bar.style.height = "0"; // Початкова висота для анімації

    // Додавання ВВП (значення)
    const value = document.createElement("span");
    value.textContent = `${data.gdp}`;
    bar.appendChild(value);

    // Додавання назви країни
    const label = document.createElement("div");
    label.textContent = data.country;
    label.classList.add("label");
    bar.appendChild(label);

    // Додавання стовпчика до контейнера
    chartContainer.appendChild(bar);

    // Анімація висоти стовпчика
    setTimeout(() => {
      bar.style.height = `${(data.gdp / maxGDP) * 100}%`;
    }, 100);
  });
};

const addData = () => {
  const country = countryInput.value.trim();
  const gdp = parseInt(gdpInput.value.trim(), 10);

  if (country && !isNaN(gdp)) {
    chartData.push({ country, gdp });
    renderChart(); // Перемальовуємо чарт
    countryInput.value = "";
    gdpInput.value = "";
  } else {
    alert("Please enter valid country name and GDP.");
  }
};

addDataButton.addEventListener("click", addData);

renderChart();
