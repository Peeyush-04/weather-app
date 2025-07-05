import { useState } from "react";
import { FaTemperatureFull } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { FaCity } from "react-icons/fa6";
import { GiWhirlwind } from "react-icons/gi";
import axios from "axios";

export default function Weather() {
      // values
      const [city, setCity] = useState('');
      const [data, setData] = useState();
      const [loading, setLoading] = useState(false);

      // variables
      const inputPLaceholder = 'Enter your city...';
      const API_KEY = import.meta.env.VITE_API_KEY;
      const BASE_URL = import.meta.env.VITE_URL;

      // usuable functions
      const handleCity = (e) => {
            setCity(e.target.value);
      };

      const fetchData = async () => {
            if (!city || city.trim() === "") {
                  alert("Please enter a city name");
                  return;
            }

            const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;

            setLoading(true);
            try {
                  const res = await axios.get(url);
                  console.log(res.data);
                  setData(res.data);
            } catch (err) {
                  console.error("Error: " + err.response?.data?.message || err.message);
                  alert(err.response?.data?.message || "Something went wrong");
            } finally {
                  setLoading(false);
            }
      };


      const handleSubmit = () => {
            fetchData();
      }

      return (
      <div className="full-screen">
            <div className="weather">
                  <h1>Weather App</h1>
                  <h2>Weather in your city</h2>
            <div>
                  <input type="text" name="city" placeholder={inputPLaceholder} onChange={handleCity} />
                  <button className='btn' onClick={handleSubmit}>{loading ? "Loading .." : "submit"}</button>
            </div>

            <div>
                  <h3>Weather Details</h3>
                  <div className="flex">
                        <h4><FaCity /></h4>
                        {city ? <p>{city}</p> : <p>City</p>}
                  </div>

                  {data ? 
                        <>
                              <div className="flex">
                                    <h4><FaTemperatureFull /></h4>
                                    <p>{data && data.main && data.main.temp} &deg;C</p>
                              </div>

                              <div className="flex">
                                    <h4><WiHumidity /> </h4>
                                    <p>{data && data.main && data.main.humidity} g/kg</p>
                              </div>

                              <div className="flex">
                                    <h4><GiWhirlwind /> </h4>
                                    <p>{data && data.wind && data.wind.speed} km/h</p>
                              </div>
                        </>
                  : (
                        <p>Weather Details</p>
                  )}
            </div>


            </div>
      </div>
      )
}