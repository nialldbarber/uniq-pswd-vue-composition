<script setup lang="ts">
import {ref, computed} from 'vue';
import {generatePassword} from './utils/password';
import {handleBackgroundChange} from './utils/background';
import * as bgStyles from './styles/background.css';
import * as headingStyles from './styles/typography.css';
import battery from './assets/battery_charging_full_black_24dp.svg';
import verified from './assets/verified_user_black_24dp.svg';
import error from './assets/error_outline_black_24dp.svg';
import warning from './assets/warning_black_24dp.svg';

const range = ref<number>(12);
const letter = ref<boolean>(true);
const number = ref<boolean>(true);
const symbol = ref<boolean>(false);

const generatedPassword = computed<string>(() =>
  generatePassword(range.value, letter.value, number.value, symbol.value)
);

const background = computed<string>(() => handleBackgroundChange(range.value));

type RecStr = Record<string, string>;

const PASSWORD_STRENGTH: RecStr = {
  mega: 'Mega',
  good: 'Strong',
  medium: 'Fairly strong',
  bad: 'Weak',
};

const PASSWORD_STRENGTH_LOGO: RecStr = {
  mega: battery,
  good: verified,
  medium: error,
  bad: warning,
};

const PASSWORD_DETAILS: RecStr = {
  mega: 'This is a MEGA password, give up hackers',
  good: "This is a strong password, you'll be well protected using this",
  medium:
    "This is a fairly strong password, you'll be relatively well protected using this",
  bad: "This is a weak password, you'll be vulnerable to attacks",
};

const FALLBACK = 'No password is a bad password 😡';
</script>

<template>
  <div :class="bgStyles.backgroundVariant[background]">
    <div :class="bgStyles.mainBackground">
      <p :class="headingStyles.heading">{{ generatedPassword || FALLBACK }}</p>

      <p
        :class="headingStyles.subheader"
        title="{PASSWORD_DETAILS[background]}"
      >
        <img :src="PASSWORD_STRENGTH_LOGO[background]" alt="" />
        <span
          :class="headingStyles.labelStrength"
          :title="PASSWORD_DETAILS[background]"
        >
          {{ PASSWORD_STRENGTH[background] }} password
        </span>
      </p>

      <input type="range" min="0" max="40" v-model="range" />
      <p>Length ({{ range }})</p>
      <div>
        <button @click="letter = !letter">Letters (e.g. Aa)</button>
        <button @click="number = !number">Digits (e.g. 345)</button>
        <button @click="symbol = !symbol">Symbols (@&$!#?)</button>
      </div>
    </div>
  </div>
</template>
