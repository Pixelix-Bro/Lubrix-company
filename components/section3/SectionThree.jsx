'use client'

import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'

const TOTAL_FRAMES = 200
const FRAME_PATH = '/med-avif'
const BACKGROUND = '#080808'
const MAX_CANVAS_PIXELS = 2560 * 1440

// Qurilma imkoniyatiga qarab xotira va yuklash chegaralari.
const PROFILES = {
  high: {
    fetch: 6,
    decode: 2,
    ahead: 30,
    behind: 12,
    decodeAhead: 4,
    decodeBehind: 2,
    bitmaps: 12,
    blobs: 48,
    dpr: 1.5,
    abortDistance: 48,
  },
  low: {
    fetch: 3,
    decode: 1,
    ahead: 16,
    behind: 7,
    decodeAhead: 2,
    decodeBehind: 1,
    bitmaps: 6,
    blobs: 24,
    dpr: 1.1,
    abortDistance: 30,
  },
}

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))
const frameUrl = (index) => `${FRAME_PATH}/frame-${String(index + 1).padStart(4, '0')}.avif`

function getProfile() {
  if (typeof navigator === 'undefined') return PROFILES.high
  const memory = navigator.deviceMemory || 8
  const cores = navigator.hardwareConcurrency || 8
  const saveData = navigator.connection?.saveData === true
  return memory <= 4 || cores <= 4 || saveData ? PROFILES.low : PROFILES.high
}

const features = [
  {
    number: '01',
    eyebrow: 'MIJOZLAR BILAN ISHLASH',
    title: 'Mijozlar boshqaruvi',
    text: 'Mijozlar, avtomobillar va xizmat tarixini yagona tizimda saqlang. Har bir mijozga ko‘rsatilgan xizmatlarni kuzatib boring.',
    direction: 'left',
  },
  {
    number: '02',
    eyebrow: 'YAGONA BOSHQARUV',
    title: 'Filiallar nazorati',
    text: 'Barcha filiallaringiz, xodimlaringiz va xizmat jarayonlarini bitta platformadan boshqaring. Biznesingiz doimo nazoratingizda bo‘lsin.',
    direction: 'right',
  },
  {
    number: '03',
    eyebrow: 'ANIQ TAHLIL. TO‘G‘RI QAROR.',
    title: 'Moliyaviy tahlil',
    text: 'Daromad, xarajat va foydani tushunarli hisobotlarda kuzating. Muhim qarorlarni aniq ma’lumotlarga asoslanib qabul qiling.',
    direction: 'top',
  },
  {
    number: '04',
    eyebrow: 'SUN’IY INTELLEKT',
    title: 'Aqlli AI yordamchi',
    text: 'Biznesingiz haqidagi ma’lumotlarni tahlil qiling, savollaringizga tezkor javob oling va kundalik ishlarni yengillashtiring.',
    direction: 'bottom',
  },
]

