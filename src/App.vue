<template>
  <div id="app">
    <header>
      <h1>Vue Weather App</h1>
      <nav>
        <router-link to="/">Home</router-link>
        |
        <router-link to="/hourly">Hourly</router-link>
        |
        <router-link to="/forecast">5-Day Forecast</router-link>
      </nav>
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* Very simple layout, you can style later */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
}

header {
  padding: 1rem;
  border-bottom: 1px solid #ccc;
}

nav a {
  margin: 0 0.5rem;
}
</style>
