'use client';

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useMiniApp } from "@neynar/react";
import { waitlistAPI } from "@/lib/api/waitlist";
import sdk from "@farcaster/miniapp-sdk";

interface Props {
  setJoinWaitlistFailed: (
    error: string,
    onRetry: () => Promise<boolean>,
    isRetrying: boolean
  ) => void;
  setJoinWaitlistSuccess: () => void;
}

export default function JoinWaitlistButton({
  setJoinWaitlistFailed,
  setJoinWaitlistSuccess,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { context, isInMiniApp } = useMiniApp();

  const handleJoinWaitlist = async () => {
    setIsLoading(true);

    // Check if user is in miniapp, if not open it
    if (!(await isInMiniApp())) {
      window.open("https://reauction.xyz", "_blank");
      setIsLoading(false);
      return;
    }

    try {
      // Add miniapp using SDK
      const addMiniAppResult = await sdk.actions.addMiniApp();

      if (!addMiniAppResult) {
        throw new Error("Failed to add Mini App");
      }

      // Join waitlist with user info
      if (context?.user) {
        await waitlistAPI.joinWaitlist({
          fid: context.user.fid!.toString(),
          username: context.user.username!,
        });
      } else {
        throw new Error("Not within Mini App context");
      }

      setJoinWaitlistSuccess();
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("Error joining waitlist:", error);
      setJoinWaitlistFailed(
        error instanceof Error ? error.message : "Unknown error",
        handleJoinWaitlist,
        isLoading
      );
      setIsLoading(false);
      return false;
    }
  };

  return (
    <Button
      size="lg"
      className="h-12 rounded-full px-8 text-base font-semibold"
      onClick={handleJoinWaitlist}
      disabled={isLoading}
    >
      {isLoading ? "Joining..." : "Join Waitlist"}{" "}
      <ChevronRight className={`ml-2 h-4 w-4 ${isLoading ? "animate-pulse " : ""}`} />
      <ChevronRight className={`h-4 w-4 ${isLoading ? "animate-pulse " : ""}`} />
      <ChevronRight className={`h-4 w-4 ${isLoading ? "animate-pulse " : ""}`} />
    </Button>
  );
}
