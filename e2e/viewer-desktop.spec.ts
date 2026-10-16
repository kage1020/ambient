import { expect, test } from "@playwright/test"
import {
  drawer,
  expectWidescreen,
  expectWithinHorizontally,
  label,
  menuButton,
  openViewer,
  settledBox,
  video,
  viewportWidth,
} from "./viewer"

const locale = "en"

test.describe("viewer on desktop", () => {
  test.beforeEach(async ({ page }) => {
    await openViewer(page, locale)
    await expect(drawer(page, locale, "Playlist")).toBeInViewport()
    await expect(drawer(page, locale, "Settings")).toBeInViewport()
  })

  test("video is 16:9 and no wider than 672px", async ({ page }) => {
    const box = await settledBox(video(page))

    expectWidescreen(box)
    expect(box.width).toBeGreaterThanOrEqual(640)
    expect(box.width).toBeLessThanOrEqual(672)
  })

  test("expanded video fills the space between both drawers", async ({
    page,
  }) => {
    await page
      .getByRole("button", { name: label(locale, "Expand"), exact: true })
      .click()
    const playlist = await settledBox(drawer(page, locale, "Playlist"))
    const settings = await settledBox(drawer(page, locale, "Settings"))
    const box = await settledBox(video(page))
    const left = playlist.x + playlist.width

    expectWithinHorizontally(box, left, settings.x)
    expect(box.width).toBeGreaterThanOrEqual((settings.x - left) * 0.95)
  })

  test("expanded video extends to the right edge once the settings drawer closes", async ({
    page,
  }) => {
    const width = viewportWidth(page)

    await page
      .getByRole("button", { name: label(locale, "Expand"), exact: true })
      .click()
    await menuButton(page, locale, "Settings").click()
    await expect(drawer(page, locale, "Settings")).not.toBeInViewport()
    const playlist = await settledBox(drawer(page, locale, "Playlist"))
    const box = await settledBox(video(page))
    const left = playlist.x + playlist.width

    expectWithinHorizontally(box, left, width)
    expect(box.width).toBeGreaterThanOrEqual((width - left) * 0.95)
  })
})
