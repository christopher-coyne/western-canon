import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const ViewFeed = () => {
  return (
    <div className="border-2 border-red-400 flex items-center justify-center">
      <Button
        variant="ghost"
        size="icon"
        className="ml-2 rounded-full bg-primary/10 hover:bg-primary/20 z-10 h-12 w-12"
        onClick={() => console.log("left")}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <div className="w-[50%] h-[50vh] bg-slate-500">TEST</div>
      <Button
        variant="ghost"
        size="icon"
        className="ml-2 rounded-full bg-primary/10 hover:bg-primary/20 z-10 h-12 w-12"
        onClick={() => console.log("right")}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  );
};
