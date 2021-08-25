export default async function WeatherApi (city) {
    console.log("city", city)
        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7c4161e5bf58a767701a53b267e073ef`)
        let data = await res.json()
        console.log('data api.js->', data)
        return data
    }
