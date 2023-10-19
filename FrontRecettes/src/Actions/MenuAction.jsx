
export const selectMenu = (menuKey) => {
    return {
      type: 'SELECT_MENU',
      payload: menuKey,
    }
  }