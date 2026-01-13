/**
 * CoralCSS vs Tailwind CSS 4.x Benchmark Suite
 *
 * Real performance comparison using actual APIs
 * Run with: npm run benchmark
 */

import { performance } from 'perf_hooks'
import { createCoral } from '../src/kernel'
import { coralPreset } from '../src/presets/coral'
import { parse, expandVariantGroups } from '../src/core/parser'

// ============================================
// TYPES
// ============================================
interface BenchmarkResult {
  name: string
  framework: 'coral' | 'tailwind' | 'both'
  iterations: number
  totalTimeMs: number
  avgTimeMs: number
  opsPerSec: number
  minTimeMs: number
  maxTimeMs: number
}

// ============================================
// TEST DATA - Same classes for fair comparison
// ============================================
const TEST_CLASSES = {
  // Basic layout
  basic: ['flex', 'grid', 'block', 'hidden', 'relative', 'absolute', 'fixed', 'sticky'],

  // Spacing (most common)
  spacing: [
    'p-0', 'p-1', 'p-2', 'p-4', 'p-6', 'p-8',
    'px-4', 'py-2', 'pt-4', 'pb-8', 'pl-2', 'pr-6',
    'm-0', 'm-auto', 'mx-4', 'my-8', 'mt-2', 'mb-4',
    'gap-1', 'gap-2', 'gap-4', 'gap-8',
  ],

  // Sizing
  sizing: [
    'w-full', 'w-auto', 'w-1/2', 'w-1/3', 'w-screen',
    'h-full', 'h-auto', 'h-screen', 'h-64',
    'min-w-0', 'min-h-0', 'max-w-xl', 'max-w-none',
  ],

  // Flexbox
  flexbox: [
    'flex-row', 'flex-col', 'flex-wrap', 'flex-nowrap',
    'items-start', 'items-center', 'items-end', 'items-stretch',
    'justify-start', 'justify-center', 'justify-end', 'justify-between',
    'flex-1', 'flex-auto', 'flex-none', 'grow', 'shrink-0',
  ],

  // Typography
  typography: [
    'text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl',
    'font-thin', 'font-normal', 'font-medium', 'font-bold',
    'leading-none', 'leading-tight', 'leading-normal', 'leading-relaxed',
    'tracking-tight', 'tracking-normal', 'tracking-wide',
  ],

  // Colors
  colors: [
    'text-white', 'text-black', 'text-gray-500', 'text-blue-500', 'text-red-500',
    'bg-white', 'bg-black', 'bg-gray-100', 'bg-blue-500', 'bg-green-500',
    'border-gray-200', 'border-blue-500', 'border-transparent',
  ],

  // Borders & Effects
  borders: [
    'border', 'border-0', 'border-2', 'border-4',
    'rounded', 'rounded-md', 'rounded-lg', 'rounded-full', 'rounded-none',
    'shadow', 'shadow-sm', 'shadow-md', 'shadow-lg', 'shadow-xl', 'shadow-none',
  ],

  // States with variants
  variants: [
    'hover:bg-blue-600', 'hover:text-white', 'hover:scale-105',
    'focus:ring-2', 'focus:outline-none', 'focus:border-blue-500',
    'active:bg-blue-700', 'active:scale-95',
    'disabled:opacity-50', 'disabled:cursor-not-allowed',
  ],

  // Responsive
  responsive: [
    'sm:flex', 'sm:hidden', 'sm:grid-cols-2',
    'md:flex', 'md:block', 'md:grid-cols-3',
    'lg:flex', 'lg:grid-cols-4', 'lg:px-8',
    'xl:max-w-6xl', 'xl:grid-cols-5',
  ],

  // Dark mode
  darkMode: [
    'dark:bg-gray-900', 'dark:text-white', 'dark:border-gray-700',
    'dark:bg-gray-800', 'dark:text-gray-100', 'dark:hover:bg-gray-700',
  ],

  // Arbitrary values
  arbitrary: [
    'w-[200px]', 'h-[100vh]', 'p-[15px]', 'text-[14px]',
    'bg-[#ff6b6b]', 'text-[#333]', 'border-[#ddd]',
    'grid-cols-[1fr_2fr]', 'gap-[10px]',
  ],
}

// Flatten all classes
const ALL_CLASSES = Object.values(TEST_CLASSES).flat()

