<script setup lang="ts">
import { TabGroup, TabList, Tab } from '@headlessui/vue'
const { tabs, styles } = defineProps<{
  tabs: { name: string; route: string }[]
  styles: {
    tabList: string
    tab: string
  }
}>()

const selectedTab = ref(0)

function changeTab(index: number) {
  selectedTab.value = index
}
</script>

<template>
  <TabGroup :selected-index="selectedTab" @change="changeTab">
    <TabList :class="styles.tabList">
      <Tab v-for="tab in tabs" :key="tab.name" :class="styles.tab">
        <nuxt-link :to="tab.route">{{ tab.name }}</nuxt-link>
      </Tab>
    </TabList>
  </TabGroup>
</template>
