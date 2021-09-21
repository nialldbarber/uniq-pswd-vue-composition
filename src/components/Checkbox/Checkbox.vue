<script setup lang="ts">
import {defineProps, defineEmits} from 'vue';
import * as headingStyles from '../../styles/typography.css';

const props = defineProps<{
  id: string;
  type: boolean;
  label: string;
  action: any;
}>();

const emit = defineEmits<{
  (e: 'update', value: string): void;
}>();
</script>

<template>
  <div :class="headingStyles.buttonText">
    <input type="checkbox" :checked="type" id="id" @click="action" />
    <label for="id" :class="headingStyles.labelText">{{ label }}</label>
  </div>
</template>
