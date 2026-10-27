async (page) => {
  const base = new URL(page.url()).origin;
  const failures = [];
  const check = (condition, message) => { if (!condition) failures.push(message); };
  for (const path of ["/", "/borewell-services", "/service-areas"]) {
    await page.goto(base + path);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    check(new URL(canonical).href === "https://www.daivikborewells.com" + path, "Canonical: " + path);
    const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
    const graphs = schemas.map(JSON.parse);
    check(!JSON.stringify(graphs).includes("ProfessionalService"), "Deprecated schema: " + path);
    check(JSON.stringify(graphs).includes('"LocalBusiness"'), "Business identity missing: " + path);
    if (path !== "/") {
      check(await page.locator('meta[property="og:url"]').getAttribute("content") === "https://www.daivikborewells.com" + path, "Social URL: " + path);
      check(await page.locator('meta[property="og:image"]').count() > 0 && await page.locator('meta[name="twitter:image"]').count() > 0, "Social image: " + path);
      check(JSON.stringify(graphs).includes('"BreadcrumbList"'), "Breadcrumbs: " + path);
    }
    if (path === "/service-areas") {
      const entities = graphs.flatMap(graph => graph["@graph"] || [graph]);
      const service = entities.find(entity => entity["@type"] === "Service");
      const schemaAreas = [...new Set((service?.areaServed || []).map(area => area.name))].sort();
      const visibleAreas = [...new Set(await page.locator('.area-directory span, section:has(h2:text-is("Industrial sites and surrounding corridors")) li').allTextContents())].sort();
      check(JSON.stringify(schemaAreas) === JSON.stringify(visibleAreas), "Service coverage does not match visible coverage");
      for (const label of ["Bhartiya City / Thanisandra", "Bengaluru Aerospace Park", "EPIP Whitefield", "Bommasandra", "Peenya", "Bidadi", "Harohalli"]) {
        check(await page.getByText(label, {exact:true}).count() > 0, "Coverage label missing: " + label);
        check(schemaAreas.includes(label), "Structured coverage missing: " + label);
      }
      check(await page.getByRole("heading", {name:"Industrial sites and surrounding corridors"}).count() === 1, "Grouped industrial coverage missing");
    }
    if (path === "/borewell-services") {
      for (const heading of ["What does a site assessment cover?", "Can my existing borewell be deepened?", "What should I share for pump installation?"]) {
        check(await page.getByRole("heading", {name:heading, exact:true}).count() === 1, "Service answer missing: " + heading);
      }
    }
  }
  const sitemap = await (await page.request.get(base + "/sitemap.xml")).text();
  const lastmods = sitemap.match(/<lastmod>([^<]+)<\/lastmod>/g) || [];
  check(lastmods.length === (sitemap.match(/<loc>/g) || []).length && lastmods.every(tag => /\d{4}-\d{2}-\d{2}/.test(tag)), "Sitemap lastmod");
  check(!sitemap.includes("<priority>"), "Sitemap priority");
  check(sitemap.includes("https://www.daivikborewells.com/"), "Sitemap host");
  await page.goto(base + "/service-areas");
  const publishedCount = await page.locator('a[href^="/service-areas/"]').count();
  check((sitemap.match(/<loc>/g) || []).length === 3 + publishedCount, "Unexpected sitemap routes");
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
  await fallback.goto(base + "/service-areas");
  check(await fallback.getByRole("heading", {name:"Industrial sites and surrounding corridors"}).isVisible(), "No-JS coverage missing");
  await fallback.goto(base + "/borewell-services");
  check(await fallback.getByRole("heading", {name:"What does a site assessment cover?",exact:true}).isVisible(), "No-JS service answer missing");
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
