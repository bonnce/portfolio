export const loadAsset = (asset: string): HTMLImageElement=>{
  const image = new Image()
  image.src = asset
  return image
}

export const generateAssets = (length: number, name:string ): string[] =>{
  return Array(length).fill(0).map((_, i)=> `/assets/images/${name}${i+1}.png`)
}