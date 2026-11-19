'use client'

import { useEffect, useRef } from 'react'

export default function BlackBackground({ cell = 56 }) {
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
      raf = 0
      let active = false
      for (let i = 0; i < cells.length; i++) {
        if (cells[i] > 0.004) {
          cells[i] *= 0.93
          active = true
        } else cells[i] = 0
      }

      ctx.clearRect(0, 0, w, h)

      // Asosiy to'r chiziqlari
      ctx.strokeStyle = 'rgba(255,255,255,0.06)'
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

      // Kursor ostidagi yonib turadigan kataklar
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const v = cells[r * cols + c]
          if (v <= 0) continue
          ctx.fillStyle = `rgba(255,255,255,${v * 0.07})`
          ctx.fillRect(c * cell, r * cell, cell, cell)
          ctx.strokeStyle = `rgba(255,255,255,${v * 0.3})`
          ctx.strokeRect(c * cell + 0.5, r * cell + 0.5, cell, cell)
        }
      }

      if (active) raf = requestAnimationFrame(draw)
    }

    const start = () => {
      if (!raf) raf = requestAnimationFrame(draw)
    }

    const resize = () => {
      const nextW = parent.clientWidth
      const nextH = parent.clientHeight
      if (nextW === w && nextH === h) return

      const oldCells = cells
      const oldCols = cols
      const oldRows = rows

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = nextW
      h = nextH
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      cols = Math.ceil(w / cell)
      rows = Math.ceil(h / cell)
      cells = new Float32Array(cols * rows)

      // Yonib turgan kataklarni saqlab qolamiz
      const copyRows = Math.min(rows, oldRows)
      const copyCols = Math.min(cols, oldCols)
      for (let r = 0; r < copyRows; r++) {
        for (let c = 0; c < copyCols; c++) {
          cells[r * cols + c] = oldCells[r * oldCols + c]
        }
      }

      // Canvas tozalangani uchun to'rni shu zahoti qayta chizamiz
      cancelAnimationFrame(raf)
      raf = 0
      draw()
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
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{
        WebkitMaskImage: 'radial-gradient(ellipse 85% 80% at 50% 50%, #000 40%, transparent 100%)',
        maskImage: 'radial-gradient(ellipse 85% 80% at 50% 50%, #000 40%, transparent 100%)',
      }}
    />
  )
}
