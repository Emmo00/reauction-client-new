/**
 * Send a mini app notification to a user via Neynar
 */
export async function sendNeynarMiniAppNotification({
  fid,
  title,
  body,
  targetUrl = "https://reauction.xyz",
}: {
  fid: number;
  title: string;
  body: string;
  targetUrl?: string;
}): Promise<any> {
  try {
    // Validate title length (1-32 characters)
    if (!title || title.length === 0 || title.length > 32) {
      throw new Error(
        `Title must be between 1 and 32 characters. Current length: ${title?.length}`
      );
    }

    // Validate body length (1-128 characters)
    if (!body || body.length === 0 || body.length > 128) {
      throw new Error(`Body must be between 1 and 128 characters. Current length: ${body?.length}`);
    }

    // Validate URL format
    try {
      new URL(targetUrl);
    } catch {
      throw new Error(`Invalid target URL: ${targetUrl}`);
    }

    const targetFids = [fid];
    const notification = {
      title: title.trim(),
      body: body.trim(),
      target_url: targetUrl,
    };

    console.log("Sending notification with payload:", {
      notification,
      targetFids,
    });

    // Make request to Neynar API
    const response = await fetch("https://api.neynar.com/v2/farcaster/frame/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEYNAR_API_KEY || "",
      },
      body: JSON.stringify({
        notification,
        target_fids: targetFids,
        filters: {},
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw error;
    }

    const result = await response.json();
    console.log("Neynar mini app notification result:", result);
    return result;
  } catch (error) {
    const resp = (error as any)?.response?.data ?? (error instanceof Error ? error.message : String(error));
    console.error("Error sending Neynar notification:", error);
    return { state: "error", response: resp };
  }
}
