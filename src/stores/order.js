// stores/order.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useOrderStore = defineStore('order', () => {
  const servedList = ref(
    JSON.parse(localStorage.getItem('servedList')) || [
      // 仍在場上可銷單的資料（示範）
      { no: 'A008',   source: 'app',       status:'served',    createdAt: Date.now(),  restored: false },
      { no: '#4140',  source: 'foodpanda', status:'served',    createdAt: Date.now(),  restored: false },
      { no: '2005',   source: 'uber',      status:'served',    createdAt: Date.now(),  restored: false },
      { no: '2001',   source: 'kiosk',     status:'served',    createdAt: Date.now(),  restored: false },
      { no: '2004',   source: 'app',       status:'preparing', createdAt: Date.now(),  restored: false },
      { no: '3005',   source: 'foodpanda', status:'preparing', createdAt: Date.now(),   restored: false },
      { no: 'K806',   source: 'pos4',      status:'preparing', createdAt: Date.now(),   restored: false },
    ]
  )

  const finishedList = ref(
    JSON.parse(localStorage.getItem('finishedList')) || [
      { no: 'A099',   source: 'app',       status:'served', finishedAt: Date.now(), time:'16:50', restored:false },
      { no: '#4152',  source: 'foodpanda', status:'served', finishedAt: Date.now(), time:'16:46', restored:false },
      { no: 'A100',   source: 'kiosk',     status:'served', finishedAt: Date.now(), time:'16:28', restored:false },
      { no: 'c2a03',  source: 'web',       status:'served', finishedAt: Date.now(), time:'16:38', restored:false  },
      { no: '#4161',  source: 'uber',      status:'served', finishedAt: Date.now(), time:'16:12', restored:false  },
      { no: 'W016',   source: 'staff',     status:'served', finishedAt: Date.now(),  time:'16:30', restored:false },
    ]
  )

  function updateOrderList(newOrderList) {
    servedList.value = newOrderList
    localStorage.setItem('servedList', JSON.stringify(newOrderList))
  }


  function addToFinishedList(order) {
    const finishedAt = Date.now()
    const time = new Date().toLocaleTimeString('zh-TW', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false    
    });
    
    finishedList.value.push({
      ...order,
      status: 'served',    
      finishedAt,
      time,
      restored: false
    })
    localStorage.setItem('finishedList', JSON.stringify(finishedList.value))
  }


function restoreFinishedOrder(no) {
  const idx = finishedList.value.findIndex(o => o.no === no)
  if (idx !== -1) {
    const order = finishedList.value[idx]
    

    finishedList.value.splice(idx, 1)
    servedList.value.push({
      no: order.no,
      source: order.source,
      status: 'preparing',
      createdAt: Date.now(),
      restored: false
    })

    localStorage.setItem('servedList', JSON.stringify(servedList.value))
    localStorage.setItem('finishedList', JSON.stringify(finishedList.value))
  }
}



  const servedOrders = computed(() =>
    servedList.value.filter(o => o.status === 'served' && !['foodpanda', 'uber'].includes(o.source))
  )

  const preparingOrders = computed(() =>
    servedList.value.filter(o => o.status === 'preparing'&& !['foodpanda', 'uber'].includes(o.source))
  )

  const deliveryOrders = computed(() =>
    servedList.value.filter(
      o =>
        o.status === 'preparing' &&
        ['foodpanda', 'uber'].includes(o.source)
    )
  )

  
  const waitingCount = computed(() =>
    servedList.value.filter(
      o => o.status === 'served' && !['foodpanda', 'uber'].includes(o.source)
    ).length
  )


  return {
    servedList,
    waitingCount,
    finishedList,
    servedOrders,
    preparingOrders,
    deliveryOrders,
    restoreFinishedOrder,
    updateOrderList,
    addToFinishedList,
  }
})
