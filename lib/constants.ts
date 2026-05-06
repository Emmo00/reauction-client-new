import { type AccountAssociation } from "@farcaster/miniapp-core/src/manifest";

// --- Launch Configuration ---
/**
 * Show prelaunch/waitlist page instead of marketplace
 * Set via NEXT_PUBLIC_PRE_LAUNCH environment variable
 */
export const PRE_LAUNCH = process.env.NEXT_PUBLIC_PRE_LAUNCH === "true";

// --- App Configuration ---
export const APP_NAME = "Reauction";
export const APP_DESCRIPTION = "Resell Farcaster Collectible Casts";
export const APP_OG_IMAGE_URL = "https://reauction.xyz/og-image.png";

/**
 * The base URL of the application.
 * Used for generating absolute URLs for assets and API endpoints.
 */
export const APP_URL: string = process.env.NEXT_PUBLIC_URL || "https://reauction.xyz";

/**
 * The primary category for the mini app.
 * Used for app store categorization and discovery.
 */
export const APP_PRIMARY_CATEGORY = "collectibles";

/**
 * Tags associated with the mini app.
 * Used for search and discovery in app stores.
 */
export const APP_TAGS = ["collectibles", "nft", "auction"];

// --- Asset URLs ---
/**
 * URL for the app's icon image.
 * Used in app store listings and UI elements.
 */
export const APP_ICON_URL: string = `${APP_URL}/icon.png`;

/**
 * URL for the app's splash screen image.
 * Displayed during app loading.
 */
export const APP_SPLASH_URL: string = `${APP_URL}/splash.png`;

/**
 * Background color for the splash screen.
 * Used as fallback when splash image is loading.
 */
export const APP_SPLASH_BACKGROUND_COLOR: string = "#1a1a1a";

/**
 * Text displayed on the main action button.
 * Used for the primary call-to-action in the mini app.
 */
export const APP_BUTTON_TEXT = "Launch Reauction";

/**
 * Account association for the mini app.
 * Used to associate the mini app with a Farcaster account.
 * If not provided, the mini app will be unsigned and have limited capabilities.
 * TODO: This needs to be signed with a valid Farcaster account custody/auth address
 */
export const APP_ACCOUNT_ASSOCIATION: AccountAssociation | undefined = undefined;

// --- Integration Configuration ---
/**
 * Webhook URL for receiving events from Neynar.
 * If not set, webhook events won't be processed.
 */
export const APP_WEBHOOK_URL: string | undefined = undefined;

/**
 * Flag to enable/disable analytics tracking.
 * When true, usage analytics are collected and sent to Neynar.
 * When false, analytics collection is disabled.
 */
export const ANALYTICS_ENABLED = false;

/**
 * Flag to enable/disable wallet functionality.
 * When true, wallet-related components and features are rendered.
 * When false, wallet functionality is completely hidden from the UI.
 */
export const USE_WALLET = true;

/**
 * Required chains for the mini app.
 * Contains an array of CAIP-2 identifiers for blockchains that the mini app requires.
 * If empty or undefined, the mini app will be rendered regardless of chain support.
 */
export const APP_REQUIRED_CHAINS: string[] = [];

/**
 * Return URL for the mini app.
 * If provided, the mini app will be rendered with a return URL to be rendered if the
 * back button is pressed from the home page.
 */
export const RETURN_URL: string | undefined = undefined;
