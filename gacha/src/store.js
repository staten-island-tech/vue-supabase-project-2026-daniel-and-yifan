import { defineStore } from 'pinia'

export const useUserData = defineStore('userData', {
  state: () => ({ uid: null, coins: 0 }), //CHECK IF "UID" IS NULL, IF NOT THEN ALLOW THEM INTO OTHER PAGES, OTHERWISE LOCK THEM INTO LOGIN
})