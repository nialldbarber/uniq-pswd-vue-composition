<script setup lang="ts">
import * as headingStyles from '../../styles/typography.css';

const props = defineProps<{
  id: string;
  type: boolean;
  label: string;
  action: any;
}>();
</script>

<template>
  <div :class="headingStyles.buttonText">
    <input type="checkbox" :checked="type" id="id" @click="action" />
    <label for="id" :class="headingStyles.labelText">{{ label }}</label>
  </div>
</template>
