import React, { useEffect, useState } from 'react'

const Width = () => {
    const [width, setWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleWidth = () => {
            setWidth(window.innerWidth)
            console.log(width)
        }
        window.addEventListener('resize', handleWidth)

        return () => {
            window.removeEventListener('resize', handleWidth)
        }
    }, [])

  return{width}
}

export default Width