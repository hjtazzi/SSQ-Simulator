import { useReducer, useMemo, type ReactNode } from 'react';
import { AppDispatchContext, AppStateContext } from './initAppContext';
import { appReducer } from './appReducer';
import type { AppState } from '../types';


const initialAppState: AppState = {
  isFirstLoad: true,
  language: 'en',
  isMobileMenu: false,
};


const ContextProvider = ({ children }: { children: ReactNode; }) => {
  const [state, dispatch] = useReducer(appReducer, initialAppState);

  const stateValue = useMemo(() => state, [state]);
  const dispatchValue = useMemo(() => dispatch, [dispatch]);

  return (
    <AppStateContext.Provider value={stateValue}>
      <AppDispatchContext.Provider value={dispatchValue}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

export default ContextProvider;
