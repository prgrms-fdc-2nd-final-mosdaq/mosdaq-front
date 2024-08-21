import { useLogout } from '@/hooks/api/auth/useLogout';
import { Button } from '@/components/common/Button';
import { Txt } from '@/components/common/Txt';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
  const navigate = useNavigate();
  const { mutation } = useLogout();

  return (
    <Button
      size="small"
      variant="secondary"
      onClick={() => {
        const isLogout = window.confirm('로그아웃 하시겠습니까?');
        if (!isLogout) return;
        navigate('/');
        mutation.mutate();
      }}
    >
      <Txt typography="Pretendard24regular" color="white">
        로그아웃
      </Txt>
    </Button>
  );
}
