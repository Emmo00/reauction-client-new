import { APIClient, queryKeys } from "./client";
import type { Waitlist } from "@/types";

export interface WaitlistResponse {
  message: string;
  entry: Waitlist;
}

export interface JoinWaitlistRequest {
  fid: string;
  username: string;
}

/**
 * Waitlist API helper functions
 */
export const waitlistAPI = {
  /**
   * Add a user to the waitlist
   */
  async joinWaitlist(data: JoinWaitlistRequest): Promise<WaitlistResponse> {
    return APIClient.post<WaitlistResponse>("/api/waitlist", data);
  },
};

/**
 * Query keys for waitlist queries
 */
export const waitlistQueryKeys = {
  all: ['waitlist'] as const,
} as const;
