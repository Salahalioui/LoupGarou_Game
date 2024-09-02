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
        <router-link to="/about" class="nav-link" @click="closeMenu">{{
          $t("app.nav.about")
        }}</router-link>
        <!-- New link -->
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
        <option value="dz-DZ">الدارجة</option>
      </select>
    </header>
    <main class="app-main">
      <router-view></router-view>
    </main>
    <footer class="app-footer">
      <p>&copy; {{ new Date().getFullYear() }} {{ $t("app.title") }}</p>
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
  computed: {
    // eslint-disable-next-line vue/no-dupe-keys
    isRTL() {
      return this.$i18n.locale === "ar-DZ" || this.$i18n.locale === "dz-DZ";
    },
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
      this.isRTL =
        this.$i18n.locale === "ar-DZ" || this.$i18n.locale === "dz-DZ";
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
  font-size: $font-size-normal;
  line-height: 1.5;
  color: $text-color;
  background-color: $background-color;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  z-index: 1;
}

#app::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("@/assets/images/background.jpg") no-repeat center center
    fixed;
  background-size: cover;
  opacity: 0.6;
  z-index: -1;
}

.app-header {
  background-color: rgba($night-color, 0.9);
  color: $moon-color;
  padding: $spacing-medium;
  text-align: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.app-title {
  font-size: $font-size-xlarge;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.menu-toggle {
  background: none;
  border: none;
  color: $moon-color;
  font-size: $font-size-large;
  cursor: pointer;
}

.app-nav {
  position: fixed;
  top: 60px;
  left: -100%;
  width: 100%;
  height: calc(100vh - 60px);
  background-color: rgba($night-color, 0.95);
  transition: left $transition-speed ease;
  display: flex;
  flex-direction: column;
  padding: $spacing-medium;

  &.nav-open {
    left: 0;
  }
}

.nav-link {
  color: $moon-color;
  text-decoration: none;
  padding: $spacing-small $spacing-medium;
  margin: $spacing-small 0;
  border-radius: $border-radius;
  transition: background-color $transition-speed ease;

  &:hover,
  &.router-link-active {
    background-color: rgba($wolf-color, 0.5);
  }
}

.app-main {
  flex-grow: 1;
  padding: $spacing-large;
  max-width: 100%;
  margin: 0 auto;
  width: 100%;
}

.app-footer {
  background-color: rgba($night-color, 0.9);
  color: $moon-color;
  text-align: center;
  padding: $spacing-medium;
  margin-top: auto;
}

.dark-mode-toggle {
  background: none;
  border: none;
  color: $moon-color;
  font-size: $font-size-large;
  cursor: pointer;
}

.language-select {
  margin-left: $spacing-medium;
  padding: $spacing-small;
  background-color: rgba($wolf-color, 0.3);
  border: 1px solid $accent-color;
  border-radius: $border-radius;
  color: $moon-color;
}

// Dark mode styles
.dark-mode {
  background-color: darken($background-color, 10%);
  color: $moon-color;

  .app-header {
    background-color: rgba(darken($night-color, 5%), 0.9);
  }

  .app-footer {
    background-color: rgba(darken($night-color, 5%), 0.9);
  }

  .nav-link {
    &:hover,
    &.router-link-active {
      background-color: rgba(lighten($wolf-color, 10%), 0.5);
    }
  }
}

// RTL styles
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
    margin-left: 0;
    margin-right: $spacing-medium;
  }
}

// Responsive styles
@media (min-width: $breakpoint-tablet) {
  .app-title {
    font-size: 2rem;
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
    margin: 0 $spacing-small;
  }

  .app-main {
    max-width: 800px;
    padding: $spacing-large;
  }
}

// Common component styles
.card {
  background-color: rgba($wolf-color, 0.8);
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  padding: $spacing-medium;
  margin-bottom: $spacing-medium;
}

.btn {
  display: inline-block;
  padding: $spacing-small $spacing-medium;
  background-color: $primary-color;
  color: $moon-color;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;
  transition: background-color $transition-speed ease;

  &:hover {
    background-color: darken($primary-color, 10%);
  }

  &:disabled {
    background-color: lighten($night-color, 20%);
    cursor: not-allowed;
  }
}

.form-group {
  margin-bottom: $spacing-medium;

  label {
    display: block;
    margin-bottom: $spacing-small;
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: $spacing-small;
    border: 1px solid $accent-color;
    border-radius: $border-radius;
    font-size: $font-size-normal;
    background-color: rgba($night-color, 0.3);
    color: $moon-color;
  }
}
</style>
