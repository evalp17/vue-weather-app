<template>
  <div class="home-view">
    <SearchBar @search="handleSearch" />

    <WeatherDashboard :weather="currentWeather" />

    <button
      v-if="currentLocation"
      class="save-btn"
      @click="saveCurrentLocation"
    >
      Save "{{ currentLocation }}" to locations
    </button>

    <SavedLocations
      :locations="savedLocations"
      @select="handleSelectSaved"
      @delete="handleDeleteSaved"
    />
  </div>
</template>

<script>
import WeatherService from '../services/WeatherService'
import SearchBar from '../components/SearchBar.vue'
import WeatherDashboard from '../components/WeatherDashboard.vue'
import SavedLocations from '../components/SavedLocations.vue'

export default {
  name: 'HomeView',
  components: {
    SearchBar,
    WeatherDashboard,
    SavedLocations
  },
  data() {
    return {
      currentLocation: '',
      currentWeather: null,
      hourlyData: null,
      fiveDayForecast: null,
      savedLocations: []
    }
  },
  mounted() {
    this.loadSavedLocations()
  },
  methods: {
    async handleSearch(location) {
      this.currentLocation = location
      await this.fetchWeatherForLocation(location)
    },

    async handleSelectSaved(location) {
      this.currentLocation = location
      await this.fetchWeatherForLocation(location)
    },

    async fetchWeatherForLocation(location) {
      try {
        const current = await WeatherService.getCurrentWeather(location)
        const hourly = await WeatherService.getHourlyWeather(location)
        const fiveDay = await WeatherService.getFiveDayForecast(location)

        // Normalize data to match your SDD structure
        this.currentWeather = {
          locationName: current.location.name,
          currentTemp: current.current.temp_f, // or temp_c
          highTemp: fiveDay.forecast.forecastday[0].day.maxtemp_f,
          lowTemp: fiveDay.forecast.forecastday[0].day.mintemp_f,
          condition: current.current.condition.text,
          iconUrl: 'https:' + current.current.condition.icon
        }

        this.hourlyData = hourly.forecast.forecastday[0].hour
        this.fiveDayForecast = fiveDay.forecast.forecastday

        // For now we'll just log them; later used by HourlyView/FiveDayView
        console.log('Hourly data:', this.hourlyData)
        console.log('5-day forecast:', this.fiveDayForecast)
      } catch (error) {
        console.error('Error fetching weather:', error)
        alert('Could not fetch weather for that location. Please try again.')
      }
    },

    loadSavedLocations() {
      const stored = localStorage.getItem('savedLocations')
      if (stored) {
        try {
          this.savedLocations = JSON.parse(stored)
        } catch {
          this.savedLocations = []
        }
      }
    },

    saveCurrentLocation() {
      const loc = this.currentLocation?.trim()
      if (!loc) return
      if (!this.savedLocations.includes(loc)) {
        this.savedLocations.push(loc)
        this.persistSavedLocations()
      }
    },

    handleDeleteSaved(location) {
      this.savedLocations = this.savedLocations.filter(
        (loc) => loc !== location
      )
      this.persistSavedLocations()
    },

    persistSavedLocations() {
      localStorage.setItem(
        'savedLocations',
        JSON.stringify(this.savedLocations)
      )
    }
  }
}
</script>

<style scoped>
.home-view {
  max-width: 600px;
  margin: 1rem auto;
  text-align: center;
}

.save-btn {
  margin-top: 0.5rem;
  padding: 0.4rem 0.8rem;
}
</style>
