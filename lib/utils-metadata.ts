export function getMiniAppEmbedMetadata() {
  return {
    version: "vNext",
    imageAspectRatio: "1:1",
    buttons: [
      {
        label: "Launch App",
        action: {
          type: "launch_frame",
          launchFrame: "https://reauction.xyz",
        },
      },
    ],
  };
}

export function cn(...classes: (string | undefined | null | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}
