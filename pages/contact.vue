<script lang="ts" setup>
const userId = useSupabaseUser().value?.id

const contactInfo = reactive({
  name: '',
  phone: '',
  email: '',
  type: '',
  content: ''
})

const contactOptions = [
  '異業合作',
  '商品諮詢',
  '訂單諮詢',
  '產品建議',
  '其他'
]

async function submitContactInfo() {
  const { error } = useDataValidate('contact', contactInfo)

	if (error) {
    useToast('alert-error', error.message)
		return
	}

  await useFetch('/api/contact', {
    method: 'post',
    body: contactInfo
  })

  useToast('alert-success', '已收到您的訊息!')
  window.location.reload()
}

function clearContactInfo() {
  const keys = Object.keys(contactInfo)
  keys.forEach(k => {
    contactInfo[k as keyof typeof contactInfo] = ''
  })
}

async function importUserInfo() {
  const { data: userInfo } = await useFetch(`/api/users/${userId}`)
  if (userInfo.value) {
    contactInfo.email = userInfo.value.email
    contactInfo.name = userInfo.value.name || ''
    contactInfo.phone = userInfo.value.phone || ''
  }
}

</script>

<template>
  <NuxtLayout>
    <div class="flex-1 flex flex-col items-center">
      <Hero
        :title="'聯絡我們'"
        :content="'我們誠摯期待聆聽您對我們產品的寶貴意見與建議。您的每一個想法都將成為我們不斷改進的動力。'"
        :img-url="`https://source.unsplash.com/5Ne6mMQtIdo`"
        :height="'h-[30vh]'"
      />

      <div class="bg-[#F1EDEF] my-4 p-4 w-4/5 max-w-[500px] grid grid-cols-2 gap-y-4 justify-items-stretch">
        
        <div @click="importUserInfo" class="pt-2 pr-2 flex items-center text-xs col-span-2 justify-self-end cursor-pointer">
          <Icon class="" name="material-symbols:edit-note-rounded" size="20" color="#C3AE8B"/>
          <span>帶入註冊帳號資料</span>
        </div>

        <div class="">
          <label class="label">
            <span class="label-text">姓名</span>
          </label>
          <input type="text" placeholder="輸入姓名" 
            class="input input-bordered input-primary input-sm"
            v-model="contactInfo.name"
          />
        </div>

        <div class="">
          <label class="label">
            <span class="label-text">聯絡手機</span>
          </label>
          <input type="text" placeholder="輸入聯絡手機號碼" 
            class="input input-bordered input-primary input-sm"
            v-model="contactInfo.phone"
          />
        </div>

        <div class="">
          <label class="label">
            <span class="label-text">電子郵件</span>
          </label>
          <input type="text" placeholder="輸入電子郵件信箱" 
            class="input input-bordered input-primary input-sm"
            v-model="contactInfo.email"
          />
        </div>

        <div class="">
          <label class="label">
            <span class="label-text">聯絡項目</span>
          </label>
          <select class="select select-sm select-primary" 
            v-model="contactInfo.type"
          >
            <option disabled selected value="">選擇項目</option>
            <option v-for="option in contactOptions" :key="option" :value="option">{{ option }}</option>
          </select>
        </div>

        <div class="col-span-2 justify-self-center">
          <label class="label">
            <span class="label-text">內容</span>
          </label>
          <textarea 
            class="w-[300px] textarea textarea-bordered textarea-primary h-36" 
            placeholder="輸入具體內容"
            v-model="contactInfo.content"
          ></textarea>
        </div>

        <div class="col-span-2 justify-self-center space-x-4">
          <button class="btn" @click="clearContactInfo">清除</button>
          <button class="btn btn-primary" @click="submitContactInfo">送出</button>
        </div>
      </div>


    </div>
  </NuxtLayout>
</template>
