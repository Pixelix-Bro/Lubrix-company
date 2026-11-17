'use client'

import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'

import { useEffect, useRef } from 'react'

// ======================================================
// LUBRIX CINEMATIC FRAME ENGINE
// ======================================================

// FRAMES
const TOTAL_FRAMES = 200
const FRAME_PATH = '/med-avif'

// MAIN ENGINE
const MAX_CONCURRENT = 6
const MAX_CACHE = 32
const PREFETCH_AHEAD = 14
const PREFETCH_BEHIND = 5

// BACKGROUND PRELOADER
const PRELOAD_CONCURRENCY = 4
const PRELOAD_START_FRAME = 1

// RENDERING
const MAX_DPR = 1.5
const MAX_CANVAS_PIXELS = 2560 * 1440

// ======================================================
// UTILITIES
// ======================================================

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

const getFrameUrl = (index) => {
  const number = String(index + 1).padStart(4, '0')
  return `${FRAME_PATH}/frame-${number}.avif`
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
        absolute inset-0
        flex items-center justify-center
        px-6 sm:px-10 md:px-16 lg:px-24
        pointer-events-none
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
            absolute -top-16 right-0
            select-none pointer-events-none
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
                md:tracking-[0.4em] text-white/75
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
                leading-7 tracking-wide text-white/70
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
// MAIN SECTION
// ======================================================

export default function SectionThree() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const requestFramesRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // ====================================================
  // CINEMATIC ENGINE + FULL BACKGROUND PRELOADER
  // ====================================================

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) return

    const ctx = canvas.getContext('2d', {
      alpha: false,
      desynchronized: true,
    })

    if (!ctx) return

    let disposed = false
    let raf = null
    let resizeObserver = null

    let targetIndex = 0
    let displayedIndex = -1
    let direction = 1

    let width = 1
    let height = 1

    // FRAME STORAGE

    const cache = new Map()
    const active = new Map()
    const failed = new Set()
    const queue = new Map()

    // BACKGROUND PRELOAD CONTROL

    const preloadController = new AbortController()

    let preloadStopped = false
    let preloadCompleted = 0
    let preloadFailed = 0

    // ==================================================
    // DRAW FRAME
    // ==================================================

    const draw = (img) => {
      if (!img || disposed) return

      const iw = img.naturalWidth
      const ih = img.naturalHeight

      if (!iw || !ih) return

      const scale = Math.max(width / iw, height / ih)

      const dw = iw * scale
      const dh = ih * scale

      const x = (width - dw) / 2
      const y = (height - dh) / 2

      ctx.clearRect(0, 0, width, height)
      ctx.drawImage(img, x, y, dw, dh)

      displayedIndex = Number(img.dataset.frameIndex)
    }

    // ==================================================
    // NEAREST FRAME
    // ==================================================

    const drawNearest = (index) => {
      if (cache.has(index)) {
        const img = cache.get(index)

        cache.delete(index)
        cache.set(index, img)

        draw(img)
        return
      }

      let nearest = null
      let minDistance = Infinity

      for (const [frameIndex, img] of cache) {
        const distance = Math.abs(frameIndex - index)

        if (distance < minDistance) {
          minDistance = distance
          nearest = img
        }
      }

      if (nearest) draw(nearest)
    }

    // ==================================================
    // CACHE CLEANUP
    // ==================================================

    const cleanCache = () => {
      while (cache.size > MAX_CACHE) {
        let removed = false

        for (const [index] of cache) {
          if (index === targetIndex || index === displayedIndex) {
            continue
          }

          cache.delete(index)
          removed = true
          break
        }

        if (!removed) break
      }
    }

    // ==================================================
    // FRAME LOADER
    // ==================================================

    const loadFrame = (index) => {
      if (disposed || cache.has(index) || active.has(index) || failed.has(index)) {
        return
      }

      const img = new Image()

      img.decoding = 'async'
      img.dataset.frameIndex = String(index)

      if ('fetchPriority' in img) {
        img.fetchPriority = index === targetIndex ? 'high' : 'auto'
      }

      active.set(index, img)

      img.onload = () => {
        if (disposed || active.get(index) !== img) {
          return
        }

        active.delete(index)

        cache.set(index, img)

        if (index === targetIndex) {
          draw(img)
        }

        cleanCache()
        pump()
      }

      img.onerror = () => {
        if (disposed || active.get(index) !== img) {
          return
        }

        active.delete(index)
        failed.add(index)

        console.warn('LUBRIX frame error:', getFrameUrl(index))

        pump()
      }

      img.src = getFrameUrl(index)
    }

    // ==================================================
    // CANCEL FRAME
    // ==================================================

    const cancelFrame = (index) => {
      const img = active.get(index)

      if (!img) return

      active.delete(index)

      img.onload = null
      img.onerror = null
      img.src = ''
    }

    // ==================================================
    // MAIN LOADING QUEUE
    // ==================================================

    const pump = () => {
      if (disposed) return

      while (active.size < MAX_CONCURRENT && queue.size > 0) {
        const entries = [...queue.entries()].sort((a, b) => a[1] - b[1])

        const [index] = entries[0]

        queue.delete(index)

        loadFrame(index)
      }
    }

    // ==================================================
    // SCROLL UPDATE
    // ==================================================

    const update = (progress) => {
      if (disposed) return

      const index = Math.round(clamp(progress, 0, 1) * (TOTAL_FRAMES - 1))

      if (index > targetIndex) direction = 1
      else if (index < targetIndex) direction = -1

      targetIndex = index

      // Draw nearest available frame immediately.

      drawNearest(index)

      // Reset outdated queue.

      queue.clear()

      // Cancel outdated active requests.

      for (const frameIndex of [...active.keys()]) {
        const distance = (frameIndex - index) * direction

        if (frameIndex !== index && (distance < 0 || distance > 4)) {
          cancelFrame(frameIndex)
        }
      }

      // Current frame has highest priority.

      if (!cache.has(index) && !active.has(index) && !failed.has(index)) {
        queue.set(index, -10000)
      }

      // Forward preloading.

      for (let i = 1; i <= PREFETCH_AHEAD; i++) {
        const next = index + i * direction

        if (
          next >= 0 &&
          next < TOTAL_FRAMES &&
          !cache.has(next) &&
          !active.has(next) &&
          !failed.has(next)
        ) {
          queue.set(next, i)
        }
      }

      // Backward preloading.

      for (let i = 1; i <= PREFETCH_BEHIND; i++) {
        const previous = index - i * direction

        if (
          previous >= 0 &&
          previous < TOTAL_FRAMES &&
          !cache.has(previous) &&
          !active.has(previous) &&
          !failed.has(previous)
        ) {
          queue.set(previous, 100 + i)
        }
      }

      pump()
    }

    // ==================================================
    // FULL BACKGROUND PRELOADER
    // ==================================================

    const preloadAllFrames = async () => {
      let nextIndex = PRELOAD_START_FRAME

      const worker = async () => {
        while (!preloadStopped && !disposed && nextIndex < TOTAL_FRAMES) {
          const index = nextIndex++

          try {
            const response = await fetch(getFrameUrl(index), {
              method: 'GET',
              cache: 'force-cache',
              credentials: 'same-origin',
              signal: preloadController.signal,
            })

            if (!response.ok) {
              throw new Error(`HTTP ${response.status}`)
            }

            // Warm browser HTTP cache.
            // Do not retain all image bytes in JS memory.

            await response.arrayBuffer()

            preloadCompleted++
          } catch (error) {
            if (error.name === 'AbortError') {
              return
            }

            preloadFailed++

            console.warn('LUBRIX preload error:', getFrameUrl(index), error)
          }
        }
      }

      await Promise.all(Array.from({ length: PRELOAD_CONCURRENCY }, () => worker()))

      if (!disposed && !preloadStopped) {
        console.info(`LUBRIX PRELOAD COMPLETE: ${preloadCompleted}/199`, `Failed: ${preloadFailed}`)
      }
    }

    // ==================================================
    // CANVAS RESIZE
    // ==================================================

    const resize = () => {
      if (disposed) return

      const rect = canvas.getBoundingClientRect()

      if (!rect.width || !rect.height) return

      const deviceDpr = window.devicePixelRatio || 1

      const pixelDpr = Math.sqrt(MAX_CANVAS_PIXELS / (rect.width * rect.height))

      const dpr = Math.min(deviceDpr, MAX_DPR, pixelDpr)

      const newWidth = Math.max(1, Math.round(rect.width * dpr))

      const newHeight = Math.max(1, Math.round(rect.height * dpr))

      if (canvas.width === newWidth && canvas.height === newHeight) {
        return
      }

      width = newWidth
      height = newHeight

      canvas.width = width
      canvas.height = height

      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'

      drawNearest(targetIndex)
    }

    // ==================================================
    // RAF SCROLL SCHEDULER
    // ==================================================

    let pendingProgress = 0

    requestFramesRef.current = (progress) => {
      pendingProgress = progress

      if (raf !== null) return

      raf = requestAnimationFrame(() => {
        raf = null
        update(pendingProgress)
      })
    }

    // ==================================================
    // INITIALIZATION
    // ==================================================

    resize()

    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(resize)
      resizeObserver.observe(canvas)
    } else {
      window.addEventListener('resize', resize)
    }

    // Load first frame immediately.

    update(0)

    // Start all remaining frame downloads
    // independently from scroll position.

    preloadAllFrames()

    // ==================================================
    // CLEANUP
    // ==================================================

    return () => {
      disposed = true
      preloadStopped = true

      preloadController.abort()

      if (raf !== null) {
        cancelAnimationFrame(raf)
      }

      resizeObserver?.disconnect()

      window.removeEventListener('resize', resize)

      for (const index of [...active.keys()]) {
        cancelFrame(index)
      }

      cache.clear()
      queue.clear()
      failed.clear()

      requestFramesRef.current = null
    }
  }, [])

  // ====================================================
  // SCROLL SYNCHRONIZATION
  // ====================================================

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    requestFramesRef.current?.(progress)
  })

  // ====================================================
  // PROGRESS BAR
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
        {/* BACKGROUND FRAME CANVAS */}

        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-0
            block h-full w-full
          "
          style={{
            filter: 'brightness(1.12) contrast(1.06) saturate(1.08)',
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
