<template>
  <div class="role-popup" @click.self="$emit('close')">
    <div class="role-card">
      <div class="card-front" :class="{ flip: showBack }">
        <div class="card-content">
          <div class="card-frame">
            <img
              :src="role.image"
              :alt="$t(`roles.${role.id}.name`)"
              class="role-image"
            />
          </div>
          <div class="role-info">
            <h3 class="role-name">{{ $t(`roles.${role.id}.name`) }}</h3>
            <div class="role-type">{{ $t(`roles.${role.id}.type`) }}</div>
          </div>
        </div>
        <button class="flip-button" @click="showBack = true">
          <i class="fas fa-redo"></i>
        </button>
      </div>
      <div class="card-back" :class="{ flip: showBack }">
        <div class="card-content">
          <h3 class="role-name">{{ $t(`roles.${role.id}.name`) }}</h3>
          <p class="role-description">
            {{ $t(`roles.${role.id}.description`) }}
          </p>
          <div class="role-abilities">
            <h4>{{ $t("rolePopup.abilities") }}</h4>
            <ul v-if="roleAbilities && roleAbilities.length">
              <li v-for="(ability, index) in roleAbilities" :key="index">
                {{ ability }}
              </li>
            </ul>
            <p v-else>{{ $t("rolePopup.noAbilities") }}</p>
          </div>
        </div>
        <button class="flip-button" @click="showBack = false">
          <i class="fas fa-undo"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import enLocale from "@/locales/en.json";
import arDZLocale from "@/locales/ar-DZ.json";
import dzDZLocale from "@/locales/dz-DZ.json";

export default {
  name: "RolePopup",
  props: {
    role: {
      type: Object,
      required: true,
    },
  },
  computed: {
    roleAbilities() {
      const abilities = this.getAbilitiesFromLocale(this.role.id);
      return abilities;
    },
  },
  methods: {
    getAbilitiesFromLocale(roleId) {
      const locales = {
        en: enLocale,
        "ar-DZ": arDZLocale,
        "dz-DZ": dzDZLocale,
      };
      const currentLocale = this.$i18n.locale;
      return locales[currentLocale]?.roles[roleId]?.abilities || [];
    },
  },
  data() {
    return {
      showBack: false,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.role-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba($night-color, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.role-card {
  width: 300px;
  height: 450px;
  perspective: 1000px;
  cursor: pointer;
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  border-radius: $border-radius * 2;
  box-shadow: 0 0 20px rgba($accent-color, 0.5);
  overflow: hidden;
}

.card-front {
  background: linear-gradient(135deg, $wolf-color, $night-color);

  &.flip {
    transform: rotateY(180deg);
  }

  .card-content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .card-frame {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: $spacing-small;
    height: 80%; // Add this line
  }

  .role-image {
    width: 100%; // Change from 95% to 100%
    height: 100%; // Change from 95% to 100%
    object-fit: contain; // Change from cover to contain
    border-radius: $border-radius;
  }

  .role-info {
    padding: $spacing-small;
    background: rgba($night-color, 0.7);
    height: 20%; // Add this line
    display: flex; // Add this line
    flex-direction: column; // Add this line
    justify-content: center; // Add this line
  }

  .role-name {
    font-family: $font-family-heading;
    font-size: $font-size-large;
    color: $moon-color;
    text-align: center;
    margin-bottom: $spacing-small;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  .role-type {
    font-size: $font-size-small;
    color: $accent-color;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
}

.card-back {
  background: linear-gradient(135deg, $night-color, $wolf-color);
  transform: rotateY(180deg);

  &.flip {
    transform: rotateY(0deg);
  }

  .card-content {
    padding: $spacing-medium;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .role-name {
    font-family: $font-family-heading;
    font-size: $font-size-xlarge;
    color: $moon-color;
    text-align: center;
    margin-bottom: $spacing-small;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  .role-description {
    font-size: $font-size-normal;
    color: $text-color;
    margin-bottom: $spacing-medium;
    line-height: 1.4;
  }

  .role-abilities {
    h4 {
      font-family: $font-family-heading;
      font-size: $font-size-large;
      color: $accent-color;
      margin-bottom: $spacing-small;
    }

    ul {
      list-style-type: none;
      padding-left: $spacing-medium;

      li {
        color: $text-color;
        margin-bottom: $spacing-small;
        position: relative;

        &::before {
          content: "•";
          color: $accent-color;
          position: absolute;
          left: -$spacing-medium;
        }
      }
    }
  }
}

.flip-button {
  position: absolute;
  bottom: $spacing-small;
  right: $spacing-small;
  background: none;
  border: none;
  color: $accent-color;
  font-size: $font-size-large;
  cursor: pointer;
  transition: transform $transition-speed ease;

  &:hover {
    transform: scale(1.2);
  }
}
</style>
