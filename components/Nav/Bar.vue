<script lang="ts" setup>
const tabs = [
  {
    name: '線上購物',
    route: '/shops'
  },
  {
    name: '最新消息',
    route: '/news'
  },
  {
    name: '聯絡我們',
    route: '/contact'
  }
]

const tabListStyles = {
  tabList: 'border border-red-500 text-[#675a53]',
  tab: 'p-4 transition duration-500 hover:bg-[#4d1939] hover:text-[#ffffff]'
}
</script>

<template>
  <div class="relative flex items-center justify-between border border-blue-300 bg-[#F1EDEF] px-4">
    <div class="logo">
      <img class="w-[55px]" src="@/assets/images/logo.svg" />
    </div>
    <NavTabs :tabs="tabs" :styles="tabListStyles" />

    <NavFeatures />

    <!-- <div class="group">
      <a href="#" class="hover:text-blue-500">Link</a>
      <span class="opacity-0 transition-opacity duration-1000 group-hover:opacity-100"
        >Tooltip</span
      >
    </div> -->
  </div>
</template>
