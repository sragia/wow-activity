/** prettier-ignore */
/** eslint-disable */

function padZero(str: string, len = 2) {
  const zeros = new Array(len).join('0')
  return (zeros + str).slice(-len)
}

export const RGBToHex = (r: number, g: number, b: number) => {
  let rString = r.toString(16)
  let gString = g.toString(16)
  let bString = b.toString(16)

  if (rString.length === 1) rString = '0' + rString
  if (gString.length === 1) gString = '0' + gString
  if (bString.length === 1) bString = '0' + bString

  return '#' + rString + gString + bString
}

export function hexToRGB(h: string) {
  let r: number | string = 0
  let g: number | string = 0
  let b: number | string = 0

  // 3 digits
  if (h.length === 4) {
    r = '0x' + h[1] + h[1]
    g = '0x' + h[2] + h[2]
    b = '0x' + h[3] + h[3]

    // 6 digits
  } else if (h.length === 7) {
    r = '0x' + h[1] + h[2]
    g = '0x' + h[3] + h[4]
    b = '0x' + h[5] + h[6]
  }

  return {
    r: +r,
    g: +g,
    b: +b,
  }
}

export function RGBToHSL(r: number, g: number, b: number) {
  // Make r, g, and b fractions of 1
  r /= 255
  g /= 255
  b /= 255

  // Find greatest and smallest channel values
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0

  // Calculate hue
  // No difference
  if (delta === 0) h = 0
  // Red is max
  else if (cmax === r) h = ((g - b) / delta) % 6
  // Green is max
  else if (cmax === g) h = (b - r) / delta + 2
  // Blue is max
  else h = (r - g) / delta + 4

  h = Math.round(h * 60)

  // Make negative hues positive behind 360°
  if (h < 0) h += 360

  // Calculate lightness
  l = (cmax + cmin) / 2

  // Calculate saturation
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))

  s = +(s * 100).toFixed(1)
  l = +(l * 100).toFixed(1)

  return {
    h,
    s,
    l,
  }
}

export function InverseColor(hex: string) {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1)
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.')
  }
  // invert color components
  const r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
    g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
    b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16)
  // pad each with zeros and return
  return '#' + padZero(r) + padZero(g) + padZero(b)
}

export function HSLtoRGB(h: number, s: number, l: number) {
  // Must be fractions of 1
  s /= 100
  l /= 100

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0

  if (0 <= h && h < 60) {
    r = c
    g = x
    b = 0
  } else if (60 <= h && h < 120) {
    r = x
    g = c
    b = 0
  } else if (120 <= h && h < 180) {
    r = 0
    g = c
    b = x
  } else if (180 <= h && h < 240) {
    r = 0
    g = x
    b = c
  } else if (240 <= h && h < 300) {
    r = x
    g = 0
    b = c
  } else if (300 <= h && h < 360) {
    r = c
    g = 0
    b = x
  }
  r = Math.round((r + m) * 255)
  g = Math.round((g + m) * 255)
  b = Math.round((b + m) * 255)

  return {
    r,
    g,
    b,
  }
}

export const getRandomColor = () => {
  const h = Math.random() * 360
  const s = Math.random() * 100
  const l = Math.random() * 100
  const { r, g, b } = HSLtoRGB(h, s, l)
  return RGBToHex(r, g, b)
}

export const getClassColor = (className?: string) => {
  switch (className?.replace(' ', '').toLowerCase()) {
    case 'paladin':
      return '#f48cba'
    case 'deathknight':
      return '#c41e3a'
    case 'demonhunter':
      return '#a330c9'
    case 'druid':
      return '#ff7c0a'
    case 'hunter':
      return '#aad372'
    case 'mage':
      return '#3fc7eb'
    case 'monk':
      return '#00ff98'
    case 'priest':
      return '#ffffff'
    case 'rogue':
      return '#fff468'
    case 'shaman':
      return '#0070dd'
    case 'warlock':
      return '#8788ee'
    case 'warrior':
      return '#c69b6d'
    default:
      return '#ffffff'
  }
}

export const getClassOppositeColor = (className?: string) => {
  switch (className?.replace(' ', '').toLowerCase()) {
    case 'paladin':
      return '#F9EBE0'
    case 'deathknight':
      return '#F9EBE0'
    case 'demonhunter':
      return '#F9EBE0'
    case 'druid':
      return '#F9EBE0'
    case 'hunter':
      return '#F9EBE0'
    case 'mage':
      return '#F9EBE0'
    case 'monk':
      return '#F9EBE0'
    case 'priest':
      return '#080708'
    case 'rogue':
      return '#080708'
    case 'shaman':
      return '#F9EBE0'
    case 'warlock':
      return '#F9EBE0'
    case 'warrior':
      return '#F9EBE0'
    default:
      return '#F9EBE0'
  }
}

export const getCovenantColor = (covenantId: number) => {
  switch (covenantId) {
    case 1:
      // Kyrian
      return '#0ad0f7'
    case 2:
      // Venthyr
      return '#e62727'
    case 3:
      // Night Fae
      return '#8311ed'
    case 4:
      // Necrolord
      return '#00914b'

    default:
      return '#ffffff'
  }
}
