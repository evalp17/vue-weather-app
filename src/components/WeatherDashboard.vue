<template>
  <section v-if="weather" :class="['weather-dashboard', backgroundClass]">
    <h2>{{ weather.locationName }}</h2>
    <p class="current-temp">{{ Math.round(weather.currentTemp) }}°</p>

    <p>
      High: {{ Math.round(weather.highTemp) }}° |
      Low: {{ Math.round(weather.lowTemp) }}°
    </p>

    <p class="condition">
      <img v-if="weather.iconUrl" :src="weather.iconUrl" alt="" />
      {{ weather.condition }}
    </p>
  </section>

  <section v-else class="weather-dashboard empty">
    <p>Search for a location to see the current weather.</p>
  </section>
</template>

<script>
export default {
  name: 'WeatherDashboard',
  props: {
    weather: {
      type: Object,
      default: null
    }
  },
  computed: {
    backgroundClass() {
      if (!this.weather) return ''
      const cond = this.weather.condition.toLowerCase()
      if (cond.includes('rain')) return 'bg-rainy'
      if (cond.includes('snow') || cond.includes('ice')) return 'bg-cold'
      if (cond.includes('clear') || cond.includes('sun')) return 'bg-clear'
      if (cond.includes('cloud')) return 'bg-cloudy'
      return 'bg-default'
    }
  }
}
</script>

<style scoped>
.weather-dashboard {
  padding: 1rem;
  border-radius: 8px;
  color: #ffffff;
  margin-bottom: 1rem;
  min-height: 200px;            /* so the background image is visible */
  background-size: cover;       /* scale image to fill */
  background-position: center;  /* center the image */
}

/* Each of these now uses a background image instead of a gradient */

.bg-clear {
  background-image: url('@/assets/bg-clear.jpg');
}

.bg-rainy {
  background-image: url('@/assets/bg-rainy.jpg');
}

.bg-cold {
  background-image: url('@/assets/bg-cold.jpg');
}

.bg-cloudy {
  background-image: url('@/assets/bg-cloudy.jpg');
}

.bg-default {
  background-image: url('@/assets/bg-default.jpg');
}

/* Optional empty state styling */
.weather-dashboard.empty {
  background: #f0f0f0;
  color: #333;
}
</style>

