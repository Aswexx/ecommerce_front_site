<script lang="ts" setup>
import  { useProductStore }  from '@/stores/product'
const { cartItems } = useProductStore()

const deliveryFee = 90
const summaryItems = computed(() => {
  const productSubTotal = cartItems.reduce((accumulator, currentItem) => {
        return accumulator + (currentItem.price * currentItem.count)
  }, 0)

  return [
    {
      title: '商品金額',
      fee: productSubTotal
    },
    {
      title: '運費',
      fee: deliveryFee
    },
    {
      title: '總計',
      fee: productSubTotal + deliveryFee
    }
  ]
})

const deliveryInfo = reactive({
  email: '',
  name: '',
  phone: '',
  city: '',
  address: ''
})

const payInfo = reactive({
  MerchantID: '',
  TradeInfo: '',
  TradeSha: '',
  Version: '2.0',
  TokenTerm: '',
  TokenTermDemand: 1
})

const payForm = ref<HTMLFormElement>()

async function checkOut() {
  // validate delivery information
  const deliveryInfoToSubmit = {
    email: deliveryInfo.email,
    name: deliveryInfo.name,
    phone: deliveryInfo.phone,
    address: `${deliveryInfo.city}${deliveryInfo.address}`
  }

  const { error } = useDataValidate('delivery', deliveryInfoToSubmit)

  if (error) {
    useToast('alert-error', error.message)
    console.log(error)
    return
  }

  const order = {
    ...deliveryInfoToSubmit,
    contents: cartItems.map(item => {
      return {
        name: item.name,
        count: item.count
      }
    }),
    total: summaryItems.value[2].fee
  }

  // create order and get encrypted trade info from backend
  const { data } = await useFetch('/api/checkout', {
    method: 'post',
    body: order
  })

  payInfo.MerchantID = data.value!.MerchantID
  payInfo.TradeInfo = data.value!.tradeInfo
  payInfo.TradeSha = data.value!.sha
  payInfo.TokenTerm = deliveryInfo.email

  // nextTick(() => {
  //   payForm.value?.submit()
  // })
}

function handleCitySelect(selectedCity: string) {
  deliveryInfo.city = selectedCity
}

function handleCount(currentCount: number, productId: string) {
  cartItems.some((item, index) => {
    if (item.id === productId) {
      cartItems[index].count = currentCount
      return true
    }
    return false
  })
}

function removeItem(productId: string) {
  const index = cartItems.findIndex(item => item.id === productId)
  cartItems.splice(index, 1)
}

</script>
<template>
  <NuxtLayout>
    <div class="flex-1 flex flex-col items-center p-4">
      <!-- table -->
      <div class="flex flex-col mb-4 overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead>
            <tr class="text-center">
              <th>品項</th>
              <th>數量</th>
              <th>小計</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <!-- row -->
            <tr v-for="item in cartItems" :key="item.id">
              <td>
                <ProductListItem
                  :name="item.name"
                  :image-url="item.imageUrl"
                />
              </td>
              <td>
                <Counter
                  :init-count="item.count"
                  :max-count="item.stock"
                  :product-id="item.id"
                  :button-styles="'btn-xs'"
                  @count="handleCount"
                />
              </td>
              <td>$ {{ item.count * item.price }}</td>
              <td>
                <Icon class="cursor-pointer mb-1" name="akar-icons:trash-can" size="18" color="#3D72C7"
                  @click="removeItem(item.id)"
                />
              </td>
            </tr>
          </tbody>
        </table>
        
        <!-- summary -->
        <ul class="w-full sm:w-1/2 self-center sm:self-end">
          <li class="border-b border-dotted border-gray-500 pl-10 py-2 flex justify-between"
            v-for="item in summaryItems" :key="item.title"
          >
            <span class="">{{ item.title }}:</span>
            <span class="text-red-500">$ {{ item.fee }}</span>
          </li>
        </ul>

      </div>

      <!-- delivery info -->
      <div class="w-full sm:w-2/5 flex flex-col space-y-2">
        <h2 class="border-b border-black text-center">商品收件資訊</h2>
        <div class="self-end flex items-center text-xs">
          <Icon class="cursor-pointer" name="material-symbols:edit-note-rounded" size="20" color="#C3AE8B"/>
          <span>帶入註冊帳號資料</span>
        </div>
        <div class="mx-auto form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input type="text" placeholder="輸入訂單資訊收件email" 
            class="input input-bordered input-primary input-sm w-full max-w-xs"
            v-model="deliveryInfo.email"
          />

          <label class="label">
            <span class="label-text">收件人姓名</span>
          </label>
          <input type="text" placeholder="輸入收件人姓名" 
            class="input input-bordered input-primary input-sm w-full max-w-xs"
            v-model="deliveryInfo.name"
          />

          <label class="label">
            <span class="label-text">聯絡手機</span>
          </label>
          <input type="text" placeholder="輸入收件人聯絡手機" 
            class="input input-bordered input-primary input-sm w-full max-w-xs"
            v-model="deliveryInfo.phone"
          />

          <label class="label">
            <span class="label-text">收件地址</span>
          </label>
          <CitySelect class="mb-2" @city-select="handleCitySelect"/>
          <input type="text" placeholder="輸入收件地址" 
            class="input input-bordered input-primary input-sm w-full max-w-xs"
            v-model="deliveryInfo.address"
          />
        </div>
        <button class="btn btn-primary self-center" @click="checkOut">送出訂單</button>
      </div>


    </div>

    <!-- pay form -->
    <form class="hidden" :action="useRuntimeConfig().public.PAY_URL" ref="payForm" method="post">
      <input type="text" 
        name="MerchantID" :value="payInfo.MerchantID"
      >
      <input type="text" 
        name="TradeInfo" :value="payInfo.TradeInfo"
      >
      <input type="text" 
        name="TradeSha" :value="payInfo.TradeSha"
      >
      <input type="text" 
        name="Version" :value="payInfo.Version"
      >
      <input type="text" 
        name="TokenTerm" :value="payInfo.TokenTerm"
      >
      <input type="text" 
        name="TokenTermDemand" :value="payInfo.TokenTermDemand"
      >
    </form>
  </NuxtLayout>
</template>