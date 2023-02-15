import type { iPosition } from "../types"

const VELMIN = .8
const VELMAX = 1.5
const WIDTH = 200
const HEIGHT = 175

class Cloud {
  canvas: HTMLCanvasElement
  position:iPosition
  initPos: iPosition
  velocity: Partial<iPosition>
  width:number
  height:number
  img:HTMLImageElement
  constructor(canvas: HTMLCanvasElement, img: HTMLImageElement){
    this.canvas = canvas
    this.initPos = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height
    }
    this.position = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height
    }
    this.velocity = {
      x: Math.random() * VELMIN + VELMAX,
    }
    this.height = HEIGHT
    this.width = WIDTH
    this.img = img
  }

  draw(ctx: CanvasRenderingContext2D){
    ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height)
  }

  update(){
    if(this.velocity.x){
      if(this.position.x > this.canvas.width){
        this.position.x = -this.width
        this.position.y = Math.random() * this.canvas.height
      }
      this.position.x += this.velocity.x
    }
  }
}

export default Cloud