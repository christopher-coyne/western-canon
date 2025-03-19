import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAuth } from "@/app/auth-provider";

export const SignInModal = () => {
  const { isSignInOpen, closeSignIn } = useAuth();

  return (
    <Dialog open={isSignInOpen} onOpenChange={(open) => !open && closeSignIn()}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="grid gap-4 py-4">
          <h2 className="text-lg font-semibold">Welcome back</h2>
          {/* Sign in form will go here */}
        </div>
      </DialogContent>
    </Dialog>
  );
};
