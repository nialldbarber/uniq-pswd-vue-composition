<script setup lang="ts">
import {ref, computed} from 'vue';
import {generatePassword} from './utils/password';
import {handleBackgroundChange} from './utils/background';
import {copyToClipboard} from './utils/copy-to-clipboard';
import Checkbox from './components/Checkbox/Checkbox.vue';
import * as bgStyles from './styles/background.css';
import * as headingStyles from './styles/typography.css';
import * as inputStyles from './styles/input.css';
import * as buttonStyles from './styles/button.css';
import * as popupStyles from './styles/popup.css';
import battery from './assets/battery.svg';
import verified from './assets/verified-user.svg';
import error from './assets/error.svg';
import warning from './assets/warning.svg';

type RecStr = Record<string, string>;

const range = ref<number>(12);
const letter = ref<boolean>(true);
const number = ref<boolean>(true);
const symbol = ref<boolean>(false);

const isCopied = ref<boolean>(false);
const pwLength = ref<boolean>(true);

const generatedPassword = computed<string>(() =>
  generatePassword(range.value, letter.value, number.value, symbol.value)
);

const background = computed<string>(() => handleBackgroundChange(range.value));

const linearGrad = computed<string>(
  () =>
    `linear-gradient(to right, rgb(255, 255, 255) ${
      (range.value as any) * 2.5
    }%, rgba(255, 255, 255, 0.4) 0%)`
);

const opacity = computed<number>(() => (pwLength.value ? 1 : 0));

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

function setCopied() {
  isCopied.value = true;
  setTimeout(() => {
    isCopied.value = false;
  }, 1000);
}

function toggleType(type: any) {
  return !type.value;
}
</script>

<template>
  <div
    :class="[
      bgStyles.backgroundVariant[background],
      bgStyles.backgroundContainer,
    ]"
  >
    <div :class="bgStyles.mainBackground">
      <p :class="headingStyles.heading">{{ generatedPassword || FALLBACK }}</p>

      <p :class="headingStyles.subheader" :title="PASSWORD_DETAILS[background]">
        <img
          :src="PASSWORD_STRENGTH_LOGO[background]"
          :alt="PASSWORD_STRENGTH_LOGO[background]"
        />
        <span
          :class="headingStyles.labelStrength"
          :title="PASSWORD_DETAILS[background]"
        >
          {{ PASSWORD_STRENGTH[background] }} password
        </span>
      </p>

      <input
        type="range"
        id="range"
        :class="inputStyles.input"
        :style="{background: linearGrad}"
        min="0"
        max="40"
        v-model="range"
      />
      <label :class="headingStyles.label" :style="{opacity}" for="range">
        Length ({{ range }})
      </label>
      <div :class="bgStyles.buttonBackground">
        <Checkbox
          id="letters"
          :type="letter"
          label="Letters (e.g. Aa)"
          :action="(letter = !letter)"
        />
        <div :class="headingStyles.buttonText">
          <input
            type="checkbox"
            :checked="number"
            id="numbers"
            @click="number = !number"
          />
          <label for="numbers" :class="headingStyles.labelText"
            >Digits (e.g. 345)</label
          >
        </div>
        <div :class="headingStyles.buttonText">
          <input
            type="checkbox"
            :checked="symbol"
            id="symbols"
            @click="symbol = !symbol"
          />
          <label for="symbols" :class="headingStyles.labelText"
            >Symbols (@&$!#?)</label
          >
        </div>
      </div>
      <button
        :class="buttonStyles.button"
        @click="[copyToClipboard(generatedPassword), setCopied()]"
        title="Copy password"
      >
        Copy password
      </button>
      <div v-if="isCopied" :class="popupStyles.popup">Copied</div>
    </div>
  </div>
</template>
