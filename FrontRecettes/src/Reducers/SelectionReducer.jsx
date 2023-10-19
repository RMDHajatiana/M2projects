
const initialState = {
    selectedMenuKey: null,
  }
  
  export default function selectionReducer(state = initialState, action) {
    switch (action.type) {
      case 'SELECT_MENU':
        return {
          ...state,
          selectedMenuKey: action.payload,
        };
      default:
        return state
    }
  }