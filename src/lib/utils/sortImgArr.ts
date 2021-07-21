export const sortImgArr = (imgArr: string[]) => {
  const img = [...imgArr]

  img.sort((a, b) => {
    const [aArr, bArr] = [a.split('/'), b.split('/')]

    return aArr[aArr.length - 1] > bArr[bArr.length - 1] ? 1 : -1
  })

  return img
}
