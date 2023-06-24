export default function useTimeFormatConvert(timestamp: string) {
	const date = new Date(timestamp)
	return date.toLocaleString('zh-TW', {
    timeZone: 'Asia/Taipei',
    hourCycle: 'h23'
  })
}
