import { EnterNameForm } from '@/components/auth/enter-name-form';
import { AuthHeader } from '@/components/auth/auth-header';

export default function EnterNamePage() {
  return (
    <>
      <AuthHeader />
      <div className="flex items-start justify-center min-h-screen bg-[#F9F7FE] pt-20">
        <EnterNameForm />
      </div>
    </>
  );
}
