// Line-icon system — exact path data from design/Design Pass.dc.html's
// "Icon system" component sheet. Replaces emoji across Homelife, Behavior,
// the Spirit Dog Quiz, and the archetypes.

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

export function IconMinus({ strokeWidth = 2.2, ...props }) {
  return (
    <IconBase strokeWidth={strokeWidth} {...props}>
      <path d="M6 12h12" />
    </IconBase>
  )
}

// ---------- Homelife ----------

export function IconHouse(props) {
  return (
    <IconBase strokeWidth={1.8} {...props}>
      <path d="M3 11l9-8 9 8" />
      <path d="M5 10v10h14V10" />
    </IconBase>
  )
}

export function IconTownHome(props) {
  return (
    <IconBase strokeWidth={1.8} {...props}>
      <path d="M3 12l9-7 9 7" />
      <path d="M5 11v10h14V11" />
      <path d="M12 8v13" />
      <path d="M8 21v-5h2v5M14 21v-5h2v5" />
    </IconBase>
  )
}

export function IconApartment(props) {
  return (
    <IconBase strokeWidth={1.8} {...props}>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <path d="M9 7h.01M9 11h.01M9 15h.01M15 7h.01M15 11h.01M15 15h.01" />
    </IconBase>
  )
}

export function IconKey(props) {
  return (
    <IconBase strokeWidth={1.8} {...props}>
      <circle cx="7.5" cy="15.5" r="3.2" />
      <path d="M10 13l9-9" />
      <path d="M16 7l2.5 2.5" />
      <path d="M14 9l2 2" />
    </IconBase>
  )
}

export function IconDocument(props) {
  return (
    <IconBase strokeWidth={1.8} {...props}>
      <path d="M6 2h9l3 3v17H6z" />
      <path d="M15 2v3h3" />
      <path d="M9 12h6M9 16h6" />
    </IconBase>
  )
}

export function IconLeaf(props) {
  return (
    <IconBase strokeWidth={1.8} {...props}>
      <path d="M12 2C8 6 8 10 12 13c4-3 4-7 0-11z" />
      <path d="M12 13v9" />
    </IconBase>
  )
}

export function IconSprout(props) {
  return (
    <IconBase strokeWidth={1.8} {...props}>
      <path d="M12 21V11" />
      <path d="M12 11c0-4-3-5-6-4 0 4 2.5 6.5 6 4z" />
      <path d="M12 11c0-4 3-5 6-4 0 4-2.5 6.5-6 4z" />
    </IconBase>
  )
}

export function IconPottedPlant(props) {
  return (
    <IconBase strokeWidth={1.8} {...props}>
      <path d="M8.5 15h7l-1 6h-5z" />
      <path d="M12 15V6" />
      <path d="M12 10c-3-1-4-4-3-6 2 1 3 3 3 6z" />
      <path d="M12 8c3-1 4-3.5 3-5.5-2 1-3 2.5-3 5.5z" />
    </IconBase>
  )
}

export function IconLandscape(props) {
  return (
    <IconBase strokeWidth={1.8} {...props}>
      <circle cx="6" cy="6" r="2" />
      <path d="M2 20l6-9 4 5 3-4 7 8z" />
    </IconBase>
  )
}

export function IconBanCircle(props) {
  return (
    <IconBase strokeWidth={1.8} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M6 6l12 12" />
    </IconBase>
  )
}

export function IconTeddyBear({ color = 'var(--accent)', ...props }) {
  return (
    <IconBase strokeWidth={1.8} color={color} {...props}>
      <circle cx="12" cy="13" r="6" />
      <circle cx="7.5" cy="8" r="2.2" />
      <circle cx="16.5" cy="8" r="2.2" />
      <circle cx="9.5" cy="12.5" r="1" fill={color} stroke="none" />
      <circle cx="14.5" cy="12.5" r="1" fill={color} stroke="none" />
      <path d="M10 15.5c1.2 1 2.8 1 4 0" />
    </IconBase>
  )
}

export function IconGameController({ color = 'var(--accent)', ...props }) {
  return (
    <IconBase strokeWidth={1.8} color={color} {...props}>
      <rect x="3" y="9" width="18" height="9" rx="4" />
      <path d="M8 11.5v3M6.5 13h3" />
      <circle cx="16" cy="12.5" r="1" fill={color} stroke="none" />
      <circle cx="18.5" cy="14.5" r="1" fill={color} stroke="none" />
    </IconBase>
  )
}

