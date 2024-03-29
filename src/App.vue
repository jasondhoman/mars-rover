<script setup lang="ts">
import { ref } from 'vue';

import RoverFormVue from './components/RoverForm.vue';
import RoverImages from './components/RoverImages.vue';
import RoverCameraForm from './components/RoverCameraForm.vue';
import {
  getPhotos,
  getManifest,
  Manifest,
  Photo,
  ManifestPhotos,
} from './store';

const cameras = ref<Array<string>>();
const camera_name = ref('');
const date_selected = ref('');
const display_photos = ref(false);
const display_rover_select = ref(true);
const error_message = ref('');
const loading = ref(false);
const manifest_day_info = ref<ManifestPhotos>();
const manifest = ref<Manifest>();
const photos = ref<Array<Photo>>();
const selected_camera = ref('');
const selected_rover = ref('');
const total_photos = ref(0);

async function getManifestItems(rover: string, earth_date: string) {
  error_message.value = '';
  selected_rover.value = rover;
  display_photos.value = false;
  photos.value = [];
  selected_camera.value = '';

  let end_date = new Date(earth_date);
  if (end_date.toString() == 'Invalid Date') {
    error_message.value = 'Date Entered is Invalid';
    return;
  }

  if (!rover) {
    error_message.value = 'Please Select a Rover';
    return;
  }

  loading.value = true;
  date_selected.value = end_date.toISOString().split('T')[0];
  let data = await getManifest(rover);

  if (data) {
    manifest.value = data;
  }

  let found_date = false;

  if (manifest.value?.photos) {
    for (const photo of manifest.value?.photos) {
      let comp_date = new Date(photo.earth_date);
      if (comp_date > end_date) {
        error_message.value = 'No Photos Located for Date Selected';
        break;
      }
      if (photo.earth_date === date_selected.value) {
        found_date = true;
        display_photos.value = true;
        cameras.value = photo.cameras;
        manifest_day_info.value = photo;
        total_photos.value = manifest_day_info.value.total_photos;
        display_rover_select.value = false;
        break;
      }
    }
  }
  if (!found_date) {
    error_message.value = 'No Photos Located for Date Selected';
  }

  loading.value = false;
}

async function getRoverImages(selected_camera: string) {
  error_message.value = '';
  if (!selected_camera) {
    error_message.value = 'Please Select a Camera';
    return;
  }
  loading.value = true;
  let data = await getPhotos(
    selected_rover.value,
    selected_camera,
    date_selected.value
  );
  if (data) {
    photos.value = data;
    camera_name.value = photos.value[0].camera.full_name;
  }
  loading.value = false;
}

function resetForm() {
  photos.value = [];
  selected_rover.value = '';
  cameras.value = [];
  camera_name.value = '';
  selected_rover.value = '';
  display_rover_select.value = true;
  error_message.value = '';
}
</script>

<template>
  <div>
    <transition name="slide" appear>
      <div class="flex flex-row items-center justify-start my-2 pb-2 border-b">
        <img class="logo" alt="Vue logo" src="./assets/NasaLogo.png" />
        <h3 class="text-lg">Mars {{ selected_rover }} Rover</h3>
      </div>
    </transition>
    <div
      class="min-h-full flex flex-row items-center justify-center p-4 sm:px-6 lg:px-8 border max-w-md m-auto rounded-md"
    >
      <RoverFormVue
        v-if="display_rover_select"
        :getManifestItems="getManifestItems"
        :resetForm="resetForm"
        :error_message="error_message"
      />

      <RoverCameraForm
        v-else
        :getRoverImages="getRoverImages"
        :resetForm="resetForm"
        :cameras="cameras"
        :error_message="error_message"
        :camera_name="camera_name"
        :total_photos="total_photos"
      />
    </div>
    <div
      class="flex flex-row items-baseline justify-center mt-4"
      v-if="loading"
    >
      <img class="max-h-11" src="./assets/loading.gif" alt="" />
      &nbsp;&nbsp;fetching data ...
    </div>
    <div v-if="display_photos" class="m-auto max-w-7xl mt-5">
      <RoverImages v-if="photos?.length" :photos="photos" v-cloak />
    </div>
  </div>
</template>

<style>
[v-cloak] {
  display: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.logo {
  width: 4rem;
}

button:hover {
  background-color: #0b3d91;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.75s, transform 0.75s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateY(-10%);
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(30%);
}
</style>
