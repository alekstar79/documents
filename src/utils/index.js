const caps = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
const lower = Array.from('abcdefghijklmnopqrstuvwxyz')
const numbers = Array.from('0123456789')

/**
* @param {String} set
* @returns {String[]}
*/
export function symbols(set = 'all')
{
  return set === 'all'
    ? Array.from([...caps,...lower,...numbers])
    : Array.from({ caps, lower, numbers }[set])
}

/**
* @param {?Number} [length]
* @param {String} signs
* @returns {String}
*/
export function rndstring(length, signs = 'all')
{
  Number.isInteger(length) || (length = 7)

  const base = symbols(signs)

  return Array.from({ length }, () => base[Math.random() * base.length | 0]).join('')
}

/**
* @param {String[]|ArrayLike} colors
* @param {String} marker
* @returns {{toString: (function(): string)}}
*/
export function createSeparator(colors, marker = '•')
{
  // noinspection HtmlUnknownAttribute

  return {
    toString: () => Array.from(
      colors || [],

      c => `${
        `<span class="leaf__sep" {style}>${marker}</span>`
          .replace(/\{style}/i, c ? `style="color:${c};"` : '')
      }`
    )
      .join('')
  }
}

/**
* @param {String} className
* @returns {HTMLElement}
*/
export function createMoveIcon(className)
{
  const wrapper = document.createElement('span')
  const span = document.createElement('span')
  const i = document.createElement('i')

  i.setAttribute('class', className)
  wrapper.setAttribute('title', 'move')
  span.setAttribute('class', 'icon')

  wrapper.append(span)
  span.append(i)

  return wrapper
}

/**
* @param {Function} fn
* @param {Number} ms
* @returns {(function(...[*]): void)}
*/
export function debounce(fn, ms = 9)
{
  let debounceTimeout

  return function(...args) {
    debounceTimeout && clearTimeout(debounceTimeout)

    debounceTimeout = setTimeout(
      fn.bind(this, ...args),
      ms
    )
  }
}
