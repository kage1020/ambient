import { expect, type Page, test } from "@playwright/test"
import { type PlaylistHost, startPlaylistHost } from "./playlist-host"
import {
  gotoViewer,
  label,
  type Locale,
  locales,
  openViewer,
  viewer,
} from "./viewer"

// Vercel stops a function after 10 seconds, which leaves the page broken
const serverlessTimeLimit = 10_000

function retryButton(page: Page, locale: Locale) {
  return page.getByRole("button", { name: label(locale, "Retry"), exact: true })
}

async function selectCategory(page: Page, locale: Locale, category: string) {
  await page
    .getByRole("combobox", { name: label(locale, "Target Category") })
    .selectOption(category)
}

for (const locale of locales) {
  test.describe(`remote playlist (${locale})`, () => {
    let host: PlaylistHost

    test.beforeEach(async ({ page }) => {
      host = await startPlaylistHost()
      await openViewer(page, locale, host.url)
    })

    test.afterEach(async () => {
      await host.close()
    })

    test("a page render fetches the playlist once", async () => {
      expect(host.requests).toBe(1)
    })

    test("shows a retry prompt instead of hanging when the playlist host stops responding", async ({
      page,
    }) => {
      host.behave("hang")
      await selectCategory(page, locale, "Mili")

      await expect(
        page
          .getByRole("alert")
          .filter({ hasText: label(locale, "Failed to load the page.") })
      ).toBeVisible({ timeout: serverlessTimeLimit })
      await expect(retryButton(page, locale)).toBeVisible()
    })

    test("shows a retry prompt when the playlist host answers with an error", async ({
      page,
    }) => {
      host.behave("fail")
      await selectCategory(page, locale, "Mili")

      await expect(retryButton(page, locale)).toBeVisible()
    })

    test("retry restores the player in place once the playlist host recovers", async ({
      page,
    }) => {
      host.behave("fail")
      await selectCategory(page, locale, "Mili")
      await expect(retryButton(page, locale)).toBeVisible()
      await page.evaluate(() => Object.assign(window, { notReloaded: true }))

      host.behave("respond")
      await retryButton(page, locale).click()

      await expect(viewer(page)).toBeVisible()
      await expect(retryButton(page, locale)).toBeHidden()
      expect(await page.evaluate(() => "notReloaded" in window)).toBe(true)
    })
  })

  test.describe(`remote playlist unavailable on first load (${locale})`, () => {
    let host: PlaylistHost

    test.beforeEach(async () => {
      host = await startPlaylistHost()
      host.behave("fail")
    })

    test.afterEach(async () => {
      await host.close()
    })

    test("retry restores the player once the playlist host recovers", async ({
      page,
    }) => {
      await gotoViewer(page, locale, host.url)
      await expect(retryButton(page, locale)).toBeVisible()

      host.behave("respond")
      await retryButton(page, locale).click()

      await expect(viewer(page)).toBeVisible()
      await expect(retryButton(page, locale)).toBeHidden()
    })
  })
}
