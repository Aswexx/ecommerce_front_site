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
  tabList: 'text-[#675a53]',
  tab: 'p-1 text-xs transition duration-500 hover:bg-[#4d1939] hover:text-[#ffffff] sm:p-4 sm-flex-col sm:text-base'
}
</script>

<template>
  <div class="relative flex items-center justify-between bg-[#F1EDEF] px-4">
    <div class="logo cursor-pointer" @click="navigateTo('/')">
      <img class="w-[55px]" src="@/assets/images/bakerylogo.jfif" />
    </div>

    <NavTabs :tabs="tabs" :styles="tabListStyles" />

    <NavFeatures />
  </div>
</template>
