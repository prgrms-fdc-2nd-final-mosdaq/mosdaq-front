import { useLogout } from '@/hooks/api/auth/useLogout';
import { LoginButton } from '../layout/Header';
export default function Logout() {
  const { mutation } = useLogout();

  return <LoginButton onClick={() => mutation.mutate()}>로그아웃</LoginButton>;
}
