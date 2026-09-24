const root = document.documentElement
const themeButton = document.querySelector('.theme')
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
let theme = null

try {
  theme = localStorage.getItem('theme')
} catch {}

function updateTheme() {
  const dark = theme === 'dark' || (theme !== 'light' && systemTheme.matches)
  root.dataset.theme = dark ? 'dark' : 'light'
  themeButton.setAttribute('aria-label', root.lang === 'fa'
    ? (dark ? 'تغییر به زمینه روشن' : 'تغییر به زمینه تیره')
    : (dark ? 'Switch to light theme' : 'Switch to dark theme'))
  document.querySelectorAll('meta[name="theme-color"]').forEach(meta => {
    meta.content = dark ? '#1e1d24' : '#f6f5f8'
  })
}

themeButton.addEventListener('click', () => {
  theme = root.dataset.theme === 'dark' ? 'light' : 'dark'
  try {
    localStorage.setItem('theme', theme)
  } catch {}
  updateTheme()
})

systemTheme.addEventListener('change', updateTheme)
updateTheme()
themeButton.hidden = false
