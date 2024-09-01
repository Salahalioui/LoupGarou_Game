<template>
  <div id="app" :class="{ 'dark-mode': isDarkMode, rtl: isRTL }">
    <header class="app-header">
      <h1 class="app-title">{{ $t("app.title") }}</h1>
      <button @click="toggleMenu" class="menu-toggle">
        <i class="fas fa-bars"></i>
      </button>
      <nav class="app-nav" :class="{ 'nav-open': isMenuOpen }">
        <router-link to="/" class="nav-link" @click="closeMenu">{{
          $t("app.nav.home")
        }}</router-link>
        <router-link to="/roles" class="nav-link" @click="closeMenu">{{
          $t("app.nav.roles")
        }}</router-link>
        <router-link to="/players" class="nav-link" @click="closeMenu">{{
          $t("app.nav.players")
        }}</router-link>
        <router-link to="/game" class="nav-link" @click="closeMenu">{{
          $t("app.nav.game")
        }}</router-link>
      </nav>
      <button @click="toggleDarkMode" class="dark-mode-toggle">
        {{ isDarkMode ? "☀️" : "🌙" }}
      </button>
      <select
        v-model="$i18n.locale"
        @change="updateDirection"
        class="language-select"
      >
        <option value="en">English</option>
        <option value="ar-DZ">العربية (الجزائر)</option>
      </select>
    </header>
    <main class="app-main">
      <router-view></router-view>
    </main>
    <footer class="app-footer">
      <p>&copy; 2023 {{ $t("app.title") }}</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isDarkMode: false,
      isMenuOpen: false,
      isRTL: false,
    };
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem("darkMode", this.isDarkMode);
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
    updateDirection() {
      this.isRTL = this.$i18n.locale === "ar-DZ";
      document.documentElement.dir = this.isRTL ? "rtl" : "ltr";
    },
  },
  mounted() {
    this.isDarkMode = localStorage.getItem("darkMode") === "true";
    this.updateDirection();
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
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-title {
  font-size: 1.2rem;
  margin: 0;
}

.menu-toggle {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

.app-nav {
  position: fixed;
  top: 60px;
  left: -100%;
  width: 100%;
  height: calc(100vh - 60px);
  background-color: $primary-color;
  transition: left 0.3s ease;
  display: flex;
  flex-direction: column;
  padding: 1rem;

  &.nav-open {
    left: 0;
  }
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  margin: 0.25rem 0;
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
  max-width: 100%;
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
    font-size: 1.5rem;
  }

  .menu-toggle {
    display: none;
  }

  .app-nav {
    position: static;
    height: auto;
    flex-direction: row;
    padding: 0;
    background-color: transparent;
  }

  .nav-link {
    margin: 0 0.5rem;
  }

  .app-main {
    max-width: 800px;
    padding: 2rem;
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

.language-select {
  margin-left: 1rem;
  padding: 0.25rem;
  background-color: white;
  border: 1px solid $primary-color;
  border-radius: $border-radius;
  color: $text-color;
}

.rtl {
  direction: rtl;
  text-align: right;

  .app-header {
    flex-direction: row-reverse;
  }

  .app-nav {
    left: auto;
    right: -100%;

    &.nav-open {
      left: auto;
      right: 0;
    }
  }

  .language-select {
    margin-left: 1rem;
    padding: 0.25rem;
    background-color: white;
    border: 1px solid $primary-color;
    border-radius: $border-radius;
    color: $text-color;
  }
}
</style>
