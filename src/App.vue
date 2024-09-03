<template>
  <div id="app" :class="{ 'dark-mode': isDarkMode, rtl: isRTL }">
    <header class="app-header">
      <div class="header-content">
        <h1 class="app-title">{{ $t("app.title") }}</h1>
        <div class="header-controls">
          <button
            @click="toggleDarkMode"
            class="icon-btn dark-mode-toggle"
            :title="isDarkMode ? 'Light Mode' : 'Dark Mode'"
          >
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
          <button
            @click="toggleMenu"
            class="icon-btn menu-toggle"
            :aria-expanded="isMenuOpen"
          >
            <span class="sr-only">Toggle Menu</span>
            <i class="fas fa-bars"></i>
          </button>
        </div>
      </div>
    </header>
    <nav class="app-nav" :class="{ 'nav-open': isMenuOpen }">
      <router-link
        v-for="(link, index) in navLinks"
        :key="index"
        :to="link.to"
        class="nav-link"
        @click="closeMenu"
      >
        {{ $t(link.text) }}
      </router-link>
    </nav>
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
      // Remove isRTL from here
      navLinks: [
        { to: "/", text: "app.nav.home" },
        { to: "/roles", text: "app.nav.roles" },
        { to: "/players", text: "app.nav.players" },
        { to: "/game", text: "app.nav.game" },
        { to: "/about", text: "app.nav.about" },
      ],
    };
  },
  computed: {
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
  font-family: $font-family-base;
  font-size: $font-size-base;
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
  background-color: $night-color;
  color: $moon-color;
  padding: $spacing-sm;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: $max-width;
  margin: 0 auto;
  width: 100%;
}

.app-title {
  font-size: $font-size-lg;
  margin: 0;
}

.header-controls {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
}

.icon-btn {
  background: none;
  border: none;
  color: $moon-color;
  font-size: $font-size-base;
  cursor: pointer;
  padding: $spacing-xs;
}

.language-select {
  padding: $spacing-xs;
  background-color: rgba($wolf-color, 0.3);
  border: 1px solid $accent-color;
  border-radius: $border-radius;
  color: $moon-color;
  font-size: $font-size-sm;
}

.app-nav {
  background-color: rgba($night-color, 0.95);
  position: fixed;
  top: 60px;
  left: -100%;
  width: 100%;
  height: calc(100vh - 60px);
  transition: left 0.3s ease;
  display: flex;
  flex-direction: column;
  padding: $spacing-md;
  z-index: 999;

  &.nav-open {
    left: 0;
  }
}

.nav-link {
  color: $moon-color;
  text-decoration: none;
  padding: $spacing-sm;
  margin-bottom: $spacing-sm;
  border-radius: $border-radius;
  transition: background-color 0.2s ease;

  &:hover,
  &.router-link-active {
    background-color: rgba($wolf-color, 0.5);
  }
}

.app-main {
  flex-grow: 1;
  padding: $spacing-md;
  max-width: $max-width;
  margin: 0 auto;
  width: 100%;
}

.app-footer {
  background-color: $night-color;
  color: $moon-color;
  text-align: center;
  padding: $spacing-sm;
  margin-top: auto;
}

// Dark mode styles
.dark-mode {
  background-color: darken($background-color, 10%);
  color: $moon-color;

  .app-header,
  .app-footer {
    background-color: darken($night-color, 5%);
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

  .header-content {
    flex-direction: row-reverse;
  }

  .header-controls {
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
}

// Responsive styles
@media (min-width: $breakpoint-sm) {
  .app-header {
    padding: $spacing-md;
  }

  .app-title {
    font-size: $font-size-xl;
  }

  .app-nav {
    position: static;
    height: auto;
    flex-direction: row;
    justify-content: center;
    padding: $spacing-sm;
    background-color: darken($night-color, 5%);

    &.nav-open {
      left: auto;
      right: auto;
    }
  }

  .nav-link {
    margin-bottom: 0;
    margin-right: $spacing-sm;
  }

  .menu-toggle {
    display: none;
  }
}

@media (min-width: $breakpoint-md) {
  .app-main {
    padding: $spacing-lg;
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
