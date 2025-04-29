"use client"

import useAuthStore from '@/state-store/auth'
import useUserRole from '@/hooks/useUserRole';

const SettingsPage = () => {

  const { user, vendor} = useAuthStore()
  return (
    <div>

    </div>
  )
}

export default SettingsPage