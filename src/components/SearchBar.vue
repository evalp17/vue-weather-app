<template>
  <form class="search-bar" @submit.prevent="submitSearch">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Enter a city or location"
    />
    <button type="submit">Search</button>
  </form>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    submitSearch() {
      const trimmed = this.searchQuery.trim()
      if (!trimmed) return
      this.$emit('search', trimmed)
    }
  }
}
</script>

<style scoped>
.search-bar {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.search-bar input {
  padding: 0.4rem 0.6rem;
}

.search-bar button {
  padding: 0.4rem 0.8rem;
}
</style>
