import { h, render } from 'preact' // eslint-disable-line no-unused-vars

import App from '@/components/App'

import '@/global-styles/global.styl'

const targetElement = document.querySelector('#app-root')

render((
    <App />
), targetElement)
