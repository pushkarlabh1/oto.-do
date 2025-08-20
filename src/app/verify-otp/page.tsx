
import { VerifyOtpForm } from '@/components/auth/verify-otp-form';
import { NewUserAlert } from '@/components/auth/new-user-alert';
import { AuthHeader } from '@/components/auth/auth-header';

export default function VerifyOtpPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const isNewUser = searchParams?.new_user === 'true';

  return (
    <>
      <AuthHeader />
      <div className="flex flex-col items-center min-h-screen bg-[#F9F7FE] pt-20 gap-8 w-full">
        {isNewUser && <NewUserAlert />}
        <VerifyOtpForm />
      </div>
    </>
  );
}
