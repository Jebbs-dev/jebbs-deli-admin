"use client"

import useAuthStore from '@/state-store/auth'
import useUserRole from '@/hooks/useUserRole';

const SettingsPage = () => {

  const { user} = useAuthStore()
  return (
    <div>

    </div>
  )
}

export default SettingsPage