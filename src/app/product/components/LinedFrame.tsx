import React from 'react'
import styles from './LinedFrame.module.css'

type LinedFrameProps = {
  width?: string
  height?: string
  children?: React.ReactNode
}

const LinedFrame: React.FC<LinedFrameProps> = ({ width = 'min-w-64', height = 'min-h-40', children }) => {
  return (
    <div className={`relative p-4 overflow-hidden text-beige ${width} ${height} ${styles.linedFrame}`}>
      {children}
    </div>
  )
}

export default LinedFrame
