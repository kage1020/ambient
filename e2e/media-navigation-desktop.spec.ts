import { expect, type Page, test } from "@playwright/test"
import mili from "../src/assets/playlists/mili.json"
import { drawer, label, openViewer, thumbnail } from "./viewer"

const locale = "en"
const mediaList = mili.Mili

// Fails any server round trip so switching media has to work without one
async function cutOffServer(page: Page) {
  const requests: string[] = []
  await page.route("**/*", (route) => {
    if (!route.request().headers()["rsc"]) return route.fallback()
    requests.push(route.request().url())
    return route.abort()
  })
  return requests
}

async function expectCurrentMedia(page: Page, index: number) {
  const media = mediaList[index]

  await expect(page).toHaveURL(new RegExp(`[?&]mediaIndex=${index}(&|$)`))
  await expect(thumbnail(page).getByRole("img")).toHaveAttribute(
    "alt",
    media.title
  )
  await expect(
    page.getByRole("link", { name: label(locale, "Watch on YouTube") })
  ).toHaveAttribute("href", `https://www.youtube.com/watch?v=${media.videoid}`)
  await expect(
    drawer(page, locale, "Playlist").getByRole("button", {
      name: media.title,
    })
  ).toHaveAttribute("aria-current", "true")
  await expect(page).toHaveTitle(
    `${media.title} - ${label(locale, "Ambient Media Player")}`
  )
}

test.describe("moving between media", () => {
  let serverRequests: string[]

  test.beforeEach(async ({ page }) => {
    await openViewer(page, locale)
    serverRequests = await cutOffServer(page)
    await expectCurrentMedia(page, 0)
  })

  test("next and previous buttons switch media without the server", async ({
    page,
  }) => {
    await page
      .getByRole("button", { name: label(locale, "Next Item"), exact: true })
      .click()
    await expectCurrentMedia(page, 1)

    await page
      .getByRole("button", {
        name: label(locale, "Previous Item"),
        exact: true,
      })
      .click()
    await expectCurrentMedia(page, 0)

    expect(serverRequests).toEqual([])
  })

  test("an item picked from the playlist plays without the server", async ({
    page,
  }) => {
    await drawer(page, locale, "Playlist")
      .getByRole("button", { name: mediaList[2].title })
      .click()

    await expectCurrentMedia(page, 2)
    expect(serverRequests).toEqual([])
  })

  test("browser back returns to the previous media without the server", async ({
    page,
  }) => {
    await drawer(page, locale, "Playlist")
      .getByRole("button", { name: mediaList[3].title })
      .click()
    await expectCurrentMedia(page, 3)

    await page.goBack()

    await expectCurrentMedia(page, 0)
    expect(serverRequests).toEqual([])
  })
})
