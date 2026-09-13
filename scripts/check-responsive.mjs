/**
 * Fails if any page scrolls horizontally, or if an element sticks out past the
 * viewport, at phone, tablet and desktop widths. A headless screenshot cannot
 * be trusted for this — it lays out wide and crops — so the check measures in
 * the page instead.
 *
 *   npm run build && npm run start &
 *   npm run check:responsive
 */
import { chromium } from "playwright-core";

const BASE = process.env.CHECK_URL ?? "http://localhost:3000";
const EXECUTABLE =
  process.env.CHROME_PATH ?? "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

const PATHS = [
  "/",
  "/tarifs",
  "/outils/indexation-energie",
  "/contact",
  "/blog",
  "/mentions-legales",
  "/en",
  "/en/pricing",
];
const WIDTHS = [390, 820, 1440];

const browser = await chromium.launch({ executablePath: EXECUTABLE, args: ["--no-sandbox"] });
let failures = 0;

for (const width of WIDTHS) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  for (const path of PATHS) {
    await page.goto(BASE + path, { waitUntil: "networkidle" });
    const result = await page.evaluate(() => {
      const viewport = document.documentElement.clientWidth;

      // Ground truth: try to scroll sideways and see whether it moves.
      // documentElement.scrollWidth counts content inside nested scroll
      // containers, so a table in its own overflow-x box reads as a false
      // positive there while the viewport never actually scrolls.
      const before = window.scrollX;
      window.scrollTo(viewport * 4, window.scrollY);
      const scrolls = window.scrollX > 0;
      window.scrollTo(before, window.scrollY);

      // A table or diagram may exceed the viewport as long as it sits in its
      // own scroll container; anything else that sticks out is a layout bug.
      const insideScroller = (el) => {
        for (let node = el.parentElement; node; node = node.parentElement) {
          const overflowX = getComputedStyle(node).overflowX;
          if (overflowX === "auto" || overflowX === "hidden" || overflowX === "scroll") return true;
        }
        return false;
      };

      const offenders = [];
      for (const el of document.querySelectorAll("body *")) {
        if (getComputedStyle(el).position === "fixed") continue;
        const box = el.getBoundingClientRect();
        if (box.width === 0 || insideScroller(el)) continue;

        // In a left-to-right page only right-side overflow creates a
        // scrollbar. A modest negative left is still worth reporting — an
        // element peeking out of the gutter — but anything parked far
        // off-canvas is deliberate, like the contact form's honeypot.
        if (box.right > viewport + 1 || (box.left < -1 && box.left > -200)) {
          offenders.push(
            `${el.tagName.toLowerCase()}.${String(el.className).split(" ").slice(0, 2).join(".")}`
          );
        }
      }

      return { scrolls, offenders: offenders.slice(0, 4) };
    });

    if (result.scrolls || result.offenders.length > 0) {
      failures++;
      console.error(`✗ ${width}px ${path}`);
      if (result.scrolls) console.error("    la page défile horizontalement");
      result.offenders.forEach((o) => console.error(`    dépasse : ${o}`));
    }
  }
  await page.close();
  console.log(`${width}px — ${PATHS.length} pages vérifiées`);
}

await browser.close();
if (failures > 0) {
  console.error(`\n${failures} problème(s) de largeur.`);
  process.exit(1);
}
console.log("\nAucun débordement horizontal.");
