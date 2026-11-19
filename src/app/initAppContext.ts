import { createContext } from 'react';
import type { AppAction, AppState } from '../types';


export const AppStateContext = createContext<AppState | undefined>(undefined);
export const AppDispatchContext = createContext<React.Dispatch<AppAction> | undefined>(undefined);
