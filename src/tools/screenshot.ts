import { z } from "zod";
import puppeteer, { KnownDevices, Device } from "puppeteer";

type ScreenshotPath = `${string}.png` | `${string}.jpeg`;

function isScreenshotPath(path: string): path is ScreenshotPath {
  return path.endsWith(".png") || path.endsWith(".jpeg");
}

const DEVICE_ID_MAP: Record<string, string> = {
  'ios-large': 'iPhone 14 Pro Max',
  'ios-small': 'iPhone SE',
  'android-large': 'Pixel 6 Pro',
  'android-medium': 'Galaxy S8',
  'tablet-large': 'iPad Pro 11',
  'tablet-small': 'iPad Mini',
  'laptop-hidpi': 'Laptop with HiDPI screen',
  'laptop-mdpi': 'Laptop with MDPI screen',
};

type DeviceId = keyof typeof DEVICE_ID_MAP;

const screenshotSchema = z.object({
  url: z.string().url(),
  outputPath: z.string(),
  format: z.enum(["png", "jpeg"]).optional(),
  fullPage: z.boolean().optional(),
  device: z.enum(Object.keys(DEVICE_ID_MAP) as [DeviceId, ...DeviceId[]]).default('laptop-hidpi'),
});

type ScreenshotParams = z.infer<typeof screenshotSchema>;

export const screenshotTool = {
  title: "Website Screenshot",
  description: "Takes a screenshot of a website.",
  inputSchema: screenshotSchema.shape,
};

export const screenshotHandler = async ({ url, outputPath, format = "png", fullPage = true, device }: ScreenshotParams) => {
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

    const deviceName = DEVICE_ID_MAP[device];
    const deviceToEmulate = KnownDevices[deviceName as keyof typeof KnownDevices];
    await page.emulate(deviceToEmulate);
    
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
