
import { VerifyLoginOtpForm } from '@/components/auth/verify-login-otp-form';
import { AuthHeader } from '@/components/auth/auth-header';

export default function VerifyLoginPage() {
  return (
    <>
      <AuthHeader />
      <div className="flex items-start justify-center min-h-screen bg-[#F9F7FE] pt-20">
        <VerifyLoginOtpForm />
      </div>
    </>
  );
}
