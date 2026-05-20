import { defineStore } from 'pinia'

export const userData = defineStore('userData', () => {
  const uid = ref(null)

  return { uid }
})