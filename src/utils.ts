export const toMatrix = (index: number) => {
  return {
    i: Math.floor(index / 10),
    j: index % 10,
  }
}

export const toIndex = (obj: { i: number; j: number }) => {
  return obj.i * 10 + obj.j
}
