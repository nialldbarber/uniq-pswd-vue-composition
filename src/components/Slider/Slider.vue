<script setup lang="ts">
import {defineProps, toRefs} from 'vue';

interface Props {
  range?: string;
}

const props = withDefaults(defineProps<Props>(), {
  range: '12',
});

const {range} = toRefs(props);
</script>

<template>
  <input type="range" min="0" max="40" v-model="range" />
</template>
 