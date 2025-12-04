<template>
  <div class="hourly-view">
    <h1>Hourly Forecast</h1>

    <div v-if="chartData" class="chart-wrapper">
      <Line
        :data="chartData"
        :options="chartOptions"
      />
    </div>

    <p v-else>
      Search for a city on the Home page to load chart data.
    </p>
  </div>
</template>


<script>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip
)

export default {
  name: 'HourlyView',
  components: { Line },

  data() {
    return {
      chartData: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },

  mounted() {
    // TEMP — pull hourly data from window until shared state is wired next
    const hourly = window.hourlyForecast

    if (!hourly) return

    const labels = hourly.map(h =>
      new Date(h.time).toLocaleTimeString([], { hour: '2-digit' })
    )

    const temps = hourly.map(h => h.temp_f)
    const rain = hourly.map(h => h.precip_mm)

    this.chartData = {
      labels,
      datasets: [
        {
          label: 'Temperature (°F)',
          data: temps,
          borderWidth: 2,
          tension: 0.4
        },
        {
          label: 'Rain (mm)',
          data: rain,
          borderWidth: 2
        }
      ]
    }
  }
}
</script>

<style scoped>
.hourly-view {
  max-width: 700px;
  margin: 1rem auto;
}

/* New container to control chart size */
.chart-wrapper {
  position: relative;
  width: 100%;
  height: 400px; /* you can tweak this */
}

/* Remove the old canvas min-height rule */

</style>
