import { defineStore } from 'pinia'

export const useUserData = defineStore('userData', {
  state: () => ({ 
    uid: null, 
    coins: 0, 
    itemIndex : 0, 
    equippedChar : null, 
    equippedWeapon: null
  }), //CHECK IF "UID" IS NULL, IF NOT THEN ALLOW THEM INTO OTHER PAGES, OTHERWISE LOCK THEM INTO LOGIN
  getters: {
    calculatedDamage: (state) => {
    const mult = state.equippedChar?.multiplier ?? 1
    const atk = state.equippedWeapon?.attack ?? 1

    return (mult * atk).toFixed(1)
    },
    charImg: (state) => {
      const charImgLink = state.equippedChar?.imglink

      if (charImgLink) {
        return `./GachaItemsIMG/${charImgLink}`
      } else{
        return undefined
      }
      
    },
    weaponImg: (state) => {
      const weapImgLink = state.equippedWeapon?.imglink

      if (weapImgLink) {
        return `./GachaItemsIMG/${weapImgLink}`
      } else{
        return undefined
      }
      
    }
  }
})