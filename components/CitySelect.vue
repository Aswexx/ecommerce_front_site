<script lang="ts" setup>
const emits = defineEmits(['citySelect'])
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

const selectedCity = ref('')

defineExpose({
  selectedCity
})
</script>

<template>
	<select class="select select-sm select-primary w-1/3 max-w-xs" 
    v-model="selectedCity"
    @change="emits('citySelect', selectedCity)"
  >
		<option disabled selected value="">選擇縣市</option>
		<option v-for="city in taiwanCities" :key="city" :value="city">{{ city }}</option>
	</select>
</template>