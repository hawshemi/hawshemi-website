const root = document.documentElement
const languageButton = document.querySelector('.language')
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

function updateLanguage() {
  const url = new URL(window.location.href)
  const lang = url.searchParams.get('lang') || (/^\/fa(?:\/|$)/.test(url.pathname) ? 'fa' : 'en')
  const isFa = lang === 'fa'
  root.lang = isFa ? 'fa' : 'en'
  root.dir = isFa ? 'rtl' : 'ltr'
  document.querySelectorAll('[data-en]').forEach(element => {
    element.textContent = element.dataset[root.lang]
  })
  document.title = isFa ? 'رسول هاشمی | Hawshemi' : 'Rasoul Hashemi | Hawshemi'
  languageButton.textContent = isFa ? 'English' : 'فارسی'
  languageButton.lang = isFa ? 'en' : 'fa'
  languageButton.setAttribute('aria-label', isFa ? 'Switch to English' : 'تغییر زبان به فارسی')
  document.querySelector('.socials').setAttribute('aria-label', isFa ? 'شبکه‌های اجتماعی' : 'Elsewhere')
  document.querySelector('meta[name="description"]').content = isFa
    ? 'رسول هاشمی، معمار و متخصص فناوری اطلاعات، فعال در زمینهٔ شبکه، امنیت سایبری، نرم‌افزار و معماری.'
    : 'Rasoul Hashemi, architect and IT specialist working across networking, cybersecurity, software, and architecture.'
  updateTheme()
}

languageButton.addEventListener('click', () => {
  const url = new URL(window.location.href)
  url.searchParams.set('lang', root.lang === 'en' ? 'fa' : 'en')
  history.pushState(null, '', url)
  updateLanguage()
})

themeButton.addEventListener('click', () => {
  theme = root.dataset.theme === 'dark' ? 'light' : 'dark'
  try {
    localStorage.setItem('theme', theme)
  } catch {}
  updateTheme()
})

systemTheme.addEventListener('change', updateTheme)
window.addEventListener('popstate', updateLanguage)
updateLanguage()
document.querySelector('.controls').hidden = false
