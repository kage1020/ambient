import { expect, type Locator, type Page } from "@playwright/test"
import en from "../src/assets/languages/lang-en.json"
import ja from "../src/assets/languages/lang-ja.json"

export const locales = ["en", "ja"] as const
export type Locale = (typeof locales)[number]

const translations = { en, ja }

export function label(locale: Locale, key: keyof typeof en) {
  return translations[locale][key]
}

export async function openViewer(page: Page, locale: Locale) {
  // Keep layout checks independent of YouTube availability
  await page.route(/youtube\.com|ytimg\.com|googlevideo\.com/, (route) =>
    route.abort()
  )
  await page.goto(
    `/${locale}?playlist=mili.json&mediaIndex=0&seed=1&shuffle=false`
  )
  await expect(video(page)).toBeAttached()
  // The player stops changing its playing state once it reports the load error
  await expect(errorNotice(page, locale)).toBeVisible()
}

export function errorNotice(page: Page, locale: Locale) {
  return page
    .getByRole("alert")
    .filter({ hasText: label(locale, "Failed to load the video.") })
}

export function viewer(page: Page) {
  return page.getByTestId("viewer")
}

export function videoFrame(page: Page) {
  return page.getByTestId("video-frame")
}

export function video(page: Page) {
  return videoFrame(page).locator(":scope > div")
}

export function thumbnail(page: Page) {
  return page.getByTestId("thumbnail")
}

export function bottomMenu(page: Page) {
  return page.getByTestId("bottom-menu")
}

export function menuButton(
  page: Page,
  locale: Locale,
  key: "Play" | "Pause" | "Playlist" | "Settings"
) {
  return bottomMenu(page).getByRole("button", {
    name: label(locale, key),
    exact: true,
  })
}

export function actionButtons(page: Page, locale: Locale) {
  return [
    page.getByRole("button", {
      name: label(locale, "Hide Thumbnail"),
      exact: true,
    }),
    page.getByRole("button", { name: label(locale, "Expand"), exact: true }),
    page.getByRole("button", {
      name: label(locale, "Fullscreen"),
      exact: true,
    }),
    page.getByRole("link", {
      name: label(locale, "Watch on YouTube"),
      exact: true,
    }),
  ]
}

export function drawer(
  page: Page,
  locale: Locale,
  title: "Playlist" | "Settings"
) {
  return page.getByRole("dialog").filter({
    has: page.getByRole("heading", { name: label(locale, title), exact: true }),
  })
}

export function viewportWidth(page: Page) {
  const size = page.viewportSize()
  if (!size) throw new Error("viewport size is not fixed")
  return size.width
}

export async function settledBox(locator: Locator) {
  await locator.page().evaluate(() =>
    Promise.all(
      document
        .getAnimations()
        .filter((a) => a.effect?.getComputedTiming().endTime !== Infinity)
        .map((a) => a.finished.catch(() => undefined))
    )
  )
  const box = await locator.boundingBox()
  if (!box) throw new Error("element is not rendered")
  return box
}

export async function lineCount(locator: Locator) {
  return locator.evaluate((el) => {
    const style = getComputedStyle(el)
    const contentHeight =
      el.clientHeight -
      Number.parseFloat(style.paddingTop) -
      Number.parseFloat(style.paddingBottom)
    return contentHeight / Number.parseFloat(style.lineHeight)
  })
}

type Box = { x: number; y: number; width: number; height: number }

// Tolerates sub-pixel rounding from centering
const epsilon = 0.5

export function expectWithinHorizontally(box: Box, left: number, right: number) {
  expect(box.x).toBeGreaterThanOrEqual(left - epsilon)
  expect(box.x + box.width).toBeLessThanOrEqual(right + epsilon)
}

export function expectWidescreen(box: Box) {
  expect(box.width / box.height).toBeCloseTo(16 / 9, 1)
}
