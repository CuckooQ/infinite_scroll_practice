/* 요소 */
const listEl = document.querySelector('.list')
const wrapperEl = document.querySelector('.wrapper')
let loadingEl 

/* 변수/상수 */
const maxItemCount = 50
const loadingSec = 3
let nextItemId = 0
let isLoading = false

/* 함수 */
function handleScroll(e) {
  ((e.target.scrollTop + e.target.offsetHeight) >= e.target.scrollHeight) && pushItemsToList()
}

function initEvent() {
  listEl.addEventListener('scroll', handleScroll)
}

function setLoading(isActive) {
  isLoading = isActive
  isLoading ? loadingEl.classList.add('active') : loadingEl.classList.remove('active')
}

function pushItemsToList() {
  if(isLoading) return
  setLoading(true)

  setTimeout(() => {
    const offsetI = nextItemId * maxItemCount
    for(let i = offsetI; i < offsetI + maxItemCount; i++) {
      const itemEl = document.createElement('li')
      itemEl.innerHTML = `아이템${i + 1}`
      listEl.appendChild(itemEl)
    }
    nextItemId++
    setLoading(false)
  }, loadingSec * 1000)
}

async function initLoadingEl() {
  return new Promise((resolve, _reject) => {
    const tempLoadingEl = document.createElement('img')
    tempLoadingEl.src = 'ic-Loading.svg'
    tempLoadingEl.classList.add("loading", "active")
    loadingEl = tempLoadingEl
    wrapperEl.appendChild(loadingEl)
    resolve(loadingEl)
  })
}

async function init() {
  await initLoadingEl()
  pushItemsToList()
  initEvent()
}

await init()