function AnimatedFeature({ feature, index, progress }) {
  const start = index / features.length
  const end = (index + 1) / features.length

  const vectors = {
    left: { x: -150, y: 0 },
    right: { x: 150, y: 0 },
    top: { x: 0, y: -85 },
    bottom: { x: 0, y: 85 },
  }
  const from = vectors[feature.direction]

  const titleX = useTransform(
    progress,
    [start, start + 0.07, start + 0.16],
    [from.x, from.x * 0.06, 0]
  )
  const titleY = useTransform(
    progress,
    [start, start + 0.07, start + 0.16],
    [from.y, from.y * 0.06, 0]
  )
  const titleOpacity = useTransform(progress, [start, start + 0.055, start + 0.14], [0, 0.88, 1])
  const titleScale = useTransform(progress, [start, start + 0.09, start + 0.17], [0.985, 1.012, 1])

  const contentX = useTransform(
    progress,
    [start + 0.02, start + 0.105, start + 0.19],
    [-from.x * 0.42, -from.x * 0.025, 0]
  )
  const contentY = useTransform(
    progress,
    [start + 0.02, start + 0.105, start + 0.19],
    [-from.y * 0.42, -from.y * 0.025, 0]
  )
  const contentOpacity = useTransform(
    progress,
    [start + 0.035, start + 0.12, start + 0.19],
    [0, 0.92, 1]
  )

  const lineScale = useTransform(progress, [start + 0.015, start + 0.1, start + 0.18], [0, 1.03, 1])
  const numberOpacity = useTransform(progress, [start, start + 0.1, start + 0.18], [0, 0.22, 1])
  const numberY = useTransform(progress, [start, start + 0.1, start + 0.18], [20, 3, 0])

  // Keyingi blok oldingisi so‘nishidan oldin ko‘rina boshlaydi.
  const sectionOpacity = useTransform(
    progress,
    [Math.max(0, start - 0.025), start + 0.035, end - 0.035, Math.min(1, end + 0.025)],
    index === 0 ? [1, 1, 1, 0] : index === features.length - 1 ? [0, 1, 1, 1] : [0, 1, 1, 0]
  )

  return (
    <motion.div
      style={{ opacity: sectionOpacity, willChange: 'opacity' }}
      className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 sm:px-10 md:px-16 lg:px-24"
    >
      <div className="relative w-full max-w-[1400px]">
        <motion.div
          aria-hidden="true"
          style={{ y: numberY, opacity: numberOpacity, willChange: 'transform, opacity' }}
          className="absolute -right-2 -top-16 select-none text-[clamp(9rem,27vw,24rem)] font-semibold leading-none tracking-[-0.09em] text-white/[0.045] sm:-top-24 md:-top-36"
        >
          {feature.number}
        </motion.div>

        <div className="relative z-10 max-w-[1050px]">
          <motion.div
            style={{
              x: contentX,
              y: contentY,
              opacity: contentOpacity,
              willChange: 'transform, opacity',
            }}
            className="mb-5 flex items-center gap-4 md:mb-8 md:gap-5"
          >
            <motion.div
              style={{
                scaleX: lineScale,
                transformOrigin: feature.direction === 'right' ? 'right' : 'left',
              }}
              className="h-px w-10 shrink-0 bg-white/80 md:w-20"
            />
            <span className="text-[9px] font-medium tracking-[0.24em] text-white/70 sm:text-[10px] md:text-xs md:tracking-[0.34em]">
              {feature.eyebrow}
            </span>
          </motion.div>

          <motion.h2
            style={{
              x: titleX,
              y: titleY,
              opacity: titleOpacity,
              scale: titleScale,
              willChange: 'transform, opacity',
            }}
            className="max-w-[1000px] text-[clamp(2.7rem,7.2vw,7.2rem)] font-medium leading-[0.98] tracking-[-0.065em] text-white [backface-visibility:hidden]"
          >
            {feature.title}
          </motion.h2>

          <motion.div
            style={{
              x: contentX,
              y: contentY,
              opacity: contentOpacity,
              willChange: 'transform, opacity',
            }}
            className="mt-7 flex flex-col gap-6 md:mt-12 md:flex-row md:items-end md:justify-between"
          >
            <p className="max-w-[520px] text-sm leading-7 tracking-wide text-white/70 sm:text-base md:leading-8">
              {feature.text}
            </p>
            <div className="flex shrink-0 items-center gap-4 text-[10px] tracking-[0.22em] text-white/50 md:text-xs">
              <span>{feature.number}</span>
              <span className="h-px w-12 bg-white/35 md:w-16" />
              <span>04</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

/**
 * Frame engine:
 * - Scroll qiymati to‘g‘ridan-to‘g‘ri kerakli frame'ga ulanadi.
 * - Fetch va decode navbatlari alohida boshqariladi.
 * - Eski so‘rovlar faqat ancha uzoqlashganda bekor qilinadi (request churn yo‘q).
 * - Kadrlar LRU usulida cheklangan xotirada saqlanadi.
 * - Canvas faqat ko‘rsatiladigan frame o‘zgarganda chiziladi.
 */
function createFrameEngine(canvas) {
  const ctx = canvas.getContext('2d', {
    alpha: false,
    desynchronized: true,
  })
  if (!ctx) return null

  const profile = getProfile()
  const blobs = new Map()
  const bitmaps = new Map()
  const fetching = new Map()
  const decoding = new Set()
  const failures = new Map()
  const retryAt = new Map()

  let disposed = false
  let observer = null
  let resizeFallback = false
  let width = 0
  let height = 0
  let target = 0
  let direction = 1
  let drawRaf = 0
  let retryTimer = 0
  let lastDrawn = -1
  let hasDrawn = false

  const isValid = (index) => Number.isInteger(index) && index >= 0 && index < TOTAL_FRAMES

  function lruSet(map, key, value) {
    map.delete(key)
    map.set(key, value)
  }

  function trimCache() {
    while (bitmaps.size > profile.bitmaps) {
      let candidate = -1
      let farthest = -1
      for (const key of bitmaps.keys()) {
        if (key === lastDrawn) continue
        const distance = Math.abs(key - target)
        if (distance > farthest) {
          farthest = distance
          candidate = key
        }
      }
      if (candidate < 0) break
      bitmaps.get(candidate)?.close?.()
      bitmaps.delete(candidate)
    }

    while (blobs.size > profile.blobs) {
      let candidate = -1
      let farthest = -1
      for (const key of blobs.keys()) {
        const distance = Math.abs(key - target)
        if (distance > farthest) {
          farthest = distance
          candidate = key
        }
      }
      if (candidate < 0) break
      blobs.delete(candidate)
    }
  }

  function makePriorityList(ahead, behind) {
    const center = Math.round(target)
    const list = []
    const seen = new Set()

    const add = (index) => {
      if (isValid(index) && !seen.has(index)) {
        seen.add(index)
        list.push(index)
      }
    }

    add(center)
    for (let distance = 1; distance <= Math.max(ahead, behind); distance += 1) {
      if (distance <= ahead) add(center + direction * distance)
      if (distance <= behind) add(center - direction * distance)
    }
    return list
  }

  function chooseReadyFrame() {
    const lower = Math.floor(target)
    const upper = Math.min(TOTAL_FRAMES - 1, lower + 1)
    const preferred = target - lower >= 0.5 ? upper : lower
    const alternate = preferred === lower ? upper : lower

    if (bitmaps.has(preferred)) return preferred
    if (bitmaps.has(alternate)) return alternate

    let nearest = -1
    let nearestDistance = Infinity
    for (const key of bitmaps.keys()) {
      const distance = Math.abs(key - target)
      if (distance < nearestDistance) {
        nearestDistance = distance
        nearest = key
      }
    }
    return nearest
  }

  function drawBitmap(bitmap) {
    if (!bitmap || !width || !height) return
    const scale = Math.max(width / bitmap.width, height / bitmap.height)
    const drawWidth = bitmap.width * scale
    const drawHeight = bitmap.height * scale
    const x = (width - drawWidth) / 2
    const y = (height - drawHeight) / 2

    ctx.drawImage(bitmap, x, y, drawWidth, drawHeight)
  }

  function render() {
    if (disposed || !width || !height) return

    const selected = chooseReadyFrame()
    if (selected < 0 || selected === lastDrawn) return

    const bitmap = bitmaps.get(selected)
    if (!bitmap) return

    lruSet(bitmaps, selected, bitmap)
    if (!hasDrawn) {
      ctx.fillStyle = BACKGROUND
      ctx.fillRect(0, 0, width, height)
      hasDrawn = true
    }

    // Har bir frame to‘liq canvasni qoplaydi, shuning uchun alohida clear shart emas.
    drawBitmap(bitmap)
    lastDrawn = selected
    trimCache()
  }

  function scheduleRender() {
    if (drawRaf || disposed) return
    drawRaf = requestAnimationFrame(() => {
      drawRaf = 0
      render()
    })
  }

  function getDecodePriorities() {
    return makePriorityList(profile.decodeAhead, profile.decodeBehind)
  }

  function scheduleRetry(index, error) {
    const count = (failures.get(index) || 0) + 1
    failures.set(index, count)
    if (count > 3) return

    const delay = Math.min(2500, 350 * 2 ** (count - 1))
    retryAt.set(index, Date.now() + delay)

    if (retryTimer) clearTimeout(retryTimer)
    retryTimer = setTimeout(() => {
      retryTimer = 0
      if (!disposed) pump()
    }, delay)

    if (error?.name !== 'AbortError') {
      console.warn('LUBRIX FRAME LOAD ERROR:', frameUrl(index), error)
    }
  }

  async function fetchFrame(index) {
    const controller = new AbortController()
    fetching.set(index, controller)

    try {
      const response = await fetch(frameUrl(index), {
        cache: 'force-cache',
        credentials: 'same-origin',
        signal: controller.signal,
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)

      const blob = await response.blob()
      if (disposed || controller.signal.aborted) return

      lruSet(blobs, index, blob)
      failures.delete(index)
      retryAt.delete(index)
      trimCache()
    } catch (error) {
      if (!disposed && error?.name !== 'AbortError') scheduleRetry(index, error)
    } finally {
      fetching.delete(index)
      if (!disposed) pump()
    }
  }

  async function decodeFrame(index) {
    decoding.add(index)

    try {
      const blob = blobs.get(index)
      if (!blob) return

      let bitmap
      if (typeof createImageBitmap === 'function') {
        bitmap = await createImageBitmap(blob)
      } else {
        const objectUrl = URL.createObjectURL(blob)
        try {
          const image = new Image()
          image.decoding = 'async'
          image.src = objectUrl
          if (image.decode) {
            await image.decode()
          } else {
            await new Promise((resolve, reject) => {
              image.onload = resolve
              image.onerror = reject
            })
          }
          bitmap = image
        } finally {
          URL.revokeObjectURL(objectUrl)
        }
      }

      if (disposed) {
        bitmap.close?.()
        return
      }

      // Juda uzoqdagi eski decode natijasini RAM'da ushlab turmaymiz.
      const distance = Math.abs(index - target)
      const maxUsefulDistance = Math.max(profile.ahead, profile.behind) + 8
      if (distance > maxUsefulDistance) {
        bitmap.close?.()
        return
      }

      const previous = bitmaps.get(index)
      previous?.close?.()
      lruSet(bitmaps, index, bitmap)
      trimCache()
      scheduleRender()
    } catch (error) {
      if (!disposed) console.warn('LUBRIX FRAME DECODE ERROR:', frameUrl(index), error)
    } finally {
      decoding.delete(index)
      if (!disposed) pump()
    }
  }

  function pump() {
    if (disposed) return

    const fetchPriorities = makePriorityList(profile.ahead, profile.behind)
    const decodePriorities = getDecodePriorities()

    let fetchSlots = profile.fetch - fetching.size
    for (const index of fetchPriorities) {
      if (fetchSlots <= 0) break
      if (blobs.has(index) || fetching.has(index)) continue
      if ((retryAt.get(index) || 0) > Date.now()) continue
      if ((failures.get(index) || 0) >= 4) continue

      fetchSlots -= 1
      fetchFrame(index)
    }

    let decodeSlots = profile.decode - decoding.size
    for (const index of decodePriorities) {
      if (decodeSlots <= 0) break
      if (!blobs.has(index) || bitmaps.has(index) || decoding.has(index)) continue

      decodeSlots -= 1
      decodeFrame(index)
    }
  }

  function cancelDistantRequests() {
    // Har scroll o‘zgarishida hamma requestni abort qilish tarmoqni band qiladi.
    // Faqat playhead'dan ancha uzoq qolgan requestlar bekor qilinadi.
    for (const [index, controller] of fetching) {
      if (Math.abs(index - target) > profile.abortDistance) {
        controller.abort()
      }
    }
  }

  function resize() {
    if (disposed) return
    const rect = canvas.getBoundingClientRect()
    if (!rect.width || !rect.height) return

    const pixelLimitDpr = Math.sqrt(MAX_CANVAS_PIXELS / (rect.width * rect.height))
    const dpr = Math.min(window.devicePixelRatio || 1, profile.dpr, pixelLimitDpr)
    const nextWidth = Math.max(1, Math.round(rect.width * dpr))
    const nextHeight = Math.max(1, Math.round(rect.height * dpr))

    if (nextWidth === width && nextHeight === height) return

    width = nextWidth
    height = nextHeight
    canvas.width = width
    canvas.height = height

    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    lastDrawn = -1
    hasDrawn = false
    scheduleRender()
  }

  function setProgress(progress) {
    if (disposed) return

    const nextTarget = clamp(progress, 0, 1) * (TOTAL_FRAMES - 1)
    if (Math.abs(nextTarget - target) < 0.001) return

    direction = nextTarget >= target ? 1 : -1
    target = nextTarget

    cancelDistantRequests()
    scheduleRender()
    pump()
  }

  resize()

  if ('ResizeObserver' in window) {
    observer = new ResizeObserver(resize)
    observer.observe(canvas)
  } else {
    resizeFallback = true
    window.addEventListener('resize', resize, { passive: true })
  }

  // Dastlab birinchi kadr va uning atrofidagi kadrlar yuklanadi.
  pump()

  function destroy() {
    if (disposed) return
    disposed = true

    if (drawRaf) cancelAnimationFrame(drawRaf)
    if (retryTimer) clearTimeout(retryTimer)

    observer?.disconnect()
    if (resizeFallback) window.removeEventListener('resize', resize)

    for (const controller of fetching.values()) controller.abort()
    fetching.clear()

    for (const bitmap of bitmaps.values()) bitmap.close?.()
    bitmaps.clear()
    blobs.clear()
    decoding.clear()
    failures.clear()
    retryAt.clear()
  }

  return { setProgress, destroy }
}

export default function SectionThree() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const engineRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  useEffect(() => {
    const canvas = canvasRef.current
    const section = sectionRef.current
    if (!canvas || !section) return undefined

    let engine = null
    let disposed = false
    let visibilityObserver = null

    const startEngine = () => {
      if (disposed || engine) return
      engine = createFrameEngine(canvas)
      if (!engine) return
      engineRef.current = engine
      // Section ko‘rinish hududiga kirgan paytdagi haqiqiy progress bilan boshlaymiz.
      engine.setProgress(scrollYProgress.get())
    }

    if ('IntersectionObserver' in window) {
      visibilityObserver = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            startEngine()
            visibilityObserver?.disconnect()
            visibilityObserver = null
          }
        },
        { root: null, rootMargin: '140% 0px', threshold: 0 }
      )
      visibilityObserver.observe(section)
    } else {
      startEngine()
    }

    return () => {
      disposed = true
      visibilityObserver?.disconnect()
      engineRef.current = null
      engine?.destroy()
    }
  }, [scrollYProgress])

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    engineRef.current?.setProgress(progress)
  })

  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section
    id="why"
      ref={sectionRef}
      aria-label="Lubrix imkoniyatlari"
      className="relative h-[500vh] bg-[#080808] text-white"
    >
      <div className="sticky top-0 isolate h-[100svh] min-h-[520px] w-full overflow-hidden bg-[#080808]">
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 block h-full w-full"
          style={{ transform: 'translateZ(0)', contain: 'strict' }}
        />

        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black/[0.05]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/35 via-black/10 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/[0.06]"
        />

        {features.map((feature, index) => (
          <AnimatedFeature
            key={feature.number}
            feature={feature}
            index={index}
            progress={scrollYProgress}
          />
        ))}

        <div className="absolute bottom-6 left-6 right-6 z-30 flex items-center justify-between sm:bottom-9 md:bottom-12 md:left-16 md:right-16">
          <div className="flex items-center gap-3 sm:gap-5">
            <span className="text-[10px] font-semibold tracking-[0.25em] text-white/85 sm:text-xs">
              LUBRIX
            </span>
            <div className="relative h-px w-16 overflow-hidden bg-white/30 sm:w-28 md:w-40">
              <motion.div
                style={{ width: progressWidth }}
                className="absolute left-0 top-0 h-full bg-white"
              />
            </div>
            <span className="text-[9px] tracking-[0.2em] text-white/55 sm:text-[10px]">
              IMKONIYATLAR
            </span>
          </div>
          <span className="text-[9px] tracking-[0.25em] text-white/65 sm:text-xs">SCROLL</span>
        </div>
      </div>
    </section>
  )
}
