import { create } from 'zustand';
import { IUserInfo } from '@/models/user.model';

type Action = {
  setProfile: (profile: IUserInfo) => void;
  // getProfile: () => IUserInfo;
};

const useUserStore = create<IUserInfo & Action>((set, get) => ({
  name: '',
  email: '',
  point: 0,
  rank: 0,
  picture: '',

  setProfile: (profile) => set(profile),
}));

export default useUserStore;
