import type { Waitlist } from "../types";

// Lazy import to avoid circular dependencies
async function getWaitlistModel() {
  const { default: WaitlistModel } = await import("../models/waitlist");
  return WaitlistModel;
}

export class WaitlistService {
  static async createWaitlistEntry(fid: string, username: string): Promise<Waitlist> {
    const WaitlistModel = await getWaitlistModel();
    const waitlistEntry = new WaitlistModel({ fid, username });
    return await waitlistEntry.save();
  }

  static async getAllRecords(): Promise<Waitlist[]> {
    const WaitlistModel = await getWaitlistModel();
    return await WaitlistModel.find({}).sort({ createdAt: -1 }).exec();
  }

  static async getCount(): Promise<number> {
    const WaitlistModel = await getWaitlistModel();
    return await WaitlistModel.countDocuments({});
  }

  static async getAllowedCount(): Promise<number> {
    const WaitlistModel = await getWaitlistModel();
    return await WaitlistModel.countDocuments({ allowed: true });
  }

  static async getNotAllowedCount(): Promise<number> {
    const WaitlistModel = await getWaitlistModel();
    return await WaitlistModel.countDocuments({ allowed: false });
  }

  static async userExists(fid: string): Promise<boolean> {
    const WaitlistModel = await getWaitlistModel();
    const user = await WaitlistModel.findOne({ fid });
    return user !== null;
  }

  static async updateAllowedStatus(fid: string, allowed: boolean): Promise<Waitlist | null> {
    const WaitlistModel = await getWaitlistModel();
    return await WaitlistModel.findOneAndUpdate(
      { fid },
      { allowed },
      { new: true }
    );
  }
}
