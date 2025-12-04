<template>
  <div class="home-view">
    <h1>Home</h1>
    <p>This will show current weather, backgrounds, and saved locations.</p>
  </div>
</template>

<script>
import WeatherService from '../services/WeatherService'

export default {
  name: 'HomeView',
  async mounted() {
    try {
      // Temporary hard-coded test location
      const location = 'Raleigh'
      console.log('Fetching weather for:', location)

      const current = await WeatherService.getCurrentWeather(location)
      console.log('Current weather:', current)

      const hourly = await WeatherService.getHourlyWeather(location)
      console.log('Hourly weather:', hourly)

      const fiveDay = await WeatherService.getFiveDayForecast(location)
      console.log('5-day forecast:', fiveDay)
    } catch (error) {
      console.error('Error fetching weather data:', error)
    }
  }
}
</script>

