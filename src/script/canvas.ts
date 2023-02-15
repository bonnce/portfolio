import type { iPosition } from "../types"

class Canvas {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D | null
  mouse: iPosition | undefined
  running: number
  observer: IntersectionObserver
  inView: boolean
  constructor(elementId: string){
    this.canvas = document.getElementById(elementId) as HTMLCanvasElement
    this.ctx = this.canvas.getContext('2d')
    this.running = 0
    this.inView = true
    this.observer = new window.IntersectionObserver(([entry]) => {
      this.inView = entry.isIntersecting
    }, {
      root: null,
      threshold: 0.15,
    })
  }

  init(){
    this.observer.observe(this.canvas)
    this.canvas.height = window.innerHeight
    this.canvas.width = window.innerWidth
    window.addEventListener('resize', ()=>{
      this.canvas.height = window.innerHeight
      this.canvas.width = window.innerWidth
    })
  }

  run(callback: VoidFunction){
    const animate = () => {
            
      if(this.ctx && this.inView){          
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw
        callback()
        this.running += 1
      }
      requestAnimationFrame(animate)
    }
    animate()
  }

  getMouseAxis(){
    this.canvas.addEventListener('mousemove', (event)=>{
      this.mouse = {x: event.clientX, y: event.clientY - this.canvas.getBoundingClientRect().y}
    })
  }
}

export default Canvas