import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/js/dist/modal'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.scss'
import './services/i18n'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

declare global {
  interface String {
    format: (...args: any) => string
  }
}

String.prototype.format = function () {
  const args = arguments
  return this.replace(/{([0-9]+)}/g, function (match, index) {
    return typeof args[index] == 'undefined' ? match : args[index]
  })
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  </React.StrictMode>
)

