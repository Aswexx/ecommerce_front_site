<script setup lang="ts">
const searchInput = ref<HTMLInputElement>()
const searchOpened = ref(false)

function toggleSearch() {
  searchOpened.value = !searchOpened.value
  if (searchOpened.value) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  }
}
</script>

<template>
  <div class="flex space-x-2 sm:space-x-5">
    <div>
      <Icon
        id="search-icon"
        class="cursor-pointer"
        name="ic:baseline-search"
        size="32"
        color="#C3AE8B"
        @click="toggleSearch"
      />
      <input
        v-show="searchOpened"
        ref="searchInput"
        class="absolute right-20 top-10 z-10 border border-b-[#C3AE8B] bg-[#F1EDEF] p-2 outline-none"
        type="text"
        @blur="searchOpened = false"
      />
    </div>

    <div class="group">
      <Icon class="cursor-pointer" name="iconamoon:profile-light" size="32" color="#C3AE8B" />
      <ul
        class="absolute right-10 z-20 overflow-hidden rounded-lg bg-[#F1EDEF] opacity-0 transition-opacity duration-1000 group-hover:opacity-100"
      >
        <li class="cursor-pointer px-4 py-1 hover:bg-[#4d1939] hover:text-[#ffffff]">登入帳號</li>
        <li class="cursor-pointer px-4 py-1 hover:bg-[#4d1939] hover:text-[#ffffff]">
          未註冊帳號訂單查詢
        </li>
      </ul>
    </div>

    <div class="relative">
      <Icon class="cursor-pointer" name="ph:shopping-cart-simple" size="32" color="#C3AE8B" />
      <div
        class="absolute -right-2 -top-1 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[#a40001] p-2 text-xs text-white"
      >
        <span>1</span>
      </div>
    </div>
  </div>
</template>
