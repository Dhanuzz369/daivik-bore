async (page) => {
  const base = "http://localhost:3001";
  const failures = [];
  const check = (condition, message) => { if (!condition) failures.push(message); };
  for (const path of ["/", "/borewell-services", "/service-areas"]) {
    await page.goto(base + path);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    check(new URL(canonical).href === "https://www.daivikborewells.com" + path, "Canonical: " + path);
    const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
    const graphs = schemas.map(JSON.parse);
    check(!JSON.stringify(graphs).includes("ProfessionalService"), "Deprecated schema: " + path);
    check(JSON.stringify(graphs).includes('"Organization"'), "Business identity missing: " + path);
    if (path !== "/") {
      check(await page.locator('meta[property="og:url"]').getAttribute("content") === "https://www.daivikborewells.com" + path, "Social URL: " + path);
      check(await page.locator('meta[property="og:image"]').count() > 0 && await page.locator('meta[name="twitter:image"]').count() > 0, "Social image: " + path);
      check(JSON.stringify(graphs).includes('"BreadcrumbList"'), "Breadcrumbs: " + path);
    }
  }
  const sitemap = await (await page.request.get(base + "/sitemap.xml")).text();
  check(!sitemap.includes("<lastmod>") && !sitemap.includes("<priority>"), "Sitemap dates/priority");
  check(sitemap.includes("https://www.daivikborewells.com/"), "Sitemap host");
  check(await page.getByText("Nelamangala", {exact:true}).count() > 0, "Confirmed coverage missing");
  const context = await page.context().browser().newContext({javaScriptEnabled:false});
  const fallback = await context.newPage();
  await fallback.goto(base);
  const opacity = await fallback.locator('#site-visit [data-motion="reveal"]').evaluateAll(nodes => nodes.map(n => getComputedStyle(n).opacity));
  check(opacity.every(value => value === "1"), "No-JS contact invisible");
  check(await fallback.getByRole("button", {name:"Get free site visit",exact:true}).isDisabled(), "Native submission not gated");
  await fallback.locator('input[name="name"]').fill("Audit Only");
  await fallback.locator('input[name="phone"]').fill("9000000000");
  await fallback.locator('input[name="location"]').fill("Bengaluru");
  await fallback.locator('select[name="requirement"]').selectOption("home");
  await fallback.locator('input[name="location"]').press("Enter");
  check(!fallback.url().includes("?"), "Native form exposes details in URL");
  await context.close();
  await page.goto(base);
  await page.getByRole("button", {name:"Get free site visit",exact:true}).click();
  check(await page.locator('input[name="name"]').getAttribute("aria-invalid") === "true", "Field error association missing");
  check(await page.evaluate(() => document.activeElement?.getAttribute("name")) === "name", "First invalid field not focused");
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.reload();
  const reduced = await page.locator('[data-motion="reveal"]').evaluateAll(nodes => nodes.every(n => getComputedStyle(n).opacity === "1" && getComputedStyle(n).transform === "none"));
  check(reduced, "Reduced-motion content not immediately visible");
  if (failures.length) throw new Error(failures.join("\n"));
  return {passed:true, routes:3, noJavaScriptFallback:true};
}
