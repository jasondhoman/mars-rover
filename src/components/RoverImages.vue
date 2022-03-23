<script setup lang="ts">
interface Photo {
  id: number;
  sol: number;
  camera: Camera;
  img_src: string;
  earth_date: Date;
  rover: Rover;
}

interface Camera {
  id: number;
  name: string;
  rover_id: string;
  full_name: string;
}

interface Rover {
  id: number;
  name: string;
  landing_date: Date;
  launch_date: Date;
  status: string;
}

interface Props {
  photos: Array<Photo>;
}

defineProps<Props>();
</script>

<template>
  <transition name="fade">
    <div class="grid grid-cols-3 gap-4 m-5">
      <img
        class="rounded-md border-1 border-gray-900 w-full h-full"
        v-for="photo in photos"
        :key="photo.id"
        :src="photo.img_src"
      />
    </div>
  </transition>
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
