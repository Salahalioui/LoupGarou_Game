<template>
  <div class="app-layout" :class="{ 'dark-mode': isDarkMode }">
    <header class="app-header">
      <div class="header-content">
        <h1 class="app-title">{{ $t("app.title") }}</h1>
        <nav class="app-nav">
          <button
            class="menu-toggle"
            @click="toggleMenu"
            aria-label="Toggle menu"
          >
            <i class="fas fa-bars"></i>
          </button>
          <ul class="nav-list" :class="{ 'nav-open': isMenuOpen }">
            <li v-for="(link, index) in navLinks" :key="index">
              <router-link :to="link.to" @click="closeMenu">{{
                $t(link.text)
              }}</router-link>
            </li>
          </ul>
        </nav>
        <div class="header-controls">
          <button
            class="dark-mode-toggle"
            @click="toggleDarkMode"
            aria-label="Toggle dark mode"
          >
            <i :class="isDarkMode ? 'fas fa-sun' : 'fas fa-moon'"></i>
          </button>
          <select v-model="$i18n.locale" class="language-select">
            <option value="en">English</option>
            <option value="ar-DZ">العربية</option>
            <option value="dz-DZ">Tamazight</option>
          </select>
        </div>
      </div>
    </header>
    <main class="app-main">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <footer class="app-footer">
      <p>&copy; {{ new Date().getFullYear() }} {{ $t("app.title") }}</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "AppLayout",
  data() {
    return {
      isDarkMode: false,
      isMenuOpen: false,
      navLinks: [
        { to: "/", text: "app.nav.home" },
        { to: "/roles", text: "app.nav.roles" },
        { to: "/players", text: "app.nav.players" },
        { to: "/game", text: "app.nav.game" },
        { to: "/about", text: "app.nav.about" },
      ],
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
  },
  mounted() {
    this.isDarkMode = localStorage.getItem("darkMode") === "true";
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: $background-color;
  color: $text-color;
  transition: background-color $transition-speed ease,
    color $transition-speed ease;
}

.app-header {
  background-color: $night-color;
  padding: $spacing-medium;
  box-shadow: $box-shadow;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: $max-width;
  margin: 0 auto;
}

.app-title {
  font-family: $font-family-heading;
  font-size: $font-size-xlarge;
  color: $moon-color;
  margin: 0;
}

.app-nav {
  display: flex;
  align-items: center;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  color: $moon-color;
  font-size: $font-size-large;
  cursor: pointer;
}

.nav-list {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;

  li {
    margin-left: $spacing-medium;
  }

  a {
    color: $moon-color;
    text-decoration: none;
    font-size: $font-size-normal;
    transition: color $transition-speed ease;

    &:hover,
    &.router-link-active {
      color: $accent-color;
    }
  }
}

.header-controls {
  display: flex;
  align-items: center;
}

.dark-mode-toggle {
  background: none;
  border: none;
  color: $moon-color;
  font-size: $font-size-large;
  cursor: pointer;
  margin-right: $spacing-small;
  transition: color $transition-speed ease;

  &:hover {
    color: $accent-color;
  }
}

.language-select {
  background-color: $wolf-color;
  color: $moon-color;
  border: none;
  padding: $spacing-xs $spacing-small;
  border-radius: $border-radius;
  font-size: $font-size-small;
  cursor: pointer;
}

.app-main {
  flex-grow: 1;
  padding: $spacing-large;
  max-width: $max-width;
  margin: 0 auto;
  width: 100%;
}

.app-footer {
  background-color: $night-color;
  color: $moon-color;
  text-align: center;
  padding: $spacing-medium;
  margin-top: auto;
}

// Dark mode styles
.dark-mode {
  background-color: darken($background-color, 5%);

  .app-header,
  .app-footer {
    background-color: darken($night-color, 5%);
  }
}

// Responsive styles
@media (max-width: $breakpoint-tablet) {
  .menu-toggle {
    display: block;
  }

  .nav-list {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: $night-color;
    flex-direction: column;
    padding: $spacing-medium;

    &.nav-open {
      display: flex;
    }

    li {
      margin: $spacing-small 0;
    }
  }
}

// Transition styles
.fade-enter-active,
.fade-leave-active {
  transition: opacity $transition-speed ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
