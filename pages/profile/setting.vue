<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
const taiwanCities = [
  '基隆市',
  '臺北市',
  '新北市',
  '桃園市',
  '新竹市',
  '新竹縣',
  '苗栗縣',
  '臺中市',
  '彰化縣',
  '南投縣',
  '雲林縣',
  '嘉義市',
  '嘉義縣',
  '臺南市',
  '高雄市',
  '屏東縣',
  '宜蘭縣',
  '花蓮縣',
  '臺東縣',
  '澎湖縣',
  '金門縣',
  '連江縣'
]
const userId = useSupabaseUser().value?.id
const email = useSupabaseUser().value?.email

const { data: profile } = await useFetch<Profile>(`/api/users/${userId}`)

const profileToUpdate = reactive({
	name: profile.value?.name,
	birthday: new Date(profile.value?.birthday as string),
	selectedCity: profile.value?.address ? profile.value?.address.slice(0, 3) : '',
	address: profile.value?.address ? profile.value?.address.slice(3) : '',
	subscription: profile.value?.subscription,
	phone: profile.value?.phone
})

const isProfileModified = ref(false)
watch(profileToUpdate, () => {
	checkIsProfileModified()
})

function checkIsProfileModified(): void {

	const profileToSubmit = {
		name: profileToUpdate.name,
		birthday: `${profileToUpdate.birthday.getFullYear()}-${profileToUpdate.birthday.getMonth() + 1}-${profileToUpdate.birthday.getDate()}`,
		address: `${profileToUpdate.selectedCity}${profileToUpdate.address}`,
		subscription: profileToUpdate.subscription,
		phone: profileToUpdate.phone
	}

	if (
		((!profile.value?.address && !profileToSubmit.address) || (profile.value?.address === profileToSubmit.address)) &&
		((!profile.value?.birthday && !profileToSubmit.birthday) || (profile.value?.birthday === profileToSubmit.birthday)) &&
		((!profile.value?.phone && !profileToSubmit.phone) || (profile.value?.phone === profileToSubmit.phone)) &&
		((!profile.value?.name && !profileToSubmit.name) || (profile.value?.name === profileToSubmit.name)) &&
		((!profile.value?.subscription && !profileToSubmit.subscription) || (profile.value?.subscription === profileToSubmit.subscription))
	) {
		isProfileModified.value = false
		return
	}
	isProfileModified.value = true
}


async function handleSubmit() {
	const profileToSubmit = {
		name: profileToUpdate.name,
		birthday: `${profileToUpdate.birthday.getFullYear()}-${profileToUpdate.birthday.getMonth()+1}-${profileToUpdate.birthday.getDate()}`,
		address: `${profileToUpdate.selectedCity}${profileToUpdate.address}`,
		subscription: profileToUpdate.subscription,
		phone: profileToUpdate.phone
	}

	const { error } = useProfileValidate(profileToSubmit)

	console.log(profile.value)
	console.log(profileToSubmit)

	if (error) {
		//TODO: 依照 key 給予對應提示 toast 內容
		console.log(error.details[0].context?.key, error.message)
		return
	}

	const result = await useFetch(`/api/users/${userId}`, {
		method: 'put',
		body: profileToSubmit
	})

	// TODO: 修改完後給 toast，刷新此頁，確保刷新後按鈕 disable

}

</script>

<template>
	<div class="w-full">
		<form
			@submit.prevent="handleSubmit"
			class="w-[70%] h-[500px] mx-auto bg-[#F1EDEF]
			flex flex-col justify-between">
			<div class="profile-input-group">
				<span>帳號</span>
				<span>{{ email }}</span>
			</div>

			<div class="profile-input-group">
				<span>姓名</span>
				<input type="text" v-model.trim="profileToUpdate.name" ref="nameInput"/>
			</div>

			<div class="profile-input-group">
				<span>生日</span>
				<div class="w-1/4">
					<VueDatePicker 
						v-model="profileToUpdate.birthday" 
						:enable-time-picker="false" 
						calendar-cell-class-name="dp-custom-cell"
						no-today
						required
						:max-date="new Date()"
						/>
				</div>
			</div>

			<div class="profile-input-group">
				<span>聯絡電話</span>
				<input type="text" v-model.trim="profileToUpdate.phone"/>
			</div>

			<div class="profile-input-group">
				<span>地址</span>
				<select class="select select-sm select-primary w-1/5 max-w-xs" v-model="profileToUpdate.selectedCity">
					<option disabled selected value="">選擇縣市</option>
					<option v-for="city in taiwanCities" :key="city" :value="city">{{ city }}</option>
				</select>
				<input type="text" v-model="profileToUpdate.address">
			</div>

			<div class="self-start">
				<label class="cursor-pointer label space-x-5">
					<input type="checkbox" class="checkbox checkbox-primary" 
						:checked="profileToUpdate.subscription"
						v-model="profileToUpdate.subscription"
						/>
					<span class="label-text">接收會員電子報</span>
				</label>
			</div>

			<button class="btn btn-primary self-center" :disabled="!isProfileModified">確認修改</button>
		</form>
	</div>
</template>

<style>
.dp-custom-cell {
	border-radius: 50%;
}

.dp__active_date,
.dp__action_select,
.dp__overlay_cell_active {
	background-color: #4d1939;
}
</style>