// stores/order.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useOrderStore = defineStore('order', () => {
  const servedList = ref(
    JSON.parse(localStorage.getItem('servedList')) || [
      { no: 'A008', source: 'app', status:'served' },
      { no: '#4140', source: 'foodpanda', status:'served' },
      { no: '2005', source: 'uber', status:'served' },
      { no: '2001', source: 'kiosk', status:'served' },
      { no: '2002', source: 'kiosk', status:'served' },
      { no: 'c2a04', source: 'web', status:'served' },
      { no: '2003', source: 'app', status:'served' },
      { no: 'cd638', source: 'pos1', status:'served' },
      { no: '#4142', source: 'pos2', status:'served' },
      { no: 'cd639', source: 'pos3', status:'served' },
      { no: '2004', source: 'app', status:'served' },
      { no: '3005', source: 'foodpanda', status:'preparing' },
      { no: '#4136', source: 'uber', status:'served' },
      { no: '#4137', source: 'web', status:'preparing' },
      { no: 'W012', source: 'staff', status:'served' },
      { no: 'K806', source: 'pos4', status:'preparing' },
      { no: 'W006', source: 'drive', status:'served' },
      { no: 'K808', source: 'delivery1', status:'served' }
    ]
  )

  function updateOrderList(newOrderList) {
    servedList.value = newOrderList
    localStorage.setItem('servedList', JSON.stringify(newOrderList))
  }


  const servedOrders = computed(() =>
    servedList.value.filter(o => o.status === 'served')
  )

  const preparingOrders = computed(() =>
    servedList.value.filter(o => o.status === 'preparing')
  )

  const deliveryOrders = computed(() =>
    servedList.value.filter(
      o =>
        o.status === 'preparing' &&
        ['foodpanda', 'uber'].includes(o.source)
    )
  )



  return {
    servedList,
    servedOrders,
    preparingOrders,
    deliveryOrders,
    updateOrderList
  }
})
