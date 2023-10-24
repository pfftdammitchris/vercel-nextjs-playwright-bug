import { NextResponse } from 'next/server'
import { type Browser, chromium } from 'playwright'

export async function GET() {
  let browser: Browser

  try {
    browser = await chromium.launch({ headless: true })

    const page = await browser.newPage()
    await page.goto('https://vercel.com')
    const h1Text = await page.locator('h1').textContent()

    return NextResponse.json({
      ok: true,
      h1: h1Text,
    })
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error))

    return NextResponse.json(
      {
        ok: false,
        error: { name: err.name, message: err.message, stack: err.stack },
      },
      { status: 500 },
    )
  } finally {
    await browser.close()
  }
}
