<script setup lang="ts">
import {ref, computed} from 'vue';
import {generatePassword} from './utils/password';
import Slider from './components/Slider/Slider.vue';

const range = ref<number>(12);
const letter = ref<boolean>(true);
const number = ref<boolean>(true);
const symbol = ref<boolean>(false);
const password = ref<string>('');

// count: number,
// letter: boolean = true,
// number: boolean = true,
// symbol: boolean = false

const $password = computed(() =>
  generatePassword(range.value, letter.value, number.value, symbol.value)
);
</script>

<template>
  <p>{{ $password }}</p>
  <input type="range" min="0" max="40" v-model="range" />
  <p>{{ range }}</p>
  <Slider />
</template>

<style></style>
