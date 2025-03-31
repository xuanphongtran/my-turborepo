import { useFetch } from '@lib/utils/util-funcs'
import { Menu } from '@repo/global-types/menu.d'

const menuServerApi = {
  getMenu: async (position: 'header' | 'footer' | 'apply', lang: string, location: string): Promise<Menu[]> => {
    try {
      const response = await await useFetch(`menu/${position}`, lang, location)

      if (!response.success) return []

      return response.data as Menu[]
    } catch (error) {
      return []
    }
  }
}

export default menuServerApi
