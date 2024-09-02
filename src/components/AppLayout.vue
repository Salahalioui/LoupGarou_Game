<template>
  <div class="app-layout">
    <header class="app-header">
      <h1 class="app-title">Werewolf Moderator</h1>
      <nav class="app-nav">
        <ul class="nav-list">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/roles">Roles</router-link></li>
          <li><router-link to="/players">Players</router-link></li>
          <li><router-link to="/game">Game</router-link></li>
        </ul>
      </nav>
    </header>
    <main class="app-main">
      <router-view></router-view>
    </main>
    <footer class="app-footer">
      <p>&copy; 2024 Werewolf Moderator</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "AppLayout",
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
}

.app-header {
  background-color: $night-color;
  color: $moon-color;
  padding: $spacing-medium;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.app-title {
  font-size: $font-size-xlarge;
  margin-bottom: $spacing-small;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.app-nav {
  margin-top: $spacing-medium;
}

.nav-list {
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  li {
    margin: 0 $spacing-small;
  }

  a {
    color: $text-color;
    text-decoration: none;
    padding: $spacing-small;
    border-radius: $border-radius;
    transition: background-color $transition-speed ease,
      color $transition-speed ease;

    &:hover {
      background-color: $wolf-color;
      color: $moon-color;
    }

    &.router-link-active {
      background-color: $primary-color;
      color: $moon-color;
    }
  }
}

.app-main {
  flex-grow: 1;
  padding: $spacing-large;
  background-image: url("@/assets/images/werewolf-background.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.app-footer {
  background-color: $night-color;
  color: $text-color;
  text-align: center;
  padding: $spacing-medium;
  margin-top: auto;
}

// Dark mode styles
:global(.dark-mode) {
  .app-layout {
    background-color: darken($background-color, 10%);
  }

  .app-header {
    background-color: darken($night-color, 5%);
  }

  .nav-list {
    a {
      &:hover {
        background-color: lighten($wolf-color, 10%);
      }

      &.router-link-active {
        background-color: lighten($primary-color, 10%);
      }
    }
  }

  .app-footer {
    background-color: darken($night-color, 5%);
  }
}

// Responsive styles
@media (min-width: $breakpoint-tablet) {
  .app-title {
    font-size: 2.5rem;
  }

  .nav-list {
    li {
      margin: 0 $spacing-medium;
    }

    a {
      padding: $spacing-small $spacing-medium;
    }
  }
}
</style>
