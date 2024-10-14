<script lang="ts" setup>
import useHeaderConfig from '@/utils/useHeaderConfig';
import useRunningStatus from '@/utils/useRunningStatus';

const { headerConfigList, addHeaderConfig, removeHeaderConfig } = useHeaderConfig();
const { status } = useRunningStatus();
</script>

<template>
  <div class="relative h-full">
    <div class="fixed top-0 left-0 right-0 h-12 z-10 flex justify-between items-center pl-2" :class="status ? 'bg-green-200' : 'bg-red-200'">
      <label class="inline-flex items-center cursor-pointer origin-center font-bold">
        <input type="checkbox" v-model="status" class="sr-only peer" />
        <svg v-if="status" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8 text-green-500">
          <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z" clip-rule="evenodd" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8 text-red-500">
          <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM9 8.25a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75h.75a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75H9Zm5.25 0a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75H15a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75h-.75Z" clip-rule="evenodd" />
        </svg>
        <span class="pl-1 text-base">{{  status ? 'Running' : 'Not Running' }}</span>
      </label>

      <button class="cursor-pointer rounded-sm bg-gray-700 mr-2 px-6 py-2 text-sm font-semibold text-white" @click="addHeaderConfig">Add</button>
    </div>
    <ul class="p-4 pt-14">
      <li class="flex items-center justify-between py-1 w-full" :class="config.checked ? '' : 'opacity-40'" v-for="(config, index) in headerConfigList" :key="index">
        <label class="inline-flex items-center cursor-pointer origin-center scale-90">
          <input type="checkbox" v-model="config.checked" class="sr-only peer" />
          <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-gray-300 dark:peer-focus:ring-gray-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600"></div>
        </label>
        <div class="flex flex-1 gap-4 px-3">
          <input type="text" v-model="config.key" class="block w-1/2 rounded-sm border border-slate-300 bg-white p-2 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-400 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500 font-bold text-sm" placeholder="Key" />
          <input type="text" v-model="config.value" class="block w-1/2 rounded-sm border border-slate-300 bg-white p-2 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-400 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500 font-bold text-sm" placeholder="Value" />
        </div>
        <button
          class="cursor-pointer rounded-sm bg-red-100 px-3 py-1 text-sm font-semibold text-red-700 hover:text-red-500 hover:bg-red-200"
          @click="removeHeaderConfig(index)"
        >Delete</button>
      </li>
      <li class="mt-4 flex justify-center">
        
      </li>
    </ul>
  </div>
  <!-- <div>{{ headerConfigList }}</div> -->
  

  <!-- <ul>
    <li v-for="(config, index) in headerConfigList" :key="index">
      <span>
        <input type="checkbox" v-model="config.checked" />
      </span>
      <span>
        key: <input type="text" v-model="config.key" />
        value: <input type="text" v-model="config.value" />
      </span>
      <span><button @click="removeHeaderConfig(index)">删除</button></span>
    </li>
    <li>
      <button @click="addHeaderConfig">新增</button>
    </li>
  </ul> -->
</template>

<style scoped>

</style>
