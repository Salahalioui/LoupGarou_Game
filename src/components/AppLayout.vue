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
}

.app-header {
  background-color: $primary-color;
  color: white;
  padding: 1rem;
  text-align: center;
}

.app-title {
  margin-bottom: 0.5rem;
}

.app-nav {
  margin-top: 1rem;
}

.nav-list {
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  li {
    margin: 0 0.5rem;
  }

  a {
    color: white;
    text-decoration: none;
    padding: 0.5rem;

    &:hover {
      text-decoration: underline;
    }
  }
}

.app-main {
  flex-grow: 1;
  padding: 1rem;
}

.app-footer {
  background-color: $text-color;
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
}
</style>
