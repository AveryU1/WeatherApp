import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState({});
  const [isCelcius, setIsCelcius] = useState(true);
  const [temp, setTemp] = useState(0);
  const [celciusTemp, setCelciusTemp] = useState(0);
  const [icon, setIcon] = useState({});

  useEffect(() => {
    const success = pos => {
      let lat = pos.coords.latitude;
      let lon = pos.coords.longitude;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=20a72ebc1b152998804bb9e88284c5a9`
        )
        .then(res => {
          setData(res.data);
          const toCelcius = Math.round(res.data.main?.temp - 273.15);
          setTemp(toCelcius);
          setCelciusTemp(res.data.main?.temp);
          setIcon(res.data.weather?.[0].icon);
        });
    };
    navigator.geolocation.getCurrentPosition(success);
    console.log(data);
  }, []);
  const convertTemp = () => {
    if (isCelcius) {
      // Transformar a farenheit
      setTemp(Math.round(temp * (9 / 5) + 32));
      setIsCelcius(false);
    } else {
      // Transformar a celcius;
      setTemp(Math.round((temp - 32) * (5 / 9)));
      setIsCelcius(true);
    }
  };
  return (
    <div className="container">
      <div className="card">
        <div>
          <h2>{data.name}</h2>
        </div>
        <div>
          <h5>{data.sys?.country}</h5>
        </div>
        <div>
          <h1>
            {temp} {isCelcius ? "°C" : "°F"}
          </h1>
        </div>
        <div>
          <b>Description: </b>
          {data.weather?.[0].description}
        </div>
        <div>
          <b>Pressure: </b>
          {data.main?.pressure}
        </div>
        <div>
          <b>Wind: </b>
          {data.wind?.speed}
        </div>
        <div>
          <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
        </div>
        <button onClick={convertTemp}>F°/C°</button>
      </div>
    </div>
  );
}

export default App;
