import { FC, useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState {
    isMenuOpen: boolean;
    children?: React.ReactNode | undefined;
}

const UI_INITIAL_STATE: UIState = {
    isMenuOpen: false
}

export const UIProvider:FC<UIState> = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    const toggleSideMenu = () => {
        dispatch({ type: '[UI] - ToogleMenu' })
    }

    return (
        <UIContext.Provider value={{
            ...state,

            // Methods
            toggleSideMenu,
        }}>
            { children }
        </UIContext.Provider>
    )
}