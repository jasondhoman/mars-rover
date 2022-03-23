<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  getManifestItems: (selected_rover: string, earth_date: string) => void;
  resetForm: () => void;
  error_message: string;
}

const rovers = ref<Array<{ id: number; name: string }>>([
  {
    id: 1,
    name: 'Curiosity',
  },
  {
    id: 2,
    name: 'Opportunity',
  },
  {
    id: 3,
    name: 'Spirit',
  },
]);

defineProps<Props>();
const selected_rover = ref<string>('');
const earth_date = ref<string>('');
</script>

<template>
  <div class="w-full bg-white rounded-md px-7 py-4">
    <div>
      <h2 class="text-center text-xl font-extrabold">Select Rover and Date</h2>
    </div>

    <form
      class="mt-8 space-y-2 max-w-sm m-auto"
      @submit.prevent="getManifestItems(selected_rover, earth_date)"
    >
      <select
        class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
        id="rover"
        v-model="selected_rover"
      >
        <option v-show="selected_rover == ''" value>
          Please Select a Rover
        </option>
        <option v-for="rover in rovers" :key="rover.id" :value="rover.name">
          {{ rover.name }}
        </option>
      </select>
      <div class="flex items-center justify-center">
        <input
          id="earth-date"
          type="date"
          class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-600 focus:outline-none"
          placeholder="2022-01-01"
          v-model="earth_date"
          required
        />
      </div>
      <div class="pt-2">
        <button
          class="mx-1 border px-3 py-2 rounded-md border-gray-400 hover:text-white"
          type="reset"
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

<style></style>
