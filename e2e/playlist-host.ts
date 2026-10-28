import { createServer } from "node:http"
import type { AddressInfo } from "node:net"
import mili from "../src/assets/playlists/mili.json"

type Behavior = "respond" | "fail" | "hang"

export type PlaylistHost = Awaited<ReturnType<typeof startPlaylistHost>>

// Serves a remote playlist to the app server, which fetches it during render
export async function startPlaylistHost() {
  let behavior: Behavior = "respond"
  let requests = 0

  const server = createServer((_req, res) => {
    requests++
    if (behavior === "hang") return
    if (behavior === "fail") {
      res.statusCode = 503
      res.end()
      return
    }
    res.setHeader("content-type", "application/json")
    res.end(JSON.stringify(mili))
  })
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve))
  const { port } = server.address() as AddressInfo

  return {
    url: `http://127.0.0.1:${port}/playlist.json`,
    get requests() {
      return requests
    },
    behave(next: Behavior) {
      behavior = next
    },
    close() {
      server.closeAllConnections()
      return new Promise<void>((resolve) => server.close(() => resolve()))
    },
  }
}
