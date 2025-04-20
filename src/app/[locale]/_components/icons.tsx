type IconProps = React.SVGProps<SVGSVGElement>

export function ExternalLink(props: IconProps) {
  return (
    <svg
      aria-hidden="true"
      aria-label="external-link"
      fill="none"
      viewBox="0 0 18 18"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
      />
    </svg>
  )
}

export function Previous(props: IconProps) {
  return (
    <svg
      aria-label="previous"
      aria-hidden="true"
      fill="none"
      viewBox="0 0 6 10"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 1 1 5l4 4"
      />
    </svg>
  )
}

export function Next(props: IconProps) {
  return (
    <svg
      aria-hidden="true"
      aria-label="next"
      fill="none"
      viewBox="0 0 6 10"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m1 9 4-4-4-4"
      />
    </svg>
  )
}

export function Playlist(props: IconProps) {
  return (
    <svg
      aria-hidden="true"
      aria-label="play-list"
      fill="currentColor"
      viewBox="0 0 18 16"
      {...props}
    >
      <path d="M14.316.051A1 1 0 0 0 13 1v8.473A4.49 4.49 0 0 0 11 9c-2.206 0-4 1.525-4 3.4s1.794 3.4 4 3.4 4-1.526 4-3.4a2.945 2.945 0 0 0-.067-.566c.041-.107.064-.22.067-.334V2.763A2.974 2.974 0 0 1 16 5a1 1 0 0 0 2 0C18 1.322 14.467.1 14.316.051ZM10 3H1a1 1 0 0 1 0-2h9a1 1 0 1 1 0 2Z" />
      <path d="M10 7H1a1 1 0 0 1 0-2h9a1 1 0 1 1 0 2Zm-5 4H1a1 1 0 0 1 0-2h4a1 1 0 1 1 0 2Z" />
    </svg>
  )
}

export function Refresh(props: IconProps) {
  return (
    <svg
      aria-hidden="true"
      aria-label="refresh"
      fill="none"
      viewBox="0 0 18 20"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"
      />
    </svg>
  )
}

export function Play(props: IconProps) {
  return (
    <svg
      aria-label="play"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 14 16"
      {...props}
    >
      <path d="M0 .984v14.032a1 1 0 0 0 1.506.845l12.006-7.016a.974.974 0 0 0 0-1.69L1.506.139A1 1 0 0 0 0 .984Z" />
    </svg>
  )
}

export function Pause(props: IconProps) {
  return (
    <svg
      aria-label="media-pause"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 12 16"
      {...props}
    >
      <path d="M3 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm7 0H9a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Z" />
    </svg>
  )
}

export function Setting(props: IconProps) {
  return (
    <svg
      aria-hidden="true"
      aria-label="settings"
      fill="none"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"
      />
    </svg>
  )
}

export function Options(props: IconProps) {
  return (
    <svg
      aria-hidden="true"
      aria-label="other-options"
      fill="currentColor"
      viewBox="0 0 16 3"
      {...props}
    >
      <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
    </svg>
  )
}

export function Close(props: IconProps) {
  return (
    <svg
      aria-hidden="true"
      aria-label="close"
      fill="none"
      viewBox="0 0 14 14"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
      />
    </svg>
  )
}

export function Check(props: IconProps) {
  return (
    <svg
      aria-hidden="true"
      aria-label="check"
      fill="none"
      viewBox="0 0 16 12"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 5.917 5.724 10.5 15 1.5"
      />
    </svg>
  )
}

export function Alert(props: IconProps) {
  return (
    <svg
      aria-hidden="true"
      aria-label="alert"
      fill="currentColor"
      viewBox="0 0 20 20"
      {...props}
    >
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
    </svg>
  )
}
