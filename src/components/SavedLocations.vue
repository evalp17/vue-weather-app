<template>
  <section class="saved-locations">
    <h3>Saved Locations</h3>

    <div v-if="locations && locations.length">
      <ul>
        <li v-for="loc in locations" :key="loc">
          <button class="link" @click="$emit('select', loc)">
            {{ loc }}
          </button>
          <button class="delete" @click="$emit('delete', loc)">X</button>
        </li>
      </ul>
    </div>

    <p v-else>No saved locations yet.</p>
  </section>
</template>

<script>
export default {
  name: 'SavedLocations',
  props: {
    locations: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
.saved-locations {
  margin-top: 1rem;
}

.saved-locations ul {
  list-style: none;
  padding: 0;
}

.saved-locations li {
  margin: 0.25rem 0;
}

.link {
  background: none;
  border: none;
  color: #0077cc;
  cursor: pointer;
  margin-right: 0.5rem;
}

.delete {
  background: #cc0000;
  color: #fff;
  border: none;
  padding: 0.1rem 0.4rem;
  cursor: pointer;
}
</style>
