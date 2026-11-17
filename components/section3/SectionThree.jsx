'use client'

import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'

// ======================================================
// LUBRIX — CINEMATIC FRAME ENGINE PRO v2
// ======================================================

// FRAME CONFIGURATION

const TOTAL_FRAMES = 200
const FRAME_PATH = '/med-avif'

// SMOOTHNESS
// Higher = frames catch up to scroll faster.
// Lower = softer, more "light" motion.
const SCROLL_SMOOTHING = 10

// Crossfade between neighbouring frames for seamless motion.
// Set to false on very weak devices to halve draw cost.
const BLEND_FRAMES = true

// CANVAS QUALITY

const MAX_DPR = 1.5
const LOW_MEMORY_DPR = 1.25
const MAX_CANVAS_PIXELS = 2560 * 1440

const BACKGROUND_COLOR = '#080808'

// LOADING

const RETRY_DELAY = 800
const MAX_RETRIES = 3

const DEVICE_TIERS = {
  high: {
    fetchConcurrency: 6,
    decodeConcurrency: 3,
    ahead: 20,
    behind: 8,
    maxBitmaps: 40,
    maxDpr: MAX_DPR,
  },
  low: {
    fetchConcurrency: 3,
    decodeConcurrency: 1,
    ahead: 12,
    behind: 6,
    maxBitmaps: 22,
    maxDpr: LOW_MEMORY_DPR,
  },
}

// ======================================================
// UTILITIES
// ======================================================

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

const getFrameUrl = (index) => {
  const number = String(index + 1).padStart(4, '0')

  return `${FRAME_PATH}/frame-${number}.avif`
}

const getDeviceTier = () => {
  if (typeof navigator === 'undefined') return DEVICE_TIERS.high

  const memory = navigator.deviceMemory || 8
  const cores = navigator.hardwareConcurrency || 8

  return memory <= 4 || cores <= 4 ? DEVICE_TIERS.low : DEVICE_TIERS.high
}

// ======================================================
// FEATURES
// ======================================================

const features = [
  {
    number: '01',
    subtitle: 'CUSTOMER EXPERIENCE',
    title: 'Customer Management',
    text: "Mijozlar ma'lumotlari, avtomobillar va xizmat ko'rsatish tarixini yagona tizimda boshqaring. Har bir mijoz bilan aloqani kuzating va xizmat sifatini yangi bosqichga olib chiqing.",
    direction: 'left',
  },
  {
    number: '02',
    subtitle: 'CENTRALIZED CONTROL',
    title: 'Branch Management',
    text: 'Barcha filiallaringizni yagona platforma orqali boshqaring. Xodimlar faoliyati, xizmatlar, mahsulotlar va filiallar samaradorligini real vaqt rejimida nazorat qiling.',
    direction: 'right',
  },
  {
    number: '03',
    subtitle: 'BUSINESS INTELLIGENCE',
    title: 'Financial Analytics',
    text: "Daromad, xarajat, foyda va moliyaviy ko'rsatkichlarni chuqur tahlil qiling. Aniq statistikalar yordamida biznesingiz uchun to'g'ri qarorlar qabul qiling.",
    direction: 'top',
  },
  {
    number: '04',
    subtitle: 'INTELLIGENCE REDEFINED',
    title: 'AI Assistant',
    text: "Sun'iy intellekt yordamida biznesingizni yanada aqlli boshqaring. Ma'lumotlarni tahlil qiling, muhim savollarga javob oling va kundalik vazifalarni osonlashtiring.",
    direction: 'bottom',
  },
]

// ======================================================
// ANIMATED FEATURE
// ======================================================

