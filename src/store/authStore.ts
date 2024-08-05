import { create } from 'zustand';
import { getItem, removeItem } from '../utils/localStorage';

type State = {
  isLoggedIn: boolean;
};

type Action = {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  logout: () => void;
};

const useAuthStore = create<State & Action>((set) => ({
  isLoggedIn: getItem('accessToken') ? true : false,
  setIsLoggedIn: (isLoggedIn) => set(() => ({ isLoggedIn: isLoggedIn })),
  logout: () => {
    removeItem('accessToken');
    removeItem('refreshToken');
    set(() => ({ isLoggedIn: false }));
  },
}));

export default useAuthStore;
