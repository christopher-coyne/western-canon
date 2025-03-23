import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useAuth } from "@/app/auth-provider";
import { SignInForm } from "./sign-in-form";
import { Button } from "@/components/ui/button";

export const SignInModal = () => {
  const { isSignInOpen, closeSignIn, openSignUp } = useAuth();

  const handleSuccess = () => {
    closeSignIn();
  };

  return (
    <Dialog open={isSignInOpen} onOpenChange={(open) => !open && closeSignIn()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome back</DialogTitle>
          <DialogDescription>
            Sign in to your LitSwipe account to continue
          </DialogDescription>
        </DialogHeader>

        <SignInForm onSuccess={handleSuccess} />

        <div className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Button
            variant="link"
            className="p-0 h-auto font-normal"
            onClick={() => {
              closeSignIn();
              openSignUp();
            }}
          >
            Sign up
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
