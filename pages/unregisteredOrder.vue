<script setup lang="ts">
const userId = useSupabaseUser().value?.id
const orders = reactive<Order[]>([])

const isLoadingData = ref(false)

const email = ref('')
const phone = ref('')

let timer: NodeJS.Timeout
async function query() {

  isLoadingData.value = true
  if (timer) {
    clearTimeout(timer)
  }

  timer = setTimeout(async () => {
    orders.splice(0, orders.length)
    const { data, error } = await useFetch<Order[]>('/api/orders/unregistered', {
      // @ts-ignore
      // TODO: fix typescript error
      method: 'post',
      body: {
        email: email.value,
        phone: phone.value
      }
    })
    orders.push(...data.value as Order[])
    isLoadingData.value = false
  }, 3000)
}

</script>

<template>
  <NuxtLayout>
    <div class="flex-1">
      <div class="mt-4 p-2 mx-auto form-control max-w-md items-center bg-[#F1EDEF] space-y-2 rounded-lg">
        <div class="self-end text-xs flex items-center space-x-1"
          v-if="userId"
        >
          <Icon
            name="bi:exclamation-circle" size="12" color="#B1976D"
          />
          <span class="underline italic cursor-pointer"
            @click="navigateTo('/profile/orders')"
          >
            查詢註冊帳號所下的訂單紀錄請點此
          </span>
        </div>

        <div class="w-3/5">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input type="text" placeholder="輸入訂購時所填的 email" 
            class="input input-sm input-primary w-full max-w-xs"
            v-model="email"
          />
        </div>

        <div class="w-3/5">
          <label class="label">
            <span class="label-text">手機號</span>
          </label>
          <input type="text" placeholder="輸入訂購時所填的手機號"
            class="input input-sm input-primary w-full max-w-xs"
            v-model="phone"
          />
        </div>

        <button @click="query" class="btn btn-primary btn-sm" type="button">查詢</button>
      </div>

      <div class="mt-4">
        <span v-if="isLoadingData" class="block mx-auto loading loading-spinner loading-lg text-primary"></span>

        <OrderTable
          class="mx-auto w-4/5"
          :orders="orders"
        />
      </div>
    </div>
  </NuxtLayout>
</template>