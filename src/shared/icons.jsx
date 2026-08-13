// Line-icon system — exact path data from design/Design Pass.dc.html's
// "Icon system" component sheet. Question-option icons (Homelife, Behavior,
// Spirit Dog Quiz) were tried and reverted — see DECISIONS.md. What remains
// here is the progress-ring checkmark and the Spirit Dog archetype icons,
// which are staying.

function IconBase({ size = 22, strokeWidth = 1.8, color = 'var(--accent)', viewBox = '0 0 24 24', children }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  )
}

// ---------- Shared / progress ----------

export function IconCheck({ strokeWidth = 2.2, ...props }) {
  return (
    <IconBase strokeWidth={strokeWidth} {...props}>
      <path d="M5 13l4 4L19 7" />
    </IconBase>
  )
}

// ---------- Archetypes ----------

export function IconZzz(props) {
  return (
    <IconBase strokeWidth={1.9} {...props}>
      <path d="M3 17h3.5l-3.5 3.5h3.5" />
      <path d="M9.5 13h4l-4 4h4" />
      <path d="M16 9h4.5l-4.5 4.5h4.5" />
    </IconBase>
  )
}

export function IconWaves(props) {
  return (
    <IconBase strokeWidth={1.8} {...props}>
      <path d="M3 9c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0" />
      <path d="M3 15c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0" />
    </IconBase>
  )
}

export function IconDice({ color = 'var(--accent)', ...props }) {
  return (
    <IconBase strokeWidth={1.8} color={color} {...props}>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <circle cx="8.5" cy="8.5" r="1.2" fill={color} stroke="none" />
      <circle cx="15.5" cy="8.5" r="1.2" fill={color} stroke="none" />
      <circle cx="12" cy="12" r="1.2" fill={color} stroke="none" />
      <circle cx="8.5" cy="15.5" r="1.2" fill={color} stroke="none" />
      <circle cx="15.5" cy="15.5" r="1.2" fill={color} stroke="none" />
    </IconBase>
  )
}

export function IconGradCap(props) {
  return (
    <IconBase strokeWidth={1.8} {...props}>
      <path d="M12 3l10 5-10 5L2 8l10-5z" />
      <path d="M6 10.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-5.5" />
      <path d="M22 8v6" />
    </IconBase>
  )
}

export function IconDevilFace(props) {
  return (
    <IconBase strokeWidth={1.8} {...props}>
      <path d="M8.5 5c-.6-1.7.2-2.8 1.6-2.4.2 1-.2 2.2-1 3.2" />
      <path d="M15.5 5c.6-1.7-.2-2.8-1.6-2.4-.2 1 .2 2.2 1 3.2" />
      <circle cx="12" cy="13" r="7" />
      <path d="M9 11.5h.01M15 11.5h.01" strokeWidth="2.6" />
      <path d="M8.5 16c1.5 1.5 5.5 1.5 7 0" />
    </IconBase>
  )
}

export function IconFlame(props) {
  return (
    <IconBase strokeWidth={1.8} {...props}>
      <path d="M12 2c1 4-4 6-4 10a4 4 0 008 0c0-1.5-1-2-1-3.5C16 11 18 12 18 15a6 6 0 01-12 0C6 9 11 8 12 2z" />
    </IconBase>
  )
}
