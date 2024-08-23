import { create } from 'zustand';
import { IUserInfo } from '@/models/user.model';

type Action = {
  setProfile: (profile: IUserInfo) => void;
};

const useUserStore = create<IUserInfo & Action>((set) => ({
  name: '',
  email: '',
  point: 0,
  rank: 0,
  picture: '',

  setProfile: (profile) => set(profile),
}));

export default useUserStore;
