<template>
  <div class="forecast-view">
    <h1>5-Day Forecast</h1>

    <table v-if="forecast">
      <thead>
        <tr>
          <th>Date</th>
          <th>Condition</th>
          <th>High (°F)</th>
          <th>Low (°F)</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="day in forecast" :key="day.date">
          <td>{{ formatDate(day.date) }}</td>

          <td class="condition">
            <img
              :src="'https:' + day.day.condition.icon"
              alt=""
            />
            {{ day.day.condition.text }}
          </td>

          <td>{{ Math.round(day.day.maxtemp_f) }}</td>
          <td>{{ Math.round(day.day.mintemp_f) }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else>
      Search for a city on the Home page to see the 5-day forecast.
    </p>
  </div>
</template>

<script>
export default {
  name: 'FiveDayView',

  data() {
    return {
      forecast: null
    }
  },

  mounted() {
    this.forecast = window.fiveDayForecast
  },

  methods: {
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      })
    }
  }
}
</script>

<style scoped>
.forecast-view {
  max-width: 750px;
  margin: 1rem auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 0.5rem;
  text-align: center;
}

.condition img {
  width: 28px;
  vertical-align: middle;
  margin-right: 0.25rem;
}
</style>
