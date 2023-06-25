<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useProductStore } from '@/stores/product'

const cartItemCount = computed(() => useProductStore().cartItems.length)
const searchedProducts = computed(() => {
  if (!keyword.value) return []
  return useProductStore().products.filter(p => p.name.includes(keyword.value))
})

const user = useSupabaseUser()
const supabase = useSupabaseClient()

const searchInput = ref<HTMLInputElement>()
const keyword = ref('')
const searchOpened = ref(false)

const isSmallScreen = computed(() => {
  return useUserStore().viewportWidth < 640
})

const menuOpened = ref(false)

function toggleSearch() {
  searchOpened.value = !searchOpened.value
  if (searchOpened.value) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  }
}

async function login() {
  if (user.value) return navigateTo('/profile')
  
  const baseUrl = useRuntimeConfig().public.HOST_URL
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google'
  })


  if (error) {
    return console.error(error)
  }

  useToast('alert-success', '登入成功')
}

function navToCartPage() {
  if (!cartItemCount.value) {
    return useToast('alert-info', '購物車是空的，請先選購商品!')
  }
  navigateTo('/cart')
}

async function logout() {
  const { error } = await supabase.auth.signOut()

	if (error) {
		return console.error(error)
	}

  navigateTo('/')
}

function closeSearchDiv(e: MouseEvent) {
  const targetElement = e.target as HTMLElement
  if (targetElement.id === 'search-icon') return
  searchOpened.value = false
}

onMounted(() => {
  document.addEventListener('click', closeSearchDiv)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', closeSearchDiv)
})

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
      <div class="p-2 rounded-lg flex flex-col items-center bg-[#F1EDEF] absolute right-20 top-10 z-30" v-show="searchOpened">
        <input
          ref="searchInput"
          class=" border border-b-[#C3AE8B] bg-[#F1EDEF] p-2 outline-none"
          type="text"
          placeholder="輸入品名關鍵字"
          v-model="keyword"
        />
        
        <ul class="max-h-[60dvh] overflow-auto space-y-2"
        >
          <span v-show="!searchedProducts.length">沒有符合的商品</span>
          <ProductListItem
            class="cursor-pointer pb-2"
            v-for="product in searchedProducts" :key="product.id"
            :name="product.name"
            :image-url="product.imageUrl"
            @click="navigateTo(`/shops/${product.id}`)"
          />
        </ul>
        <button class="btn w-full btn-sm">關閉</button>
        
      </div>
    </div>

    <div class="group" v-if="!isSmallScreen">
      <Icon class="cursor-pointer" name="iconamoon:profile-light" size="32" color="#C3AE8B" />
      <ul
        class="absolute right-10 z-20 overflow-hidden rounded-lg bg-[#F1EDEF] opacity-0 transition-opacity duration-1000 group-hover:opacity-100"
      >
        <li @click="login" class="cursor-pointer px-4 py-1 hover:bg-color-primary hover:text-[#ffffff]">
          {{ user ? '個人頁面' : 'Google 登入' }}
        </li>
        <li @click="navigateTo('/unregisteredOrder')" class="cursor-pointer px-4 py-1 hover:bg-color-primary hover:text-[#ffffff]">
          未註冊帳號訂單查詢
        </li>
        <li v-if="user" @click="logout" class="cursor-pointer px-4 py-1 hover:bg-color-primary hover:text-[#ffffff]">
          登出
        </li>

      </ul>
    </div>

    <div class="group" v-else>
      <Icon @click="menuOpened = !menuOpened" class="cursor-pointer" name="iconamoon:profile-light" size="32" color="#C3AE8B" />
      <ul v-show="menuOpened"
        class="absolute right-10 z-20 overflow-hidden rounded-lg bg-[#F1EDEF]"
      >
        <li @click="login" class="cursor-pointer px-4 py-1 hover:bg-color-primary hover:text-[#ffffff]">
          {{ user ? '個人頁面' : 'Google 登入' }}
        </li>
        <li class="cursor-pointer px-4 py-1 hover:bg-color-primary hover:text-[#ffffff]">
          未註冊帳號訂單查詢
        </li>
        <li v-if="user" @click="logout" class="cursor-pointer px-4 py-1 hover:bg-color-primary hover:text-[#ffffff]">
          登出
        </li>

      </ul>
    </div>

    <div class="relative" @click="navToCartPage">
      <Icon class="cursor-pointer" name="ph:shopping-cart-simple" size="32" color="#C3AE8B" />
      <div
        class="absolute -right-2 -top-1 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[#a40001] p-2 text-xs text-white"
      >
        <span>{{ cartItemCount }}</span>
      </div>
    </div>
  </div>
</template>
