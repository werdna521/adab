import invert from 'invert-color'

export const COLORS = {
  BACKGROUND: 'white',
}

const bwList: string[] = []

export const getColor = (color: string, isLowVisionMode: boolean) => {
  const isRGB = color.includes(',')

  if (isLowVisionMode) {
    if (isRGB)
      return invert(
        color.split(',').map((bit) => parseInt(bit.trim(), 10)) as [
          number,
          number,
          number,
        ],
        bwList.includes(color),
      )

    return invert(color === 'white' ? '#fff' : color, bwList.includes(color))
  }
  return color
}
