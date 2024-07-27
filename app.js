window.addEventListener("DOMContentLoaded", () => {
  let lon;
  let lat;

  let temperaturaValor = document.getElementById("temperatura-valor");
  let temperaturaDescripcion = document.getElementById(
    "temperatura-descripcion"
  );

  let ubicacion = document.getElementById("ubicacion");
  let iconoAnimado = document.getElementById("icono-animado");
  let hora = document.getElementById("hora");

  const btnBuscar = document.getElementById("btn-buscar");
  const inputLugar = document.getElementById("input-lugar");

  let humedad = document.getElementById("humedad");
  let vientoVelocidad = document.getElementById("viento-velocidad");

  function buscadorLugar(lugar) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${lugar}&lang=es&units=metric&appid=7c58caf463b7870b62b39a4878a040d2`;
    obtenerApi(url);
  }

  btnBuscar.addEventListener("click", (e) => {
    e.preventDefault();
    buscadorLugar(inputLugar.value);
  });

  function obtenerHora() {
    let currentTime = new Date();
    hora.textContent = currentTime.toLocaleTimeString();
  }
  setInterval(obtenerHora, 1000);

  function obtenerApi(url) {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let temp = Math.round(data.main.temp);
        temperaturaValor.textContent = `${temp} °C`;

        let desc = data.weather[0].description;
        temperaturaDescripcion.textContent = desc;

        ubicacion.textContent = data.name;

        let conversionKm = Math.round(data.wind.speed * 3.6);
        vientoVelocidad.textContent = `${conversionKm} km/h`;

        let humedadH = data.main.humidity;
        humedad.textContent = `${humedadH} %`;

        switch (data.weather[0].main) {
          case "Clear":
            iconoAnimado.src = "animated/day.svg";
            break;
          case "Clouds":
            iconoAnimado.src = "animated/cloudy.svg";
            break;
          case "Thunderstorm":
            iconoAnimado.src = "animated/thunder.svg";
            break;
          case "Drizzle":
            iconoAnimado.src = "animated/rainy-2.svg";
            break;
          case "Rain":
            iconoAnimado.src = "animated/rainy-7.svg";
            break;
          case "Snow":
            iconoAnimado.src = "animated/snowy-6.svg";
            break;
          case "Atmosphere":
            iconoAnimado.src = "animated/weather.svg";
            break;
          default:
            iconoAnimado.src = "animated/cloudy-day-1.svg";
        }
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(url);
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((posicion) => {
      lon = posicion.coords.longitude;
      lat = posicion.coords.latitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=7c58caf463b7870b62b39a4878a040d2`;
      obtenerApi(url);
    });
  }
});
