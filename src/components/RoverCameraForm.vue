<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  getRoverImages: (camera: string) => void;
  resetForm: () => void;
  cameras: Array<string> | undefined;
  error_message: string;
  camera_name: string;
  total_photos: number;
}

defineProps<Props>();

const selected_camera = ref('');
</script>

<template>
  <div class="w-full bg-white rounded-md px-7 py-4">
    <div>
      <h2
        v-if="camera_name.length == 0"
        class="text-center text-xl font-extrabold"
      >
        Select Camera
      </h2>
      <h2 v-else class="text-center text-xl font-extrabold">
        {{ camera_name }}
      </h2>
    </div>

    <form
      class="mt-8 space-y-2 max-w-sm m-auto"
      @submit.prevent="getRoverImages(selected_camera)"
    >
      <select
        id="camera"
        class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
        v-model="selected_camera"
      >
        <option value="">Please Select a Camera</option>
        <option v-for="camera in cameras" :key="camera" :value="camera">
          {{ camera }}
        </option>
      </select>
      <div class="w-full flex flex-row items-center justify-center">
        <span>Total Photos: {{ total_photos }}</span>
      </div>
      <div class="">
        <button
          class="mx-1 border px-3 py-2 rounded-md border-gray-400 hover:text-white"
          @click.prevent="resetForm"
        >
          Reset
        </button>
        <button
          class="mx-1 border px-3 py-2 rounded-md border-gray-400 hover:text-white"
          type="submit"
        >
          Submit
        </button>
      </div>

      <div class="py-2">
        <transition name="slidex">
          <span v-if="error_message" class="text-red-500">{{
            error_message
          }}</span>
        </transition>
      </div>
    </form>
  </div>
</template>
