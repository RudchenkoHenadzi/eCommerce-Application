import axios from 'axios'
import PROJECT_CONFIG from '@/constants/projectConfigs'
import { useUserStore } from '@/stores/User'

export default function getUserCartsByCustomerId(customerId: string) {
  const user = useUserStore()
  const url = `${PROJECT_CONFIG.apiURL}/${PROJECT_CONFIG.projectKey}/carts/customer-id=${customerId}`
  return axios.get(
    url,
    {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
}
