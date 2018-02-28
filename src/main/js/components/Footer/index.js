import React from 'react'
import cssModules from 'react-css-modules'
import styles from './index.scss'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <span className="text-muted">© Anadea, Inc.</span>
      </div>
    </footer>
  )
}

export default cssModules(Footer, styles)
