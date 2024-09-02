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
  text-align: center;
}

.hero-section {
  margin-bottom: 2rem;
  padding: 2rem 1rem;
  background-color: $primary-color;
  color: white;
  border-radius: $border-radius;
}

.hero-title {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.1rem;
  opacity: 0.8;
}

.features-section {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
}

.feature-card {
  background-color: white;
  padding: 1.5rem;
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
}

.feature-icon {
  font-size: 2.5rem;
  color: $primary-color;
  margin-bottom: 1rem;
}

.cta-section {
  margin-top: 2rem;
}

.btn-primary {
  font-size: 1.2rem;
  padding: 0.75rem 1.5rem;
  width: 100%;
  max-width: 300px;
}

// Dark mode styles
:global(.dark-mode) {
  .hero-section {
    background-color: lighten($text-color, 10%);
  }

  .feature-card {
    background-color: lighten($text-color, 5%);
    color: white;
  }

  .feature-icon {
    color: $secondary-color;
  }
}

// Responsive styles
@media (min-width: $breakpoint-tablet) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.3rem;
  }

  .features-section {
    grid-template-columns: repeat(3, 1fr);
  }

  .btn-primary {
    width: auto;
  }
}
</style>
