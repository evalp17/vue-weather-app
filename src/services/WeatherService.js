const API_KEY = '66a303a585a14ccbb9f70012250412' 
const BASE_URL = 'https://api.weatherapi.com/v1'

async function getCurrentWeather(location) {
  const url = `${BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(
    location
  )}&aqi=no`

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch current weather')
  }

  const data = await response.json()
  return data
}

async function getHourlyWeather(location) {
  // Uses forecast endpoint, 1 day, gives hourly data in forecast.forecastday[0].hour
  const url = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(
    location
  )}&days=1&aqi=no&alerts=no`

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch hourly weather')
  }

  const data = await response.json()
  return data
}

async function getFiveDayForecast(location) {
  const url = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(
    location
  )}&days=5&aqi=no&alerts=no`

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch 5-day forecast')
  }

  const data = await response.json()
  return data
}

export default {
  getCurrentWeather,
  getHourlyWeather,
  getFiveDayForecast
}
