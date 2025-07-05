import { z } from "zod";
import puppeteer from "puppeteer";

type ScreenshotPath = `${string}.png` | `${string}.jpeg`;

function isScreenshotPath(path: string): path is ScreenshotPath {
  return path.endsWith(".png") || path.endsWith(".jpeg");
}

export const screenshotTool = {
  title: "Website Screenshot",
  description: "Takes a screenshot of a website.",
  inputSchema: {
    url: z.string().url(),
    outputPath: z.string(),
    format: z.enum(["png", "jpeg"]).optional(),
    fullPage: z.boolean().optional(),
  },
};

export const screenshotHandler = async ({ url, outputPath, format = "png", fullPage = true }: { url: string; outputPath: string; format?: "png" | "jpeg", fullPage?: boolean }) => {
  try {
    // Ensure the output path has the correct extension
    const extension = `.${format}`;
    let path = outputPath.endsWith(extension) ? outputPath : `${outputPath}${extension}`;

    if (!isScreenshotPath(path)) {
      // This should not happen due to the logic above, but it satisfies TypeScript
      throw new Error("Invalid screenshot path");
    }

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    await page.screenshot({ path, type: format, fullPage });
    await browser.close();

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify({ success: true, outputPath: path }),
        },
      ],
    };
  } catch (error: any) {
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify({ success: false, error: error.message }),
        },
      ],
      isError: true,
    };
  }
};
