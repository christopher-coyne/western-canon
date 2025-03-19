import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useAuth } from "@/app/auth-provider";
import { SignUpForm } from "./sign-up-form";
import { Button } from "@/components/ui/button";

export function SignUpModal() {
  const { isSignUpOpen, closeSignUp, openSignIn } = useAuth();

  const handleSuccess = () => {
    closeSignUp();
  };

  return (
    <Dialog open={isSignUpOpen} onOpenChange={(open) => !open && closeSignUp()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create your account</DialogTitle>
          <DialogDescription>
            Enter your details to create your LitSwipe account
          </DialogDescription>
        </DialogHeader>

        <SignUpForm onSuccess={handleSuccess} />

        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Button
            variant="link"
            className="p-0 h-auto font-normal"
            onClick={() => {
              closeSignUp();
              openSignIn();
            }}
          >
            Sign in
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
