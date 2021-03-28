import React, { useEffect, useState } from 'react';

function App() {
    let [s1, s2] = useState('');
    let [s3, s4] = useState({
        temp: '',
        min: '',
        max: '',
        humidity: '',
        type: '',
        wind_speed: '',
        feel: '',
        pressue: ''
    });
    function f1(e) {
        s2(e.target.value);
    }
    useEffect(() => {
        if (s1 != '') {
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${s1}&units=metric&appid=d8b9d22050bb6ab31f9d6ea2fd77a884`;
            fetch(url).then((response) => {
                return response.json();
            }).then((data) => {
                if (data.cod != '404') {
                    s4(() => {
                        return {
                            temp: data.main.temp,
                            min: data.main.temp_min,
                            max: data.main.temp_max,
                            humidity: data.main.humidity,
                            type: data.weather[0].main,
                            wind_speed: data.wind.speed,
                            feel: data.main.feels_like,
                            pressue: data.main.pressure
                        }
                    })
                }
            })
        }
    },[s1])
    console.log(s3)
    return (
        <>
            <input onChange={f1} type="text" placeholder='Enter City Name' />
            <div className="city">
                <img src="loc.svg" alt="location" />
                <h1>{s1}</h1>
            </div>
            {s1 === '' ? (<h3 style={{ marginBottom: '7vmin' }}>No Data found</h3>) : (
                <>
                    <div className="box">
                        <div className="box1">
                            <div className="temp">
                                <img src="temp.svg" alt="tempreature" />
                                <h2>{s3.temp}°C</h2>
                            </div>
                            <div className="span">
                                <span className="min"><img src="min.svg" alt="minimum" /> {s3.min}°C</span><span className="max"><img src="max.svg" alt="maximum" /> {s3.max}°C</span>
                            </div>
                        </div>
                        <div className="box2">
                            <div className="feel"><img src="feel.svg" alt="" /><p>Feels like <b>{s3.feel}°C</b></p></div>
                            <div className="type"><img src="fog.svg" alt="" /><b>{s3.type}</b></div>
                            <div className="humidity"><img src="humidity.svg" alt="" /><p> Humidity <b>{s3.humidity}</b></p> <span></span></div>
                        </div>
                    </div>
                    <div className="box11">
                        <span className="wind"><img src="wind.svg" alt="" /><p>Wind <b> {s3.wind_speed}</b></p></span><span className="pressure"><img src="pressure.svg" alt="" /><p>Pressure <b> {s3.pressue}</b></p></span>
                    </div>
                    <div className="ocean">
                        <div className="wave"></div>
                        <div className="wave"></div>
                    </div>
                </>)}



        </>
    )
}
export default App;