function AnimatedFeature({ feature, index, progress }) {
  const start = index * 0.25
  const end = start + 0.25

  const positions = {
    left: { x: -750, y: 0 },
    right: { x: 750, y: 0 },
    top: { x: 0, y: -550 },
    bottom: { x: 0, y: 550 },
  }

  const opposites = {
    left: 'right',
    right: 'left',
    top: 'bottom',
    bottom: 'top',
  }

  const direction = feature.direction

  const titleFrom = positions[direction]
  const opposite = positions[opposites[direction]]

  const titleX = useTransform(
    progress,
    [start, start + 0.07, start + 0.15],
    [titleFrom.x, titleFrom.x * 0.04, 0]
  )

  const titleY = useTransform(
    progress,
    [start, start + 0.07, start + 0.15],
    [titleFrom.y, titleFrom.y * 0.04, 0]
  )

  const titleOpacity = useTransform(progress, [start, start + 0.07, start + 0.14], [0, 0.85, 1])

  const titleScale = useTransform(progress, [start, start + 0.08, start + 0.16], [0.92, 1.025, 1])

  const subtitleX = useTransform(
    progress,
    [start + 0.015, start + 0.09, start + 0.16],
    [opposite.x * 0.6, opposite.x * 0.025, 0]
  )

  const subtitleY = useTransform(
    progress,
    [start + 0.015, start + 0.09, start + 0.16],
    [opposite.y * 0.6, opposite.y * 0.025, 0]
  )

  const subtitleOpacity = useTransform(
    progress,
    [start + 0.015, start + 0.09, start + 0.16],
    [0, 0.8, 1]
  )

  const textX = useTransform(
    progress,
    [start + 0.035, start + 0.12, start + 0.19],
    [opposite.x, opposite.x * 0.025, 0]
  )

  const textY = useTransform(
    progress,
    [start + 0.035, start + 0.12, start + 0.19],
    [opposite.y, opposite.y * 0.025, 0]
  )

  const textOpacity = useTransform(
    progress,
    [start + 0.04, start + 0.12, start + 0.19],
    [0, 0.8, 1]
  )

  const lineX = useTransform(
    progress,
    [start + 0.01, start + 0.09, start + 0.17],
    [titleFrom.x * 0.5, titleFrom.x * 0.02, 0]
  )

  const lineY = useTransform(
    progress,
    [start + 0.01, start + 0.09, start + 0.17],
    [titleFrom.y * 0.5, titleFrom.y * 0.02, 0]
  )

  const lineScale = useTransform(progress, [start + 0.01, start + 0.1, start + 0.18], [0, 1.08, 1])

  const numberX = useTransform(
    progress,
    [start, start + 0.09, start + 0.17],
    [-opposite.x * 0.45, -opposite.x * 0.02, 0]
  )

  const numberY = useTransform(
    progress,
    [start, start + 0.09, start + 0.17],
    [-opposite.y * 0.45, -opposite.y * 0.02, 0]
  )

  const numberOpacity = useTransform(progress, [start, start + 0.09, start + 0.17], [0, 0.45, 1])

  const sectionOpacity = useTransform(
    progress,
    [Math.max(0, start - 0.015), start + 0.035, end - 0.045, end],
    index === 0 ? [1, 1, 1, 0] : [0, 1, 1, 0]
  )

  return (
    <motion.div
      style={{ opacity: sectionOpacity }}
      className="
        pointer-events-none
        absolute inset-0
        flex items-center justify-center
        px-6 sm:px-10 md:px-16 lg:px-24
      "
    >
      <div className="relative w-full max-w-[1400px]">
        {/* BACKGROUND NUMBER */}

        <motion.div
          style={{
            x: numberX,
            y: numberY,
            opacity: numberOpacity,
          }}
          className="
            pointer-events-none
            absolute -top-16 right-0
            select-none
            text-[150px] sm:-top-24 sm:text-[220px]
            md:-top-40 md:text-[340px]
            lg:text-[380px]
            font-semibold leading-none
            tracking-tighter text-white/[0.045]
          "
        >
          {feature.number}
        </motion.div>

        {/* CONTENT */}

        <div className="relative z-10 max-w-[1050px]">
          {/* SUBTITLE */}

          <motion.div
            style={{
              x: subtitleX,
              y: subtitleY,
              opacity: subtitleOpacity,
            }}
            className="
              mb-6 flex items-center gap-4
              md:mb-8 md:gap-5
            "
          >
            <motion.div
              style={{
                x: lineX,
                y: lineY,
                scaleX: lineScale,
                transformOrigin: direction === 'right' ? 'right' : 'left',
              }}
              className="h-px w-10 bg-white/80 md:w-20"
            />

            <span
              className="
                text-[9px] sm:text-[10px] md:text-xs
                font-medium tracking-[0.3em]
                md:tracking-[0.4em]
                text-white/75
              "
            >
              {feature.subtitle}
            </span>
          </motion.div>

          {/* TITLE */}

          <motion.h2
            style={{
              x: titleX,
              y: titleY,
              opacity: titleOpacity,
              scale: titleScale,
            }}
            className="
              max-w-[1000px]
              text-[clamp(2.6rem,7vw,7rem)]
              font-medium leading-[0.98]
              tracking-[-0.065em] text-white
              will-change-transform
            "
          >
            {feature.title}
          </motion.h2>

          {/* DESCRIPTION */}

          <motion.div
            style={{
              x: textX,
              y: textY,
              opacity: textOpacity,
            }}
            className="
              mt-8 flex flex-col gap-6
              md:mt-14 md:flex-row
              md:items-end md:justify-between
            "
          >
            <p
              className="
                max-w-[520px] text-sm
                leading-7 tracking-wide
                text-white/70
                sm:text-base md:leading-8
              "
            >
              {feature.text}
            </p>

            <div
              className="
                flex shrink-0 items-center gap-4
                text-[10px] tracking-[0.25em]
                text-white/50 md:text-xs
              "
            >
              <span>{feature.number}</span>

              <div className="h-px w-12 bg-white/35 md:w-16" />

              <span>04</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

// ======================================================
// FRAME ENGINE
// ======================================================

function createFrameEngine(canvas) {
  const ctx = canvas.getContext('2d', { alpha: false })

  if (!ctx) return null

  const tier = getDeviceTier()
  const abort = new AbortController()

  // blobs:   compressed frames, downloaded once and kept for instant re-decoding
  // bitmaps: decoded frames ready to draw, limited by memory budget
  const blobs = new Map()
  const bitmaps = new Map()
  const loading = new Set()
  const decoding = new Set()
  const retries = new Map()

  let disposed = false
  let resizeObserver = null

  let width = 0
  let height = 0

  let target = 0 // where scroll wants us to be (0 .. TOTAL_FRAMES - 1)
  let pos = 0 // where we visually are (smoothed)
  let dir = 1 // motion direction: 1 forward, -1 backward
  let dirty = true
  let rafId = null
  let lastTime = 0

  const isValid = (i) => Number.isInteger(i) && i >= 0 && i < TOTAL_FRAMES

  const inWindow = (i, center) => {
    const rel = (i - center) * dir

    return rel >= -tier.behind && rel <= tier.ahead
  }

  // ----------------------------------------------------
  // DRAWING
  // ----------------------------------------------------

  const drawCover = (bitmap, alpha) => {
    const scale = Math.max(width / bitmap.width, height / bitmap.height)
    const drawWidth = bitmap.width * scale
    const drawHeight = bitmap.height * scale

    ctx.globalAlpha = alpha
    ctx.drawImage(
      bitmap,
      (width - drawWidth) * 0.5,
      (height - drawHeight) * 0.5,
      drawWidth,
      drawHeight
    )
  }

  // Finds the closest decoded frame, so the screen is never empty or stale
  const nearestBitmap = (center) => {
    for (let d = 0; d < TOTAL_FRAMES; d++) {
      const forward = center + d * dir

      if (bitmaps.has(forward)) return forward

      const backward = center - d * dir

      if (d > 0 && bitmaps.has(backward)) return backward
    }

    return -1
  }

  const render = () => {
    if (!width || !height) return

    const base = Math.floor(pos)
    const fraction = pos - base

    const lower = bitmaps.get(base)
    const upper = bitmaps.get(base + 1)

    if (BLEND_FRAMES && lower && upper) {
      drawCover(lower, 1)

      if (fraction > 0.002) {
        drawCover(upper, fraction)
      }
    } else {
      const index = nearestBitmap(BLEND_FRAMES ? base : Math.round(pos))

      if (index === -1) {
        ctx.globalAlpha = 1
        ctx.fillStyle = BACKGROUND_COLOR
        ctx.fillRect(0, 0, width, height)
      } else {
        drawCover(bitmaps.get(index), 1)
      }
    }

    ctx.globalAlpha = 1
  }

  // ----------------------------------------------------
  // LOADING
  // ----------------------------------------------------

  const canRetry = (i) => {
    const record = retries.get(i)

    return !record || (record.count < MAX_RETRIES && performance.now() >= record.at)
  }

  const markFailed = (i) => {
    const count = (retries.get(i)?.count || 0) + 1
    const delay = RETRY_DELAY * count

    retries.set(i, { count, at: performance.now() + delay })

    if (count < MAX_RETRIES) {
      setTimeout(() => {
        if (!disposed) pump()
      }, delay)
    }
  }

  const fetchFrame = async (i) => {
    loading.add(i)

    try {
      const response = await fetch(getFrameUrl(i), {
        cache: 'force-cache',
        credentials: 'same-origin',
        signal: abort.signal,
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const blob = await response.blob()

      if (!disposed) {
        blobs.set(i, blob)
      }
    } catch (error) {
      if (!disposed && error.name !== 'AbortError') {
        console.warn('LUBRIX FRAME LOAD ERROR:', getFrameUrl(i), error)
        markFailed(i)
      }
    } finally {
      loading.delete(i)

      if (!disposed) pump()
    }
  }

  // ----------------------------------------------------
  // DECODING
  // ----------------------------------------------------

  const trimBitmaps = () => {
    if (bitmaps.size <= tier.maxBitmaps) return

    const center = Math.round(pos)

    // Evict the frames farthest from the playhead first
    const farthestFirst = [...bitmaps.keys()].sort(
      (a, b) => Math.abs(b - center) - Math.abs(a - center)
    )

    while (bitmaps.size > tier.maxBitmaps) {
      const index = farthestFirst.shift()

      bitmaps.get(index)?.close?.()
      bitmaps.delete(index)
    }
  }

  const decodeFrame = async (i) => {
    decoding.add(i)

    try {
      const bitmap = await createImageBitmap(blobs.get(i))

      if (disposed) {
        bitmap.close?.()
        return
      }

      bitmaps.set(i, bitmap)
      trimBitmaps()

      dirty = true
      schedule()
    } catch (error) {
      if (!disposed) {
        console.warn('LUBRIX FRAME DECODE ERROR:', getFrameUrl(i), error)

        blobs.delete(i)
        markFailed(i)
      }
    } finally {
      decoding.delete(i)

      if (!disposed) pump()
    }
  }

  // ----------------------------------------------------
  // PRIORITY PUMP
  // Nearest frames to the playhead are always handled first.
  // Every frame is eventually downloaded in the background,
  // so fast scrolling never has to wait for the network.
  // ----------------------------------------------------

  const pump = () => {
    if (disposed) return

    const center = Math.round(pos)

    let fetchSlots = tier.fetchConcurrency - loading.size
    let decodeSlots = tier.decodeConcurrency - decoding.size

    for (let d = 0; d < TOTAL_FRAMES && (fetchSlots > 0 || decodeSlots > 0); d++) {
      const candidates = d === 0 ? [center] : [center + d * dir, center - d * dir]

      for (const i of candidates) {
        if (!isValid(i)) continue

        if (fetchSlots > 0 && !blobs.has(i) && !loading.has(i) && canRetry(i)) {
          fetchSlots--
          fetchFrame(i)
        } else if (
          decodeSlots > 0 &&
          blobs.has(i) &&
          !bitmaps.has(i) &&
          !decoding.has(i) &&
          inWindow(i, center)
        ) {
          decodeSlots--
          decodeFrame(i)
        }
      }
    }
  }

  // ----------------------------------------------------
  // ANIMATION LOOP
  // Runs only while something is moving or changing.
  // ----------------------------------------------------

  const schedule = () => {
    if (rafId === null && !disposed) {
      rafId = requestAnimationFrame(tick)
    }
  }

  const tick = (now) => {
    rafId = null

    if (disposed) return

    // Frame-rate independent smoothing
    const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 1 / 60
    lastTime = now

    const diff = target - pos

    if (Math.abs(diff) > 0.0005) {
      pos += diff * (1 - Math.exp(-SCROLL_SMOOTHING * dt))
      dirty = true
    } else if (diff !== 0) {
      pos = target
      dirty = true
    }

    pump()

    if (dirty) {
      dirty = false
      render()
    }

    if (pos !== target) {
      rafId = requestAnimationFrame(tick)
    } else {
      lastTime = 0
    }
  }

  // ----------------------------------------------------
  // PUBLIC API
  // ----------------------------------------------------

  const setProgress = (progress, snap = false) => {
    if (disposed) return

    const next = clamp(progress, 0, 1) * (TOTAL_FRAMES - 1)

    if (next > target) dir = 1
    else if (next < target) dir = -1

    target = next

    if (snap) pos = next

    dirty = true
    schedule()
  }

  // ----------------------------------------------------
  // CANVAS RESOLUTION
  // ----------------------------------------------------

  const resize = () => {
    if (disposed) return

    const rect = canvas.getBoundingClientRect()

    if (!rect.width || !rect.height) return

    const dpr = Math.min(
      window.devicePixelRatio || 1,
      tier.maxDpr,
      Math.sqrt(MAX_CANVAS_PIXELS / (rect.width * rect.height))
    )

    const nextWidth = Math.max(1, Math.round(rect.width * dpr))
    const nextHeight = Math.max(1, Math.round(rect.height * dpr))

    if (nextWidth === width && nextHeight === height) return

    width = nextWidth
    height = nextHeight

    // Changing canvas size clears its pixels, so we redraw
    canvas.width = width
    canvas.height = height

    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'medium'

    dirty = true
    schedule()
  }

  // ----------------------------------------------------
  // CLEANUP
  // ----------------------------------------------------

  const destroy = () => {
    disposed = true

    if (rafId !== null) cancelAnimationFrame(rafId)

    resizeObserver?.disconnect()
    window.removeEventListener('resize', resize)

    abort.abort()

    for (const bitmap of bitmaps.values()) {
      bitmap.close?.()
    }

    bitmaps.clear()
    blobs.clear()
    loading.clear()
    decoding.clear()
    retries.clear()
  }

  // ----------------------------------------------------
  // INITIALIZATION
  // ----------------------------------------------------

  resize()

  if ('ResizeObserver' in window) {
    resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)
  } else {
    window.addEventListener('resize', resize)
  }

  // Start background loading immediately
  pump()

  return { setProgress, destroy }
}

// ======================================================
// MAIN SECTION
// ======================================================

export default function SectionThree() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const engineRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // ====================================================
  // ENGINE LIFECYCLE
  // ====================================================

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) return

    const engine = createFrameEngine(canvas)

    if (!engine) return

    engineRef.current = engine

    // Start from the current scroll position without animating from 0
    engine.setProgress(scrollYProgress.get(), true)

    return () => {
      engineRef.current = null
      engine.destroy()
    }
  }, [scrollYProgress])

  // ====================================================
  // SCROLL SYNCHRONIZATION
  // ====================================================

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    engineRef.current?.setProgress(progress)
  })

  // ====================================================
  // PROGRESS
  // ====================================================

  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <section
      ref={sectionRef}
      className="
        relative
        h-[500vh]
        bg-[#080808]
        text-white
      "
    >
      {/* STICKY CINEMATIC VIEWPORT */}

      <div
        className="
          sticky top-0
          h-[100svh]
          min-h-[550px]
          w-full
          overflow-hidden
          isolate
          bg-[#080808]
        "
      >
        {/* FRAME CANVAS */}

        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-0
            block h-full w-full
          "
          style={{
            transform: 'translateZ(0)',
            willChange: 'transform',
          }}
        />

        {/* CINEMATIC OVERLAY */}

        <div
          className="
            pointer-events-none
            absolute inset-0
            bg-black/[0.06]
          "
        />

        {/* LEFT GRADIENT */}

        <div
          className="
            pointer-events-none
            absolute inset-0
            bg-gradient-to-r
            from-black/40
            via-black/10
            to-transparent
          "
        />

        {/* BOTTOM GRADIENT */}

        <div
          className="
            pointer-events-none
            absolute inset-0
            bg-gradient-to-t
            from-black/35
            via-transparent
            to-black/[0.08]
          "
        />

        {/* TOP SHADOW */}

        <div
          className="
            pointer-events-none
            absolute inset-x-0 top-0
            h-32
            bg-gradient-to-b
            from-black/20
            to-transparent
          "
        />

        {/* FEATURES */}

        {features.map((feature, index) => (
          <AnimatedFeature
            key={feature.number}
            feature={feature}
            index={index}
            progress={scrollYProgress}
          />
        ))}

        {/* BOTTOM PROGRESS */}

        <div
          className="
            absolute bottom-7
            left-6 right-6 z-30
            flex items-center justify-between
            sm:bottom-9
            md:bottom-12
            md:left-16 md:right-16
          "
        >
          {/* BRAND + PROGRESS */}

          <div
            className="
              flex items-center gap-3
              sm:gap-5
            "
          >
            <span
              className="
                text-[10px] sm:text-xs
                font-semibold
                tracking-[0.25em]
                text-white/85
              "
            >
              LUBRIX
            </span>

            <div
              className="
                relative
                h-px
                w-20 sm:w-28 md:w-40
                overflow-hidden
                bg-white/30
              "
            >
              <motion.div
                style={{ width: progressWidth }}
                className="
                  absolute left-0 top-0
                  h-full bg-white
                "
              />
            </div>

            <span
              className="
                text-[9px] sm:text-[10px]
                tracking-[0.2em]
                text-white/60
              "
            >
              EXPERIENCE
            </span>
          </div>

          {/* SCROLL INDICATOR */}

          <motion.span
            animate={{
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="
              text-[10px] sm:text-xs
              tracking-[0.3em]
              text-white/65
            "
          >
            SCROLL
          </motion.span>
        </div>
      </div>
    </section>
  )
}
