'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const LanguageContext = createContext({ language: 'uz', setLanguage: () => {} })

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState('uz')

  useEffect(() => {
    const saved = window.localStorage.getItem('lubrix-language')
    const initial = saved === 'en' ? 'en' : 'uz'
    const timer = window.setTimeout(() => setLanguageState(initial), 0)

    return () => window.clearTimeout(timer)
  }, [])

  const setLanguage = (nextLanguage) => {
    const value = nextLanguage === 'en' ? 'en' : 'uz'
    setLanguageState(value)
    window.localStorage.setItem('lubrix-language', value)
    document.documentElement.lang = value === 'en' ? 'en' : 'uz'
    window.dispatchEvent(new CustomEvent('languagechange', { detail: value }))
  }

  useEffect(() => {
    document.documentElement.lang = language === 'en' ? 'en' : 'uz'
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
