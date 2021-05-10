const ILVL_COLOR = [
  { lvl: 0, color: '#50e30b' },
  { lvl: 160, color: '#0be3bb' },
  { lvl: 180, color: '#0bade3' },
  { lvl: 190, color: '#0558ff' },
  { lvl: 200, color: '#8205ff' },
  { lvl: 210, color: '#b200e8' },
  { lvl: 220, color: '#e85500' },
  { lvl: 230, color: '#e88300' },
  { lvl: 240, color: '#e8aa00' },
  { lvl: 250, color: '#e8c900' },
  { lvl: 260, color: '#e8dc00' },
]

export const getIlvlColor = (ilvl: number) => {
  let prevCol = ILVL_COLOR[0]
  ILVL_COLOR.forEach((color) => {
    if (color.lvl <= ilvl) {
      prevCol = color
    }
  })

  return prevCol.color
}