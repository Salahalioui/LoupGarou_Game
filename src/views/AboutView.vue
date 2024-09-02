<template>
  <div class="about-view">
    <h1>{{ $t("about.title") }}</h1>
    <section class="guide-section">
      <h2>{{ $t("about.guideTitle") }}</h2>
      <p>{{ $t("about.guideContent") }}</p>
    </section>
    <section class="feedback-section">
      <h2>{{ $t("about.feedbackTitle") }}</h2>
      <FeedbackFormComponent />
    </section>
  </div>
</template>

<script>
import FeedbackFormComponent from "@/components/FeedbackFormComponent.vue";

export default {
  name: "AboutView",
  components: {
    FeedbackFormComponent,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.about-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

.guide-section,
.feedback-section {
  margin-bottom: 2rem;
}

h1,
h2 {
  color: $primary-color;
}
</style>
