import { useState } from 'react'

function getInitialTheme() {
  if (typeof window === 'undefined') {
    return true
  }

  const savedTheme = localStorage.getItem('theme')

  // If no theme has been saved, use dark mode
  const isDark = savedTheme !== 'light'

  // Apply the initial theme immediately
  if (isDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

  return isDark
}

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(getInitialTheme)

  const toggleTheme = () => {
    const newDarkMode = !darkMode

    setDarkMode(newDarkMode)

    if (newDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <header className="fixed top-2 left-2 right-2 z-50">
      <nav
        className="
          border border-black/15
          bg-white/95
          text-black
          backdrop-blur-md
          transition-colors

          dark:border-white/15
          dark:bg-[#090909]/95
          dark:text-white
        "
      >
        <div className="flex h-12 items-center justify-between px-4 md:px-6">

          {/* Logo */}

          <a
            href="/"
            className="
              flex items-center gap-3
              text-sm font-bold
              tracking-[0.18em]
            "
          >
            <div className="relative flex h-4 w-4 items-center justify-center">

              <div
                className="
                  absolute inset-0
                  border border-black/70
                  dark:border-white/70
                "
              />

              <div
                className="
                  h-2 w-2
                  border border-black/80
                  dark:border-white/80
                "
              />

              <span
                className="
                  absolute -top-1 -left-1
                  h-1 w-1
                  bg-black
                  dark:bg-white
                "
              />

              <span
                className="
                  absolute -top-1 -right-1
                  h-1 w-1
                  bg-black
                  dark:bg-white
                "
              />

              <span
                className="
                  absolute -bottom-1 -left-1
                  h-1 w-1
                  bg-black
                  dark:bg-white
                "
              />

              <span
                className="
                  absolute -bottom-1 -right-1
                  h-1 w-1
                  bg-black
                  dark:bg-white
                "
              />

            </div>

            <span>PASSPORT CROPPER</span>
          </a>

          {/* Right Side */}

          <div className="flex items-center gap-5">

            {/* Theme Toggle */}

            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="
                flex h-7 w-7
                items-center justify-center
                border border-black/15
                text-black/60
                transition

                hover:border-black/40
                hover:text-black

                dark:border-white/15
                dark:text-white/60
                dark:hover:border-white/40
                dark:hover:text-white
              "
            >
              {darkMode ? (
                /* Sun */

                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>

              ) : (

                /* Moon */

                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
                </svg>

              )}
            </button>

            {/* GitHub */}

            <a
              href="https://github.com/StringOfLogic/passportcropper"
              target="_blank"
              rel="noreferrer"
              className="
                flex h-7 items-center gap-3
                bg-black px-4
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.15em]
                text-white
                transition
                hover:bg-black/80

                dark:bg-white
                dark:text-black
                dark:hover:bg-white/85
              "
            >
              GitHub

              <span className="text-sm leading-none">
                →
              </span>
            </a>

          </div>

        </div>
      </nav>
    </header>
  )
}
