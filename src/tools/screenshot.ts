import { z } from "zod";
import puppeteer from "puppeteer";

export const screenshotTool = {
  title: "Website Screenshot",
  description: "Takes a screenshot of a website.",
  inputSchema: {
    url: z.string().url(),
    outputPath: z.string(),
  },
};

export const screenshotHandler = async ({ url, outputPath }: { url: string; outputPath: string }) => {
  try {
    // Ensure the output path has a .png extension
    const path = (outputPath.endsWith(".png") ? outputPath : `${outputPath}.png`) as `${string}.png`;

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    await page.screenshot({ path, fullPage: true });
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
