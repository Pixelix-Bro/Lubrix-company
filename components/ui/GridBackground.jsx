'use client'

import { useEffect, useRef } from 'react'

export default function GridBackground({ cell = 56 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas.parentElement
    const ctx = canvas.getContext('2d')

    let w = 0
    let h = 0
    let cols = 0
    let rows = 0
    let cells = new Float32Array(0)
    let raf = 0

    const draw = () => {
      let active = false
      for (let i = 0; i < cells.length; i++) {
        if (cells[i] > 0.004) {
          cells[i] *= 0.93
          active = true
        } else cells[i] = 0
      }

      ctx.clearRect(0, 0, w, h)

      ctx.strokeStyle = 'rgba(0,0,0,0.055)'
      ctx.lineWidth = 1
      ctx.beginPath()
      for (let x = 0; x <= w; x += cell) {
        ctx.moveTo(x + 0.5, 0)
        ctx.lineTo(x + 0.5, h)
      }
      for (let y = 0; y <= h; y += cell) {
        ctx.moveTo(0, y + 0.5)
        ctx.lineTo(w, y + 0.5)
      }
      ctx.stroke()

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const v = cells[r * cols + c]
          if (v <= 0) continue
          ctx.fillStyle = `rgba(0,0,0,${v * 0.07})`
          ctx.fillRect(c * cell, r * cell, cell, cell)
          ctx.strokeStyle = `rgba(0,0,0,${v * 0.3})`
          ctx.strokeRect(c * cell + 0.5, r * cell + 0.5, cell, cell)
        }
      }

      raf = active ? requestAnimationFrame(draw) : 0
    }

    const start = () => {
      if (!raf) raf = requestAnimationFrame(draw)
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = parent.clientWidth
      h = parent.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(w / cell)
      rows = Math.ceil(h / cell)
      cells = new Float32Array(cols * rows)
      start()
    }

    const light = (c, r, v) => {
      if (c < 0 || r < 0 || c >= cols || r >= rows) return
      const i = r * cols + c
      if (cells[i] < v) cells[i] = v
    }

    const onMove = (e) => {
      const rect = parent.getBoundingClientRect()
      const c = Math.floor((e.clientX - rect.left) / cell)
      const r = Math.floor((e.clientY - rect.top) / cell)
      light(c, r, 1)
      light(c - 1, r, 0.28)
      light(c + 1, r, 0.28)
      light(c, r - 1, 0.28)
      light(c, r + 1, 0.28)
      start()
    }

    resize()

    const observer = new ResizeObserver(resize)
    observer.observe(parent)
    parent.addEventListener('pointermove', onMove)

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      parent.removeEventListener('pointermove', onMove)
    }
  }, [cell])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0"
      style={{
        WebkitMaskImage: 'radial-gradient(ellipse 85% 80% at 50% 50%, #000 40%, transparent 100%)',
        maskImage: 'radial-gradient(ellipse 85% 80% at 50% 50%, #000 40%, transparent 100%)',
      }}
    />
  )
}
