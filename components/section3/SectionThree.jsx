'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'

// ============================================
// SETTINGS
// ============================================

const TOTAL_FRAMES = 200
const FRAME_PATH = '/med'
const MAX_CONCURRENT = 3
const MAX_CACHE = 8
const PREFETCH_AHEAD = 7

const getFrameUrl = (index) => {
  const frameNumber = String(index + 1).padStart(4, '0')
  return `${FRAME_PATH}/frame-${frameNumber}.jpg`
}

// ============================================
// FEATURES DATA
// ============================================

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

// ============================================
// ANIMATED FEATURE
// ============================================

function AnimatedFeature({ feature, index, progress }) {
  const start = index * 0.25
  const end = start + 0.25

  const positions = {
    left: { x: -750, y: 0 },
    right: { x: 750, y: 0 },
    top: { x: 0, y: -550 },
    bottom: { x: 0, y: 550 },
  }

  const oppositeDirections = {
    left: 'right',
    right: 'left',
    top: 'bottom',
    bottom: 'top',
  }

  const direction = feature.direction
  const titleFrom = positions[direction]
  const opposite = positions[oppositeDirections[direction]]

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
    [0, 1, 1, 0]
  )

  return (
    <motion.div
      style={{ opacity: sectionOpacity }}
      className="absolute inset-0 flex items-center justify-center px-6 sm:px-10 md:px-16 lg:px-24 pointer-events-none"
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
            select-none
            text-[150px]
            font-semibold
            leading-none
            tracking-tighter
            text-white/[0.045]
            sm:-top-24 sm:text-[220px]
            md:-top-40 md:text-[340px]
            lg:text-[380px]
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
            className="mb-6 flex items-center gap-4 md:mb-8 md:gap-5"
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
                text-[9px]
                font-medium
                tracking-[0.3em]
                text-white/75
                sm:text-[10px]
                md:text-xs
                md:tracking-[0.4em]
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
              font-medium
              leading-[0.98]
              tracking-[-0.065em]
              text-white
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
              mt-8
              flex flex-col gap-6
              md:mt-14
              md:flex-row
              md:items-end
              md:justify-between
            "
          >
            <p
              className="
                max-w-[520px]
                text-sm
                leading-7
                tracking-wide
                text-white/70
                sm:text-base
                md:leading-8
              "
            >
              {feature.text}
            </p>

            <div
              className="
                flex shrink-0 items-center gap-4
                text-[10px]
                tracking-[0.25em]
                text-white/50
                md:text-xs
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

// ============================================
// MAIN SECTION
// ============================================

export default function SectionThree() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const requestFramesRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // ============================================
  // SMART FRAME LOADER
  // ============================================

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', {
      alpha: false,
      desynchronized: true,
    })

    if (!ctx) return

    let disposed = false
    let activeLoads = 0
    let targetIndex = 0
    let lastDirection = 1
    let drawRaf = null
    let resizeObserver = null

    const cache = new Map()
    const loading = new Map()
    const queue = new Map()

    // ============================================
    // CANVAS DRAWING
    // ============================================

    const drawImage = (img) => {
      if (!img || disposed) return

      const canvasWidth = canvas.width
      const canvasHeight = canvas.height

      const imageWidth = img.naturalWidth
      const imageHeight = img.naturalHeight

      if (!imageWidth || !imageHeight) return

      const scale = Math.max(canvasWidth / imageWidth, canvasHeight / imageHeight)

      const width = imageWidth * scale
      const height = imageHeight * scale

      const x = (canvasWidth - width) / 2
      const y = (canvasHeight - height) / 2

      ctx.clearRect(0, 0, canvasWidth, canvasHeight)
      ctx.drawImage(img, x, y, width, height)
    }

    const drawNearestCached = () => {
      if (cache.has(targetIndex)) {
        drawImage(cache.get(targetIndex))
        return
      }

      let nearestImage = null
      let nearestDistance = Infinity

      for (const [index, img] of cache.entries()) {
        const distance = Math.abs(index - targetIndex)

        if (distance < nearestDistance) {
          nearestDistance = distance
          nearestImage = img
        }
      }

      if (nearestImage) drawImage(nearestImage)
    }

    // ============================================
    // CANVAS RESIZE
    // ============================================

    const resizeCanvas = () => {
      if (disposed) return

      const rect = canvas.getBoundingClientRect()

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

      const width = Math.max(1, Math.round(rect.width * dpr))
      const height = Math.max(1, Math.round(rect.height * dpr))

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
        drawNearestCached()
      }
    }

    resizeCanvas()

    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(resizeCanvas)
      resizeObserver.observe(canvas)
    } else {
      window.addEventListener('resize', resizeCanvas)
    }

    // ============================================
    // CACHE MANAGEMENT
    // ============================================

    const cleanCache = () => {
      if (cache.size <= MAX_CACHE) return

      const entries = [...cache.entries()].sort(
        (a, b) => Math.abs(b[0] - targetIndex) - Math.abs(a[0] - targetIndex)
      )

      while (cache.size > MAX_CACHE && entries.length) {
        const [index] = entries.shift()

        if (index !== targetIndex) {
          cache.delete(index)
        }
      }
    }

    // ============================================
    // LOAD QUEUE
    // ============================================

    const pumpQueue = () => {
      if (disposed) return

      while (activeLoads < MAX_CONCURRENT && queue.size > 0) {
        const sorted = [...queue.entries()].sort((a, b) => a[1] - b[1])

        const [index] = sorted[0]

        queue.delete(index)

        if (cache.has(index) || loading.has(index)) {
          continue
        }

        loadFrame(index)
      }
    }

    const loadFrame = (index) => {
      if (disposed || cache.has(index) || loading.has(index)) {
        return
      }

      activeLoads++

      const img = new Image()
      img.decoding = 'async'

      if ('fetchPriority' in img) {
        img.fetchPriority = Math.abs(index - targetIndex) <= 1 ? 'high' : 'low'
      }

      loading.set(index, img)

      img.onload = async () => {
        try {
          if (typeof img.decode === 'function') {
            await img.decode()
          }
        } catch {
          // Image is already available through onload.
        }

        if (disposed) return

        loading.delete(index)
        activeLoads--

        cache.set(index, img)

        cleanCache()

        // Draw exact frame when it becomes available.
        if (index === targetIndex) {
          drawImage(img)
        } else if (cache.size === 1) {
          drawImage(img)
        }

        pumpQueue()
      }

      img.onerror = () => {
        if (disposed) return

        loading.delete(index)
        activeLoads--

        pumpQueue()
      }

      img.src = getFrameUrl(index)
    }

    // ============================================
    // REQUEST FRAMES AROUND SCROLL POSITION
    // ============================================

    const updateFrames = (progress) => {
      if (disposed) return

      const safeProgress = Math.max(0, Math.min(1, progress))

      const nextIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(safeProgress * (TOTAL_FRAMES - 1)))
      )

      if (nextIndex > targetIndex) {
        lastDirection = 1
      } else if (nextIndex < targetIndex) {
        lastDirection = -1
      }

      targetIndex = nextIndex

      // Keep the previous visible image while loading.
      drawNearestCached()

      // Remove outdated requests that have not started.
      queue.clear()

      // Current frame gets the highest priority.
      if (!cache.has(targetIndex) && !loading.has(targetIndex)) {
        queue.set(targetIndex, 0)
      }

      // Load frames in the scroll direction first.
      for (let offset = 1; offset <= PREFETCH_AHEAD; offset++) {
        const next = targetIndex + offset * lastDirection

        if (next >= 0 && next < TOTAL_FRAMES && !cache.has(next) && !loading.has(next)) {
          queue.set(next, offset)
        }
      }

      // Keep a few frames behind for reverse scrolling.
      for (let offset = 1; offset <= 2; offset++) {
        const previous = targetIndex - offset * lastDirection

        if (
          previous >= 0 &&
          previous < TOTAL_FRAMES &&
          !cache.has(previous) &&
          !loading.has(previous)
        ) {
          queue.set(previous, 10 + offset)
        }
      }

      pumpQueue()
    }

    // ============================================
    // RAF SCROLL UPDATE
    // ============================================

    let pendingProgress = 0

    requestFramesRef.current = (progress) => {
      pendingProgress = progress

      if (drawRaf !== null) return

      drawRaf = requestAnimationFrame(() => {
        drawRaf = null
        updateFrames(pendingProgress)
      })
    }

    // Load first frames immediately.
    requestFramesRef.current(0)

    return () => {
      disposed = true

      if (drawRaf !== null) {
        cancelAnimationFrame(drawRaf)
      }

      if (resizeObserver) {
        resizeObserver.disconnect()
      } else {
        window.removeEventListener('resize', resizeCanvas)
      }

      for (const img of loading.values()) {
        img.onload = null
        img.onerror = null
        img.src = ''
      }

      cache.clear()
      loading.clear()
      queue.clear()

      requestFramesRef.current = null
    }
  }, [])

  // ============================================
  // SCROLL -> FRAME
  // ============================================

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    requestFramesRef.current?.(progress)
  })

  // ============================================
  // PROGRESS BAR
  // ============================================

  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section
      ref={sectionRef}
      className="
        relative
        h-[400vh]
        bg-[#080808]
        text-white
      "
    >
      {/* STICKY CONTAINER */}

      <div
        className="
          sticky
          top-0
          h-[100svh]
          min-h-[550px]
          w-full
          overflow-hidden
          bg-[#080808]
          isolate
        "
      >
        {/* BACKGROUND CANVAS */}

        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-0
            h-full w-full
            object-cover
          "
          style={{
            filter: 'brightness(1.15) contrast(1.05) saturate(1.08)',
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
            absolute
            bottom-7
            left-6
            right-6
            z-30
            flex
            items-center
            justify-between
            sm:bottom-9
            md:bottom-12
            md:left-16
            md:right-16
          "
        >
          {/* BRAND + PROGRESS */}

          <div
            className="
              flex
              items-center
              gap-3
              sm:gap-5
            "
          >
            <span
              className="
                text-[10px]
                font-semibold
                tracking-[0.25em]
                text-white/85
                sm:text-xs
              "
            >
              LUBRIX
            </span>

            <div
              className="
                relative
                h-px
                w-20
                overflow-hidden
                bg-white/30
                sm:w-28
                md:w-40
              "
            >
              <motion.div
                style={{
                  width: progressWidth,
                }}
                className="
                  absolute
                  left-0
                  top-0
                  h-full
                  bg-white
                "
              />
            </div>

            <span
              className="
                text-[9px]
                tracking-[0.2em]
                text-white/60
                sm:text-[10px]
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
              text-[10px]
              tracking-[0.3em]
              text-white/65
              sm:text-xs
            "
          >
            SCROLL
          </motion.span>
        </div>
      </div>
    </section>
  )
}
