const apiKey = "1926d1fc448844ba99513945231105";

// const query = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=London`;

// Получаем значения из формы(название города)
const form = document.querySelector("#form");
const input = document.querySelector("#inputCity");
const header = document.querySelector(".header");

// Функции
function removeCard() {
  // Удаляем предыдущую карточку
  const prevCard = document.querySelector(".card");
  if (prevCard) {
    prevCard.remove();
  }
}

function showError(errorMessage) {
  // Если есть ошибка выводим её(в виде карточки)
  const html = `<div class="card">${errorMessage}</div>`;

  // Отображаем карточку на странице
  header.insertAdjacentHTML("afterend", html);
}

function showCard(name, country, temp, condition, fileName) {
  const html = `<div class="card">
                        <h2 class="card-city">${name}<span>${country}</span></h2>
                        
                        <div class="card-weather">
                            <div class="card-value">${temp}<sup>°c</sup></div>
                            <img class="card-img" src="${fileName}" alt="Weather">
                        </div>
    
                        <div class="card-deskription">${condition}</div>
                    </div>`;

  // Отображаем карточку на странице
  header.insertAdjacentHTML("afterend", html);
}

async function getWeather(city) {
  // Делаем запрос на сервер для получения погоды
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}

form.onsubmit = async function (e) {
  // Отменяем отправку формы
  e.preventDefault();

  // Берем значение из инпута, обрезаем пробелы
  let city = input.value.trim();

  // Получаем данные с сервера
  const data = await getWeather(city);

  // Проверка на ошибку
  if (data.error) {
    // Если есть ошибка - выводим её
    removeCard();
    showError(data.error.message);
  } else {
    // Если ошибки нет - выводим карточку
    removeCard();

    const fileName = "./img/" + data.current.condition.text + ".jpg";

    // Отображаем полученные данные в карточке
    showCard(
      data.location.name,
      data.location.country,
      data.current.temp_c,
      data.current.condition.text,
      fileName
    );
  }
};
