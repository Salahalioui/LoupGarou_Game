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
      </div>
      <div class="feature-card">
        <i class="fas fa-theater-masks feature-icon"></i>
        <h3>{{ $t("home.features.assignRoles") }}</h3>
      </div>
      <div class="feature-card">
        <i class="fas fa-hourglass-half feature-icon"></i>
        <h3>{{ $t("home.features.gameFlow") }}</h3>
      </div>
    </div>
    <div class="cta-section">
      <router-link to="/game" class="btn btn-primary">{{
        $t("home.startGame")
      }}</router-link>
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
  max-width: 800px;
  margin: 0 auto;
  padding: $spacing-large;
  color: $text-color;
}

.hero-section {
  margin-bottom: $spacing-large;
  padding: $spacing-large;
  background-color: $night-color;
  color: $moon-color;
  border-radius: $border-radius;
  box-shadow: $box-shadow;
}

.hero-title {
  font-size: $font-size-xlarge;
  margin-bottom: $spacing-medium;
}

.hero-subtitle {
  font-size: $font-size-large;
  opacity: 0.8;
}

.features-section {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-large;
  margin-bottom: $spacing-large;
}

.feature-card {
  background-color: $wolf-color;
  padding: $spacing-large;
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  transition: transform $transition-speed ease;

  &:hover {
    transform: translateY(-5px);
  }
}

.feature-icon {
  font-size: 2.5rem;
  color: $accent-color;
  margin-bottom: $spacing-medium;
}

.cta-section {
  margin-top: $spacing-large;
}

.btn-primary {
  font-size: $font-size-large;
  padding: $spacing-medium $spacing-large;
  width: 100%;
  max-width: 300px;
  background-color: $secondary-color;
  color: $text-color;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;
  transition: background-color $transition-speed ease;

  &:hover {
    background-color: darken($secondary-color, 10%);
  }
}

// Responsive styles
@media (min-width: $breakpoint-tablet) {
  .hero-title {
    font-size: 2.5rem;
  }

  .features-section {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
