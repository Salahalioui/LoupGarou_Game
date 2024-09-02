<template>
  <form @submit.prevent="submitFeedback" class="feedback-form">
    <div class="form-group">
      <label for="name">{{ $t("feedbackForm.name") }}</label>
      <input type="text" id="name" v-model="name" required />
    </div>
    <div class="form-group">
      <label for="email">{{ $t("feedbackForm.email") }}</label>
      <input type="email" id="email" v-model="email" required />
    </div>
    <div class="form-group">
      <label for="message">{{ $t("feedbackForm.message") }}</label>
      <textarea id="message" v-model="message" required></textarea>
    </div>
    <button type="submit" class="btn btn-primary">
      {{ $t("feedbackForm.submit") }}
    </button>
  </form>
</template>

<script>
export default {
  name: "FeedbackFormComponent",
  data() {
    return {
      name: "",
      email: "",
      message: "",
    };
  },
  methods: {
    submitFeedback() {
      // Handle form submission (e.g., send data to a server)
      console.log("Feedback submitted:", {
        name: this.name,
        email: this.email,
        message: this.message,
      });
      // Reset form fields
      this.name = "";
      this.email = "";
      this.message = "";
      alert(this.$t("feedbackForm.thankYou"));
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.feedback-form {
  background-color: white;
  border-radius: $border-radius;
  padding: 1rem;
  box-shadow: $box-shadow;
}

.form-group {
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
  }

  input,
  textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid $text-color;
    border-radius: $border-radius;
  }

  textarea {
    height: 100px;
  }
}

button {
  width: 100%;
}
</style>
