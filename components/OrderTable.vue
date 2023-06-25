<script lang="ts" setup>
const { orders } = defineProps<{ orders: Order[] | []}>()
const orderDetail = reactive<Order>({
  id: '',
  createdAt: '',
  progress: '',
  tradeAmount: 0,
  recieverName: '',
  recieverAddress: '',
  tradeUserEmail: '',
  tradeUserPhone: '',
  purchase: [{
    count: 0,
    product: {
      name: '',
      imageUrl: '',
      imageBlurHash: ''
  }}]
})
const detailModal = ref<HTMLDialogElement>()
function showDetailModal(orderId: string) {
  const order = orders.find((o) => o.id === orderId)
  orderDetail.recieverName = order!.recieverName
  orderDetail.recieverAddress = order!.recieverAddress
  orderDetail.tradeUserPhone = order!.tradeUserPhone
  orderDetail.tradeUserEmail = order!.tradeUserEmail
  orderDetail.purchase = order!.purchase
  detailModal.value?.showModal()
}
</script>

<template>
  <div>

    <div class="w-full h-[70dvh] overflow-y-auto">
      <table class="table table-pin-rows">
        <!-- head -->
        <thead class="bg-red-800">
          <tr class="hidden sm:table-row text-center">
            <th>訂單號</th>
            <th>訂單金額</th>
            <th>處理進度</th>
            <th>訂單建立時間</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <!-- row -->
          <template v-if="orders.length">
            <tr class="flex flex-col w-full sm:table-row text-center" v-for="order in orders" :key="order.id">
              <td>
                {{ order.id }}
              </td>
              <td>
                {{ order.tradeAmount }}
              </td>
              <td>
                {{ order.progress }}
              </td>
              <td>
                {{ useTimeFormatConvert(order.createdAt) }}
              </td>
              <td>
                <button class="btn btn-xs" @click="showDetailModal(order.id)">詳細</button>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td class="text-center">查無訂單資訊</td>
            </tr>
          </template>
        </tbody>

      </table>
    </div>

    <dialog ref="detailModal" class="modal">
      <form method="dialog" class="modal-box">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

        <div class="w-3/5 grid grid-cols-2 gap-2">
          <span>收件人姓名: </span><span>{{ orderDetail.recieverName }}</span>
          <span>收件人手機號:  </span><span>{{ orderDetail.tradeUserPhone }}</span>
          <span>email: </span><span>{{ orderDetail.tradeUserEmail }}</span>
          <span>收件地址: </span><span>{{ orderDetail.recieverAddress }}</span>
        </div>

        <div>
          <h1 class="m-4 text-lg font-bold text-center border-b-2">購買商品詳情</h1>
          <div class="h-[50dvh] overflow-y-auto space-y-4">
            <div
              class="flex items-center justify-between"
              v-for="purchase in orderDetail.purchase" :key="purchase.product.name" 
            >
              <ProductListItem
                :name="purchase.product.name"
                :image-url="purchase.product.imageUrl"
              />
              <span>X {{ purchase.count }}</span>
            </div>
          </div>
        </div>
      </form>
    </dialog>
  </div>
</template>