// ============================================
// BENCHMARK UTILITIES
// ============================================
function runBenchmark(
  name: string,
  framework: 'coral' | 'tailwind' | 'both',
  iterations: number,
  fn: () => void,
  skipWarmup = false
): BenchmarkResult {
  const times: number[] = []

  // Warmup (10%) - unless skipped for cold cache tests
  if (!skipWarmup) {
    const warmupCount = Math.max(10, Math.floor(iterations * 0.1))
    for (let i = 0; i < warmupCount; i++) {
      fn()
    }
  }

  // Actual benchmark
  const start = performance.now()

  for (let i = 0; i < iterations; i++) {
    const iterStart = performance.now()
    fn()
    times.push(performance.now() - iterStart)
  }

  const totalTime = performance.now() - start

  return {
    name,
    framework,
    iterations,
    totalTimeMs: totalTime,
    avgTimeMs: totalTime / iterations,
    opsPerSec: Math.round((iterations / totalTime) * 1000),
    minTimeMs: Math.min(...times),
    maxTimeMs: Math.max(...times),
  }
}

function formatOps(ops: number): string {
  if (ops >= 1000000) return `${(ops / 1000000).toFixed(2)}M`
  if (ops >= 1000) return `${(ops / 1000).toFixed(1)}K`
  return ops.toString()
}

function formatTime(ms: number): string {
  if (ms < 0.001) return `${(ms * 1000000).toFixed(0)}ns`
  if (ms < 1) return `${(ms * 1000).toFixed(1)}μs`
  return `${ms.toFixed(2)}ms`
}

function printResult(label: string, result: BenchmarkResult, baseline?: BenchmarkResult) {
  let comparison = ''
  if (baseline) {
    const ratio = result.opsPerSec / baseline.opsPerSec
    if (ratio > 1.1) {
      comparison = ` (${ratio.toFixed(1)}x faster)`
    } else if (ratio < 0.9) {
      comparison = ` (${(1/ratio).toFixed(1)}x slower)`
    }
  }
  console.log(`${label.padEnd(14)} ${formatOps(result.opsPerSec).padStart(10)} ops/sec | avg: ${formatTime(result.avgTimeMs).padStart(10)}${comparison}`)
}

