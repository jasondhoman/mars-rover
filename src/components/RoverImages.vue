<script setup lang="ts">
import { computed } from 'vue';
import { Photo } from '../store';

interface Props {
  photos: Array<Photo>;
}

defineProps<Props>();
computed;
</script>

<template>
  <div class="grid grid-cols-3 gap-4 m-5">
    <transition-group name="fade">
      <img
        class="rounded-md border-1 border-gray-900 w-full h-full max-h-fit"
        v-for="photo in photos"
        :key="photo.id"
        :src="photo.img_src"
      />
    </transition-group>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
