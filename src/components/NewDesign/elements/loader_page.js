import React, { useState, useLayoutEffect } from "react"

export default function LoaderLarge() {
  const [isLoading, setLoading] = useState(false)

  useLayoutEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 800)
  }, [])

  return (
    <>
      {isLoading && (
        <div className="loader-_large hoc__loader tt">
          <div className="loader-_large-div">
            <div className="bt-spinner"></div>
          </div>
        </div>
      )}
    </>
  )
}
