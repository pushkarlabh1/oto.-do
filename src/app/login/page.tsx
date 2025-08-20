import { LoginForm } from '@/components/login/login-form';
import { AuthHeader } from '@/components/auth/auth-header';

export default function LoginPage() {
  return (
    <>
      <AuthHeader />
      <div className="flex items-start justify-center min-h-screen bg-[#F9F7FE] pt-20">
        <LoginForm />
      </div>
    </>
  );
}
