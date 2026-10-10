async (page) => {
  const results = [];
  for (const [width, height] of [[390, 844], [360, 800], [1440, 900]]) {
    await page.setViewportSize({ width, height });
    await page.reload();
    await page.locator('.location-hero-image').evaluate(image => image.decode());
    const result = await page.evaluate(() => {
      const band = document.querySelector('.location-assurance').getBoundingClientRect();
      const contact = document.querySelector('.mobile-contact');
      const reservedTop = contact && getComputedStyle(contact).display !== 'none' ? contact.getBoundingClientRect().top : innerHeight;
      return { bandTop: band.top, reservedTop, hint: reservedTop - band.top, overflow: document.documentElement.scrollWidth > innerWidth,
        imageVisible: document.querySelector('.location-hero-image').naturalWidth > 0 && document.querySelector('.location-hero-image').getBoundingClientRect().height > 0,
        ctasFit: [...document.querySelectorAll('.location-actions a')].every(node => node.scrollWidth <= node.clientWidth && node.getBoundingClientRect().bottom < reservedTop) };
    });
    if (result.hint < 20 || result.overflow || !result.imageVisible || !result.ctasFit) throw new Error(JSON.stringify({ width, height, ...result }));
    results.push({ width, height, ...result });
    await page.screenshot({ path: `output/playwright/task3-location-${width}.png` });
  }
  return results;
}
