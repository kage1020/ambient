import { getTranslation } from "@/libs/i18n"
import { ImageResponse } from "next/og"

export async function generateImageMetadata() {
  const t = await getTranslation()

  return [
    {
      id: "og",
      alt: t["Ambient Media Player"],
      size: { width: 1200, height: 630 },
      contentType: "image/png",
    },
  ]
}

export default async function generateImage({ id }: { id: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "4rem",
          width: "100%",
          height: "100%",
        }}
      >
        <svg
          id={id}
          width="272.126px"
          height="272.126px"
          viewBox="0 0 272.126 272.126"
        >
          <g>
            <polygon
              display="inline"
              fillRule="evenodd"
              clipRule="evenodd"
              fill="#008080"
              points="109.063,73.563 124.063,103.563 45.563,241.063 15.063,241.063"
            />
            <polygon
              display="inline"
              fillRule="evenodd"
              clipRule="evenodd"
              fill="#4682B4"
              points="135.063,31.063 120.063,56.563 226.563,241.063 257.063,241.063"
            />
            <polygon
              display="inline"
              fillRule="evenodd"
              clipRule="evenodd"
              fill="#7B68EE"
              points="81.063,215.563 190.063,215.563 204.563,241.063 66.063,241.063"
            />
            <polygon
              display="inline"
              fillRule="evenodd"
              clipRule="evenodd"
              fill="#8FBC8B"
              points="135.063,121.563 179.563,198.063 92.063,198.063"
            />
          </g>
        </svg>
        <span style={{ fontSize: "8rem" }}>+</span>
        <svg
          width="180"
          height="180"
          viewBox="0 0 180 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="paint0_linear_408_134"
              x1="109"
              y1="116.5"
              x2="144.5"
              y2="160.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="white" />
              <stop offset="1" stop-color="white" stop-opacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_408_134"
              x1="121"
              y1="54"
              x2="120.799"
              y2="106.875"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="white" />
              <stop offset="1" stop-color="white" stop-opacity="0" />
            </linearGradient>
          </defs>
          <g>
            <circle cx="90" cy="90" r="90" fill="black" />
            <path
              d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
              fill="url(#paint0_linear_408_134)"
            />
            <rect
              x="115"
              y="54"
              width="12"
              height="72"
              fill="url(#paint1_linear_408_134)"
            />
          </g>
        </svg>
      </div>
    )
  )
}
