import { defineStore } from "pinia";

export const useUserStore = defineStore('useUserStore', {
    state: () => {
        return {
            user: {email: ''}
        }
    },
});