'use client'

import { useCallback, useEffect, useState } from 'react'

/**
 * React hook that synchronizes a localStorage key with React state.
 * Updates automatically when the key changes (in the same tab or another tab).
 */
export const useLocalStorage = <T>(
  key: string,
  defaultValue: T | null = null
) => {
  const readValue = useCallback(() => {
    try {
      const item = localStorage.getItem(key)

      if (!item) return defaultValue

      try {
        return JSON.parse(item) as T
      } catch {
        return item as unknown as T
      }
    } catch (error) {
      console.error(`Error reading localStorage key “${key}”:`, error)
      return defaultValue
    }
  }, [key, defaultValue])

  const [storedValue, setStoredValue] = useState<T | null>(readValue)

  const setValue = (value: T | null) => {
    try {
      if (value === null) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, JSON.stringify(value))
      }
      setStoredValue(value)

      // Dispatch synthetic event to notify same-tab listeners
      window.dispatchEvent(new StorageEvent('storage', { key }))
    } catch (error) {
      console.error(`Error setting localStorage key “${key}”:`, error)
    }
  }

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        setStoredValue(readValue())
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key, readValue])

  return [storedValue, setValue] as const
}