// ============================================
// MAIN BENCHMARK
// ============================================
async function main() {
  const iterations = parseInt(process.argv[2] || '1000', 10)
  const outputJson = process.argv.includes('--json')

  console.log('\n╔═══════════════════════════════════════════════════════════════════════╗')
  console.log('║             CoralCSS vs Tailwind CSS 4.x Benchmark                    ║')
  console.log('╚═══════════════════════════════════════════════════════════════════════╝\n')

  console.log(`Platform:     ${process.platform} ${process.arch}`)
  console.log(`Node.js:      ${process.version}`)
  console.log(`Iterations:   ${iterations.toLocaleString()} per test`)
  console.log(`Test Classes: ${ALL_CLASSES.length}`)
  console.log('')

  // Initialize CoralCSS
  const coral = createCoral()
  const plugins = coralPreset({ darkMode: 'class' })
  plugins.forEach(plugin => coral.use(plugin))

  // Try to load Tailwind 4.x compile function
  let tailwindCompile: ((css: string, opts?: any) => Promise<{ build: (classes: string[]) => string }>) | null = null
  let tailwindCompiler: { build: (classes: string[]) => string } | null = null

  try {
    const tw = await import('tailwindcss')
    if (tw.compile) {
      tailwindCompile = tw.compile
      // Initialize Tailwind compiler
      tailwindCompiler = await tw.compile('@import "tailwindcss";', {
        loadStylesheet: async (id: string, base: string) => {
          if (id === 'tailwindcss') {
            // Return minimal base styles
            return {
              path: 'virtual:tailwindcss/index.css',
              base,
              content: '@tailwind base; @tailwind components; @tailwind utilities;',
            }
          }
          return { path: id, base, content: '' }
        },
      })
      console.log('Tailwind CSS: v4.x compile API loaded')
    }
  } catch (e: any) {
    console.log(`Tailwind CSS: Could not load compile API (${e.message})`)
  }

  console.log('')

  const allResults: Record<string, BenchmarkResult> = {}

  // ==========================================
  // TEST 1: Class Parsing (CoralCSS only)
  // ==========================================
  console.log('─'.repeat(75))
  console.log('TEST 1: Class Parsing (141 classes per iteration)')
  console.log('─'.repeat(75))

  const coralParsing = runBenchmark('Parsing', 'coral', iterations, () => {
    for (const cls of ALL_CLASSES) {
      parse(cls)
    }
  })
  allResults['coral_parsing'] = coralParsing

  printResult('CoralCSS:', coralParsing)
  console.log(`Tailwind:      (internal parser not exposed)`)
  console.log('')

  // ==========================================
  // TEST 2: CSS Generation
  // ==========================================
  console.log('─'.repeat(75))
  console.log('TEST 2: CSS Generation (50 classes)')
  console.log('─'.repeat(75))

  const testSet50 = ALL_CLASSES.slice(0, 50)

  const coralGen = runBenchmark('Generation', 'coral', iterations, () => {
    coral.generate(testSet50)
  })
  allResults['coral_generation'] = coralGen

  printResult('CoralCSS:', coralGen)

  if (tailwindCompiler) {
    const twGen = runBenchmark('Generation', 'tailwind', iterations, () => {
      tailwindCompiler!.build(testSet50)
    })
    allResults['tailwind_generation'] = twGen
    printResult('Tailwind:', twGen, coralGen)
  } else {
    console.log(`Tailwind:      (compile API not available)`)
  }
  console.log('')

  // ==========================================
  // TEST 3: Cache Performance
  // ==========================================
  console.log('─'.repeat(75))
  console.log('TEST 3: Cache Performance')
  console.log('─'.repeat(75))

  // For cold cache, we measure first-time generation for unique classes each time
  // Generate unique class names to avoid cache hits
  const uniqueClassSets = Array.from({ length: iterations }, (_, i) =>
    testSet50.map(cls => `${cls}-unique-${i}`)
  )

  let coldIdx = 0
  const coralCold = runBenchmark('Cold Cache', 'coral', Math.min(iterations, 100), () => {
    const freshCoral = createCoral()
    plugins.forEach(plugin => freshCoral.use(plugin))
    freshCoral.generate(uniqueClassSets[coldIdx % uniqueClassSets.length])
    coldIdx++
  }, true) // Skip warmup for cold test
  allResults['coral_cold'] = coralCold

  // Warm cache - same classes, primed cache
  coral.generate(testSet50) // Prime the cache
  const coralWarm = runBenchmark('Warm Cache', 'coral', iterations, () => {
    coral.generate(testSet50)
  })
  allResults['coral_warm'] = coralWarm

  const cacheSpeedup = coralWarm.opsPerSec / coralCold.opsPerSec

  printResult('Cold:', coralCold)
  printResult('Warm:', coralWarm)
  console.log(`Cache Speedup: ${cacheSpeedup.toFixed(1)}x faster with warm cache`)
  console.log('')

  // ==========================================
  // TEST 4: Variant Groups (CoralCSS exclusive)
  // ==========================================
  console.log('─'.repeat(75))
  console.log('TEST 4: Variant Groups (CoralCSS exclusive feature)')
  console.log('─'.repeat(75))

  const variantGroups = [
    'hover:(bg-blue-500 text-white scale-105 shadow-lg)',
    'dark:(bg-gray-900 text-gray-100 border-gray-700)',
    'sm:(flex items-center gap-4 p-4)',
    'focus:(ring-2 ring-blue-500 outline-none border-blue-500)',
    'lg:hover:(bg-blue-600 text-white transform scale-110)',
  ]

  const variantResult = runBenchmark('Variant Groups', 'coral', iterations, () => {
    for (const group of variantGroups) {
      expandVariantGroups(group)
    }
  })
  allResults['coral_variants'] = variantResult

  printResult('CoralCSS:', variantResult)
  console.log(`Tailwind:      (feature not available - requires manual expansion)`)
  console.log('')

  // ==========================================
  // TEST 5: Large Scale (all 141 classes)
  // ==========================================
  console.log('─'.repeat(75))
  console.log('TEST 5: Large Scale (141 classes)')
  console.log('─'.repeat(75))

  const coralLarge = runBenchmark('Large Scale', 'coral', Math.floor(iterations / 2), () => {
    coral.generate(ALL_CLASSES)
  })
  allResults['coral_large'] = coralLarge

  printResult('CoralCSS:', coralLarge)

  if (tailwindCompiler) {
    const twLarge = runBenchmark('Large Scale', 'tailwind', Math.floor(iterations / 2), () => {
      tailwindCompiler!.build(ALL_CLASSES)
    })
    allResults['tailwind_large'] = twLarge
    printResult('Tailwind:', twLarge, coralLarge)
  }
  console.log('')

  // ==========================================
  // TEST 6: CSS Output Size
  // ==========================================
  console.log('─'.repeat(75))
  console.log('TEST 6: CSS Output Size')
  console.log('─'.repeat(75))

  const coralCSS = coral.generate(ALL_CLASSES)
  const coralSize = new TextEncoder().encode(coralCSS).length

  console.log(`CoralCSS:      ${(coralSize / 1024).toFixed(2)} KB (${ALL_CLASSES.length} classes)`)

  if (tailwindCompiler) {
    const twCSS = tailwindCompiler.build(ALL_CLASSES)
    const twSize = new TextEncoder().encode(twCSS).length
    console.log(`Tailwind:      ${(twSize / 1024).toFixed(2)} KB (${ALL_CLASSES.length} classes)`)
  }
  console.log('')

  // ==========================================
  // TEST 7: Memory Usage
  // ==========================================
  console.log('─'.repeat(75))
  console.log('TEST 7: Memory Usage (1000 generations)')
  console.log('─'.repeat(75))

  if (global.gc) global.gc()
  const memBefore = process.memoryUsage().heapUsed / 1024 / 1024

  for (let i = 0; i < 1000; i++) {
    coral.generate(ALL_CLASSES)
  }

  if (global.gc) global.gc()
  const memAfter = process.memoryUsage().heapUsed / 1024 / 1024
  const memDelta = memAfter - memBefore

  console.log(`Before:        ${memBefore.toFixed(2)} MB`)
  console.log(`After:         ${memAfter.toFixed(2)} MB`)
  console.log(`Delta:         ${memDelta >= 0 ? '+' : ''}${memDelta.toFixed(2)} MB`)
  console.log('')

  // ==========================================
  // SUMMARY
  // ==========================================
  console.log('╔═══════════════════════════════════════════════════════════════════════╗')
  console.log('║                            SUMMARY                                    ║')
  console.log('╚═══════════════════════════════════════════════════════════════════════╝\n')

  console.log('CoralCSS Performance:')
  console.log(`  Class Parsing:      ${formatOps(coralParsing.opsPerSec)} ops/sec`)
  console.log(`  CSS Generation:     ${formatOps(coralGen.opsPerSec)} ops/sec`)
  console.log(`  Cached Generation:  ${formatOps(coralWarm.opsPerSec)} ops/sec`)
  console.log(`  Variant Groups:     ${formatOps(variantResult.opsPerSec)} ops/sec`)
  console.log(`  Large Scale:        ${formatOps(coralLarge.opsPerSec)} ops/sec`)
  console.log(`  Cache Speedup:      ${cacheSpeedup.toFixed(1)}x`)
  console.log('')

  if (allResults['tailwind_generation']) {
    const genRatio = coralGen.opsPerSec / allResults['tailwind_generation'].opsPerSec
    console.log('vs Tailwind CSS 4.x:')
    if (genRatio > 1) {
      console.log(`  CSS Generation:     CoralCSS is ${genRatio.toFixed(1)}x faster`)
    } else {
      console.log(`  CSS Generation:     Tailwind is ${(1/genRatio).toFixed(1)}x faster`)
    }

    if (allResults['tailwind_large']) {
      const largeRatio = coralLarge.opsPerSec / allResults['tailwind_large'].opsPerSec
      if (largeRatio > 1) {
        console.log(`  Large Scale:        CoralCSS is ${largeRatio.toFixed(1)}x faster`)
      } else {
        console.log(`  Large Scale:        Tailwind is ${(1/largeRatio).toFixed(1)}x faster`)
      }
    }
    console.log('')
  }

  console.log('CoralCSS Exclusive Features:')
  console.log('  + Zero runtime dependencies')
  console.log('  + Variant groups: hover:(class1 class2 class3)')
  console.log('  + Modern CSS: anchor positioning, scroll-driven animations')
  console.log('  + @starting-style support')
  console.log('  + 60+ built-in animations')
  console.log('  + 4 dark mode strategies')
  console.log('')

  // JSON output
  if (outputJson) {
    const jsonOutput = {
      timestamp: new Date().toISOString(),
      platform: `${process.platform} ${process.arch}`,
      nodeVersion: process.version,
      iterations,
      testClasses: ALL_CLASSES.length,
      results: allResults,
      cacheSpeedup,
      memory: {
        before: Math.round(memBefore * 100) / 100,
        after: Math.round(memAfter * 100) / 100,
        delta: Math.round(memDelta * 100) / 100,
      },
      cssOutput: {
        coral: coralSize,
      }
    }

    console.log('\n─── JSON OUTPUT ───')
    console.log(JSON.stringify(jsonOutput, null, 2))
  }

  console.log('\nTips:')
  console.log('  --expose-gc    For accurate memory measurements')
  console.log('  --json         For machine-readable output')
  console.log('  5000           Custom iteration count (default: 1000)')
}

main().catch(console.error)
