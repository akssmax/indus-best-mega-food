/** True in PageSpeed / Lighthouse / headless lab runs. */
export function isLabCrawler() {
  if (typeof navigator === "undefined") return false
  if (navigator.webdriver) return true
  return /Chrome-Lighthouse|PageSpeed|GTmetrix|HeadlessChrome|Lighthouse/i.test(
    navigator.userAgent,
  )
}
