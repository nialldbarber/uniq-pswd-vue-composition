<script setup lang="ts">
import {ref, computed} from 'vue';
import {generatePassword} from './utils/password';
import {handleBackgroundChange} from './utils/background';
import {backgroundVariant} from './styles/background.css';

const range = ref<number>(12);
const letter = ref<boolean>(true);
const number = ref<boolean>(true);
const symbol = ref<boolean>(false);

const generatedPassword = computed<string>(() =>
  generatePassword(range.value, letter.value, number.value, symbol.value)
);

const background = computed<string>(() => handleBackgroundChange(range.value));
</script>

<template>
  <div :class="backgroundVariant[background]">
    <p>{{ generatedPassword }}</p>
    <input type="range" min="0" max="40" v-model="range" />
    <p>Length ({{ range }})</p>
    <div>
      <button @click="letter = !letter">Letters (e.g. Aa)</button>
      <button @click="number = !number">Digits (e.g. 345)</button>
      <button @click="symbol = !symbol">Symbols (@&$!#?)</button>
    </div>
  </div>
</template>
