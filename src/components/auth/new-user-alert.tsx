
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function NewUserAlert() {
  return (
    <Alert className="max-w-3xl w-[90%] bg-amber-100 border-amber-300 text-amber-800 [&>svg]:text-amber-600">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle className="font-semibold">New User Detected</AlertTitle>
      <AlertDescription>
        It seems your account isn’t set up yet. Please enter the OTP to complete the signup process.
      </AlertDescription>
    </Alert>
  )
}
