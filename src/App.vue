<template>
  <div id="app" :class="{ 'dark-mode': isDarkMode }">
    <header class="app-header">
      <h1 class="app-title">Werewolf Moderator</h1>
      <nav class="app-nav">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/roles" class="nav-link">Roles</router-link>
        <router-link to="/players" class="nav-link">Players</router-link>
        <router-link to="/game" class="nav-link">Game</router-link>
      </nav>
      <button @click="toggleDarkMode" class="dark-mode-toggle">
        {{ isDarkMode ? "☀️" : "🌙" }}
      </button>
    </header>
    <main class="app-main">
      <router-view></router-view>
    </main>
    <footer class="app-footer">
      <p>&copy; 2023 Werewolf Moderator</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isDarkMode: false,
    };
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem("darkMode", this.isDarkMode);
    },
  },
  mounted() {
    this.isDarkMode = localStorage.getItem("darkMode") === "true";
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/variables.scss";

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: $text-color;
  background-color: $background-color;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  background-color: $primary-color;
  color: white;
  padding: 1rem;
  text-align: center;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.app-title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.app-nav {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  margin: 0.25rem;
  border-radius: $border-radius;
  transition: background-color 0.3s ease;

  &:hover,
  &.router-link-active {
    background-color: darken($primary-color, 10%);
  }
}

.app-main {
  flex-grow: 1;
  padding: 1rem;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}

.app-footer {
  background-color: $text-color;
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
}

.dark-mode-toggle {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
}

// Dark mode styles
.dark-mode {
  background-color: #121212;
  color: #ffffff;

  .app-header {
    background-color: #1f1f1f;
  }

  .app-footer {
    background-color: #1f1f1f;
  }

  .nav-link {
    &:hover,
    &.router-link-active {
      background-color: #2c2c2c;
    }
  }
}

// Responsive styles
@media (min-width: $breakpoint-tablet) {
  .app-title {
    font-size: 2rem;
  }

  .app-nav {
    margin-top: 1rem;
  }

  .nav-link {
    font-size: 1.1rem;
  }
}

// Common component styles
.card {
  background-color: white;
  border-radius: $border-radius;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  margin-bottom: 1rem;
}

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: $primary-color;
  color: white;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darken($primary-color, 10%);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
}

.form-group {
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: $border-radius;
    font-size: 1rem;
  }
}
</style>
