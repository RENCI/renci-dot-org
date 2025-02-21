import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function YearRedirectPage() {
  const router = useRouter()
  const { year } = router.query

  useEffect(() => {
    if (year) {
      router.replace(`/events/${year}/01`)
    }
  }, [year, router])

  return null
}
