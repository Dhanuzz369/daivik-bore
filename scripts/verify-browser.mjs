async (page) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  const results = [];
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("http://localhost:3000");
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => document.fonts.ready);
  for (const width of [360, 390, 430, 768, 1024, 1280, 1440, 1920]) {
    const height = width < 640 ? 844 : 1000;
    await page.setViewportSize({ width, height });
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({ path: `output/playwright/viewport-${width}.png` });
    for (let y = 0; y < await page.evaluate(() => document.body.scrollHeight); y += 700) {
      await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
    }
    await page.evaluate(() => {
      for (const image of document.images) image.loading = "eager";
      return Promise.race([
        Promise.all([...document.images].map((image) => image.decode().catch(() => {}))),
        new Promise((resolve) => setTimeout(resolve, 8000)),
      ]);
    });
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({ path: `output/playwright/full-${width}.png`, fullPage: true });
    results.push(await page.evaluate(() => ({
      width: innerWidth,
      overflow: document.documentElement.scrollWidth > innerWidth,
      images: [...document.images].filter((image) => !image.naturalWidth).map((image) => image.getAttribute("src")),
      headings: [...document.querySelectorAll("h1,h2,h3")].filter((heading) => {
        if (heading.closest(".project-gallery,.equipment-track")) return false;
        const rect = heading.getBoundingClientRect();
        return rect.left < -1 || rect.right > innerWidth + 1 || heading.scrollWidth > heading.clientWidth + 1;
      }).map((heading) => heading.textContent),
    })));
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  const menuOpened = await page.getByRole("navigation", { name: "Mobile navigation" }).isVisible();
  await page.keyboard.press("Escape");
  const menuClosed = await page.getByRole("button", { name: "Open menu", exact: true }).getAttribute("aria-expanded") === "false";
  await page.getByRole("button", { name: "Farm", exact: true }).click();
  await page.getByRole("heading", { name: "Water for what you grow." }).waitFor();
  await page.getByRole("link", { name: "Discuss my farm site" }).click();
  const selectedRequirement = await page.getByLabel("Requirement", { exact: true }).inputValue();
  const contactPosition = await page.locator("#site-visit").evaluate((element) => element.getBoundingClientRect().top);
  await page.locator(".faq-list summary").first().click();
  const faqOpened = await page.locator(".faq-list details").first().getAttribute("open") !== null;
  await page.getByLabel("Your name", { exact: true }).fill("Preview Test");
  await page.getByLabel("Phone number", { exact: true }).fill("9448417318");
  await page.getByLabel("Site location", { exact: true }).fill("Kanakapura Road");
  // Intercept the handoff: verify the destination without opening or sending WhatsApp.
  await page.evaluate(() => {
    window.__capturedWhatsApp = "";
    window.open = (url) => { window.__capturedWhatsApp = String(url); return null; };
  });
  await page.getByRole("button", { name: "Get free site visit" }).click();
  const whatsapp = await page.evaluate(() => window.__capturedWhatsApp);
  const destination = new URL(whatsapp);
  const message = destination.searchParams.get("text");
  const form = {
    numberCorrect: destination.pathname === "/919448417318",
    fieldsIncluded: ["Preview Test", "9448417318", "Kanakapura Road", "Farm"].every((text) => message.includes(text)),
    honestConfirmation: await page.getByRole("status").innerText(),
  };
  const brokenAnchors = await page.evaluate(() => [...document.querySelectorAll('a[href^="#"]')].map((anchor) => anchor.getAttribute("href")).filter((hash) => !document.getElementById(hash.slice(1))));
  const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
  await page.screenshot({ path: "output/playwright/form-success.png" });
  await page.reload();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  return { results, menuOpened, menuClosed, selectedRequirement, contactPosition, faqOpened, form, brokenAnchors, canonical, errors };
}
