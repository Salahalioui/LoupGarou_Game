<template>
  <div class="home-view">
    <div class="hero-section">
      <h1 class="hero-title">{{ $t("home.welcome") }}</h1>
      <p class="hero-subtitle">{{ $t("home.subtitle") }}</p>
    </div>
    <div class="features-section">
      <div class="feature-card">
        <i class="fas fa-users feature-icon"></i>
        <h3>{{ $t("home.features.managePlayers") }}</h3>
        <p>{{ $t("home.features.managePlayersDesc") }}</p>
      </div>
      <div class="feature-card">
        <i class="fas fa-theater-masks feature-icon"></i>
        <h3>{{ $t("home.features.assignRoles") }}</h3>
        <p>{{ $t("home.features.assignRolesDesc") }}</p>
      </div>
      <div class="feature-card">
        <i class="fas fa-hourglass-half feature-icon"></i>
        <h3>{{ $t("home.features.gameFlow") }}</h3>
        <p>{{ $t("home.features.gameFlowDesc") }}</p>
      </div>
    </div>
    <div class="cta-section">
      <router-link to="/game" class="btn btn-primary">
        {{ $t("home.startGame") }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.home-view {
  max-width: $max-width;
  margin: 0 auto;
  padding: $spacing-large;
  color: $text-color;
}

.hero-section {
  text-align: center;
  margin-bottom: $spacing-large;
  padding: $spacing-large;
  background-color: rgba($night-color, 0.8);
  border-radius: $border-radius;
  box-shadow: $box-shadow;
}

.hero-title {
  font-family: $font-family-heading;
  font-size: $font-size-xl * 1.5;
  color: $moon-color;
  margin-bottom: $spacing-medium;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.hero-subtitle {
  font-size: $font-size-lg;
  color: $accent-color;
  max-width: 600px;
  margin: 0 auto;
}

.features-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: $spacing-large;
  margin-bottom: $spacing-large;
}

.feature-card {
  background-color: rgba($wolf-color, 0.8);
  padding: $spacing-large;
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  text-align: center;
  transition: transform $transition-speed ease,
    box-shadow $transition-speed ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
}

.feature-icon {
  font-size: $font-size-xl * 1.5;
  color: $accent-color;
  margin-bottom: $spacing-medium;
}

.feature-card h3 {
  font-family: $font-family-heading;
  font-size: $font-size-lg;
  color: $moon-color;
  margin-bottom: $spacing-small;
}

.feature-card p {
  font-size: $font-size-normal;
  color: $text-color;
}

.cta-section {
  text-align: center;
  margin-top: $spacing-large;
}

.btn-primary {
  display: inline-block;
  font-size: $font-size-lg;
  padding: $spacing-medium $spacing-large;
  background-color: $secondary-color;
  color: $moon-color;
  border: none;
  border-radius: $border-radius;
  text-decoration: none;
  transition: background-color $transition-speed ease,
    transform $transition-speed ease;

  &:hover {
    background-color: darken($secondary-color, 10%);
    transform: scale(1.05);
  }
}

// Responsive styles
@media (max-width: $breakpoint-tablet) {
  .hero-title {
    font-size: $font-size-xl * 1.2;
  }

  .hero-subtitle {
    font-size: $font-size-normal;
  }

  .features-section {
    grid-template-columns: 1fr;
  }
}
</style>