// ---------- Behavior / shared energy set ----------

export function IconZzz(props) {
  return (
    <IconBase strokeWidth={1.9} {...props}>
      <path d="M3 17h3.5l-3.5 3.5h3.5" />
      <path d="M9.5 13h4l-4 4h4" />
      <path d="M16 9h4.5l-4.5 4.5h4.5" />
    </IconBase>
  )
}

export function IconSnowflake(props) {
  return (
    <IconBase strokeWidth={1.6} {...props}>
      <g>
        <path d="M12 3v18" />
        <path d="M9 6l3-3 3 3M9 18l3 3 3-3" />
      </g>
      <g transform="rotate(60 12 12)">
        <path d="M12 3v18" />
        <path d="M9 6l3-3 3 3M9 18l3 3 3-3" />
      </g>
      <g transform="rotate(120 12 12)">
        <path d="M12 3v18" />
        <path d="M9 6l3-3 3 3M9 18l3 3 3-3" />
      </g>
    </IconBase>
  )
}

export function IconYinYang(props) {
  return (
    <IconBase strokeWidth={1.8} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3a4.5 4.5 0 000 9 4.5 4.5 0 010 9" />
    </IconBase>
  )
}

export function IconLightning(props) {
  return (
    <IconBase strokeWidth={1.8} {...props}>
      <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
    </IconBase>
  )
}

export function IconPartyHat({ color = 'var(--accent)', ...props }) {
  return (
    <IconBase strokeWidth={1.8} color={color} {...props}>
      <path d="M12 4 L16.5 19 Q15 20.5 13.5 19 Q12 20.5 10.5 19 Q9 20.5 7.5 19 Z" />
      <circle cx="12" cy="4" r="1.3" fill={color} stroke="none" />
      <circle cx="19" cy="7" r="1" fill={color} stroke="none" />
      <circle cx="5" cy="9" r="1" fill={color} stroke="none" />
      <circle cx="20" cy="13" r="0.9" fill={color} stroke="none" />
    </IconBase>
  )
}

export function IconPaw(props) {
  return (
    <IconBase strokeWidth={1.8} {...props}>
      <ellipse cx="12" cy="16" rx="5" ry="3.6" />
      <circle cx="6.5" cy="9" r="1.6" />
      <circle cx="10" cy="6.5" r="1.6" />
      <circle cx="14" cy="6.5" r="1.6" />
      <circle cx="17.5" cy="9" r="1.6" />
    </IconBase>
  )
}

export function IconBone({ size = 22, color = 'var(--accent)' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none">
      <g transform="rotate(45 12 12)">
        <rect x="7" y="10" width="10" height="4" rx="2" />
        <circle cx="6" cy="9" r="2.2" />
        <circle cx="6" cy="15" r="2.2" />
        <circle cx="18" cy="9" r="2.2" />
        <circle cx="18" cy="15" r="2.2" />
      </g>
    </svg>
  )
}

export function IconHandshake(props) {
  return (
    <IconBase strokeWidth={1.8} {...props}>
      <rect x="3" y="10" width="7" height="5" rx="2.5" />
      <rect x="14" y="10" width="7" height="5" rx="2.5" />
      <path d="M10 12.5h4" />
    </IconBase>
  )
}

// ---------- Spirit Dog Quiz — named exceptions ----------

export function IconCouch(props) {
  return (
    <IconBase strokeWidth={1.8} {...props}>
      <rect x="3" y="11" width="18" height="6" rx="2" />
      <path d="M5 11V8a2 2 0 012-2h10a2 2 0 012 2v3" />
      <path d="M5 17v2M19 17v2" />
    </IconBase>
  )
}

export function IconBoat(props) {
  return (
    <IconBase strokeWidth={1.8} {...props}>
      <path d="M4 17h16l-3 4H7z" />
      <path d="M12 17V7l6 5z" />
      <path d="M2 20.5c1.5-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0" />
    </IconBase>
  )
}

export function IconMountainFlag({ color = 'var(--accent)', ...props }) {
  return (
    <IconBase strokeWidth={1.8} color={color} {...props}>
      <path d="M3 20L10 6l4 7 3-4 4 11z" />
      <path d="M13 6V3" />
      <path d="M13 3l3 1.4-3 1.4z" fill={color} stroke="none" />
    </IconBase>
  )
}

// ---------- Archetypes ----------

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
