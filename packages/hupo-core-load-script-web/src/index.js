export const loadScript = url => new Promise((resolve, reject) => {
  const script = document.createElement('script')
  script.charset = 'utf-8'
  script.async = true
  script.addEventListener('error', () => reject(new Error(`Error loading ${url}`)))
  script.addEventListener('load', resolve)
  script.src = url
  document.head.appendChild(script)
})

export default loadScript
