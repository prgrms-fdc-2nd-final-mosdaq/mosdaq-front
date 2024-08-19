import { useLogout } from '@/hooks/api/auth/useLogout';
import { Button } from '@/components/common/Button';
import { Txt } from '@/components/common/Txt';

export default function LogoutButton() {
  const { mutation } = useLogout();

  return (
    <Button size="small" variant="secondary" onClick={() => mutation.mutate()}>
      <Txt typography="Pretendard24regular" color="white">
        로그아웃
      </Txt>
    </Button>
  );
}
