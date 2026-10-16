import { expect, test } from "@playwright/test"
import {
  actionButtons,
  bottomMenu,
  drawer,
  errorNotice,
  expectWidescreen,
  expectWithinHorizontally,
  label,
  lineCount,
  locales,
  menuButton,
  openViewer,
  settledBox,
  thumbnail,
  video,
  videoFrame,
  viewer,
  viewportWidth,
} from "./viewer"

for (const locale of locales) {
  test.describe(`viewer on a phone (${locale})`, () => {
    test.beforeEach(async ({ page }) => {
      await openViewer(page, locale)
    })

    test("keeps the viewer usable after the video fails to load", async ({
      page,
    }) => {
      await expect(errorNotice(page, locale)).toBeVisible()
      await expect(videoFrame(page)).toBeVisible()
      await expect(menuButton(page, locale, "Play")).toBeEnabled()
    })

    test("video fits the viewport at 16:9 and keeps its size across play and pause", async ({
      page,
    }) => {
      const width = viewportWidth(page)

      await menuButton(page, locale, "Play").click()
      await expect(menuButton(page, locale, "Pause")).toBeVisible()
      const playing = await settledBox(video(page))

      await menuButton(page, locale, "Pause").click()
      await expect(menuButton(page, locale, "Play")).toBeVisible()
      const paused = await settledBox(video(page))

      for (const box of [playing, paused]) {
        expectWithinHorizontally(box, 0, width)
        expectWidescreen(box)
      }
      expect(paused).toEqual(playing)
    })

    test("action buttons fit the viewport with single-line labels", async ({
      page,
    }) => {
      const width = viewportWidth(page)

      for (const action of actionButtons(page, locale)) {
        expectWithinHorizontally(await settledBox(action), 0, width)
        expect(await lineCount(action)).toBeLessThan(1.5)
      }
    })

    test("action buttons can be scrolled clear of the bottom menu", async ({
      page,
    }) => {
      await viewer(page).evaluate((el) => el.scrollTo(0, el.scrollHeight))
      const menu = await settledBox(bottomMenu(page))

      for (const action of actionButtons(page, locale)) {
        const box = await settledBox(action)
        expect(box.y + box.height).toBeLessThanOrEqual(menu.y)
      }
    })

    test("bottom menu keeps a gutter on both sides", async ({ page }) => {
      const width = viewportWidth(page)

      expectWithinHorizontally(await settledBox(bottomMenu(page)), 8, width - 8)
    })

    test("thumbnail fits the viewport at 16:9", async ({ page }) => {
      const box = await settledBox(thumbnail(page))

      expectWithinHorizontally(box, 0, viewportWidth(page))
      expectWidescreen(box)
    })

    test("expanded video keeps the full width while a drawer overlays it", async ({
      page,
    }) => {
      const width = viewportWidth(page)

      await page
        .getByRole("button", { name: label(locale, "Expand"), exact: true })
        .click()
      await menuButton(page, locale, "Playlist").click()
      await expect(drawer(page, locale, "Playlist")).toBeInViewport()
      const box = await settledBox(video(page))

      expectWithinHorizontally(box, 0, width)
      expect(box.width).toBeGreaterThanOrEqual(width * 0.9)
    })
  })
}
