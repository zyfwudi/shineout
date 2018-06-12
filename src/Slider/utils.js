export function value2per(value, scale) {
  const range = scale.length - 1
  let ps = 0
  scale.forEach((s, i) => {
    if (value > s) ps = i
  })

  // end
  if (ps >= range) return 1

  const min = scale[ps]
  const max = scale[ps + 1]

  return (ps + ((value - min) / (max - min))) / range
}

export function per2value(per, scale, step = 1) {
  const range = scale.length - 1

  if (per >= 1) return scale[range]
  const ps = Math.floor(per * range)
  const min = scale[ps]
  const max = scale[ps + 1]
  const count = (max - min) / step
  const sper = (per - (ps / range)) * range

  return min + (Math.round(sper * count) * step)
}
