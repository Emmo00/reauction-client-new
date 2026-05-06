import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "../../../lib/mongodb";
import { sendNeynarMiniAppNotification } from "../../../lib/neynar";
import type { Waitlist } from "../../../types";

// Lazy import to avoid circular dependencies
async function getWaitlistModel() {
  const { default: WaitlistModel } = await import("../../../models/waitlist");
  return WaitlistModel;
}

class WaitlistServiceLocal {
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

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { fid, username } = body;

    if (!fid || !username) {
      return NextResponse.json(
        { error: "fid and username are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const userExists = await WaitlistServiceLocal.userExists(fid);

    let waitlistEntry;
    if (!userExists) {
      waitlistEntry = await WaitlistServiceLocal.createWaitlistEntry(fid, username);
    } else {
      return NextResponse.json(
        { error: "User already on waitlist" },
        { status: 409 }
      );
    }

    // Send notification to the user
    const notResult = await sendNeynarMiniAppNotification({
      fid: parseInt(fid, 10),
      title: "You're In!", // 32 chars max
      body: `Hello @${username}, you're now on our waitlist!`, // 128 chars max
    });

    console.log("Neynar notification result:", notResult);

    return NextResponse.json(
      {
        message: "User added to waitlist successfully",
        entry: waitlistEntry,
        notification: notResult,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding user to waitlist:", error);
    return NextResponse.json(
      { error: "Failed to add user to waitlist" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = req.nextUrl;
    const action = searchParams.get("action");

    switch (action) {
      case "all":
        const allRecords = await WaitlistServiceLocal.getAllRecords();
        return NextResponse.json({ records: allRecords });

      case "count":
        const count = await WaitlistServiceLocal.getCount();
        return NextResponse.json({ count });

      case "allowed-count":
        const allowedCount = await WaitlistServiceLocal.getAllowedCount();
        return NextResponse.json({ count: allowedCount });

      case "not-allowed-count":
        const notAllowedCount = await WaitlistServiceLocal.getNotAllowedCount();
        return NextResponse.json({ count: notAllowedCount });

      case "stats":
        const [totalCount, allowedCountStats, notAllowedCountStats] = await Promise.all([
          WaitlistServiceLocal.getCount(),
          WaitlistServiceLocal.getAllowedCount(),
          WaitlistServiceLocal.getNotAllowedCount(),
        ]);

        return NextResponse.json({
          total: totalCount,
          allowed: allowedCountStats,
          notAllowed: notAllowedCountStats,
        });

      default:
        return NextResponse.json(
          {
            error: "Invalid action. Use: all, count, allowed-count, not-allowed-count, or stats",
          },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Error fetching waitlist data:", error);
    return NextResponse.json(
      { error: "Failed to fetch waitlist data" },
      { status: 500 }
    );
  }
}
