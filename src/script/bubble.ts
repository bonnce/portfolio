import type { iPosition } from "../types"

const RADIUS = 10

class Bubble {
  canvas: HTMLCanvasElement
  position:iPosition
  radius:number
  timeAlive:number
  velocity:number
  lastMouse: iPosition
  duration: number

  constructor(canvas: HTMLCanvasElement){
    this.canvas = canvas
    this.position = {
      x: 0,
      y: 0
    }
    this.radius = RADIUS
    this.timeAlive = 0
    this.velocity = .5
    this.lastMouse = {x:0, y:0}
    this.duration = 1
  }

  draw(ctx: CanvasRenderingContext2D){
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    ctx.closePath()
    const grd = ctx.createRadialGradient(this.position.x - this.radius * 0.3, this.position.y - this.radius * 0.3, this.radius * 0.1,
      this.position.x, this.position.y, this.radius);
    grd.addColorStop(0,"#eeeeff");
    grd.addColorStop(.2,"rgba(132,234,255,0.2)");
    grd.addColorStop(.75,"rgba(132,234,255,0.2)");
    grd.addColorStop(1,"#84eaff");
    ctx.fillStyle = grd;
    ctx.strokeStyle = '#a2a2ea'
    ctx.stroke()
    ctx.fill()
  }

  update(pos: iPosition, ctx: CanvasRenderingContext2D, index:number){
    const mouseMove = pos.x !== this.lastMouse.x && pos.y !== this.lastMouse.y
    if(mouseMove){
      this.draw(ctx)
      this.position.y = pos.y - (pos.y - this.lastMouse.y ) * index + (Math.random() * 20)
      this.position.x = pos.x - (pos.x - this.lastMouse.x ) * index + (Math.random() * 20)
      this.timeAlive = 0
    }else if(this.timeAlive < 20){
      this.draw(ctx)
      this.timeAlive += 1
      this.position.x += Math.sin(this.timeAlive/10 * 2 * Math.PI)
      this.position.y -= this.velocity
    }  
    this.lastMouse = pos
  }
}

export default Bubble