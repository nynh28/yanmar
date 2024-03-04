import React, { Suspense } from 'react'
import '../i18n'
import { useTranslation } from 'react-i18next'
import { renderToString } from 'react-dom/server'

const mySuspense = (<Suspense />).type;
// TRANSLATION
export function t(KEY_NAME) {
  const Translation = () => {
    const { t } = useTranslation()
    return t(KEY_NAME)
  }
  return <Suspense fallback={null}> <span><Translation /></span > </Suspense>
}

export function rTT(reactSymbol) {
  try {
    if (reactSymbol.type === mySuspense) reactSymbol = reactSymbol.props.children
    let str = renderToString(reactSymbol)
    str = str.replace('<div data-reactroot="">', '').replace(/<\/div>/g, '')
      .replace('<span data-reactroot="">', '').replace(/<\/span>/g, '').replace(/<!-- -->/g, '')
    return str
  } catch (error) {
    return ""
  }
}