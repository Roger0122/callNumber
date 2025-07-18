import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useSettingsStore = defineStore('settings', () => {
  const orderSources = ref(
    JSON.parse(localStorage.getItem('orderSources')) || [
      { label: 'APP(1~499)', key: 'app', enabled: true },
      { label: 'Kiosk', key: 'kiosk', enabled: true },
      { label: 'Web', key: 'web', enabled: true },
      { label: '熊貓', key: 'foodpanda', enabled: true },
      { label: 'Uber', key: 'uber', enabled: true },
      { label: 'POS1機', key: 'pos1', enabled: true },
      { label: 'POS2機', key: 'pos2', enabled: true },
      { label: 'POS3機', key: 'pos3', enabled: true },
      { label: 'POS4機', key: 'pos4', enabled: true },
      { label: 'POS5機', key: 'pos5', enabled: true },
      { label: '電外送', key: 'delivery1', enabled: false },
      { label: 'A外送', key: 'delivery2', enabled: false },
      { label: '車道', key: 'drive', enabled: false },
      { label: '員工餐', key: 'staff', enabled: false },
    ]
  )

  function updateOrderSources(newSources) {
    orderSources.value = newSources
    localStorage.setItem('orderSources', JSON.stringify(newSources))
  }

  return {
    orderSources,
    updateOrderSources
  }
})