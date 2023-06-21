import { useUserStore } from '@/stores/user'
type AlertType = 'alert-success' | 'alert-error'

export default function useToast(alertType: AlertType, content: string) {
	const { interactAlerts } = useUserStore()
	interactAlerts.push({
    type: alertType,
    content
  })
}