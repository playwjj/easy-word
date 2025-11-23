import { wordLists, getWordListById } from './data/index.js'

// 当前显示的单词列表ID
let currentListId = null
// 是否隐藏释义模式
let hideMeaningMode = false

// localStorage keys
const STORAGE_KEYS = {
  lastListId: 'easyword_last_list_id',
  markedWords: 'easyword_marked_words',
  hideMeaningMode: 'easyword_hide_meaning'
}

// 获取标记的单词
function getMarkedWords() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.markedWords)
    return data ? JSON.parse(data) : {}
  } catch {
    return {}
  }
}

// 保存标记的单词
function saveMarkedWords(marked) {
  localStorage.setItem(STORAGE_KEYS.markedWords, JSON.stringify(marked))
}

// 切换单词标记状态
function toggleWordMark(listId, word) {
  const marked = getMarkedWords()
  const key = `${listId}:${word}`

  if (marked[key]) {
    delete marked[key]
  } else {
    marked[key] = true
  }

  saveMarkedWords(marked)
  updateProgress()
  return marked[key] || false
}

// 检查单词是否已标记
function isWordMarked(listId, word) {
  const marked = getMarkedWords()
  return marked[`${listId}:${word}`] || false
}

// 保存上次打开的列表
function saveLastListId(listId) {
  localStorage.setItem(STORAGE_KEYS.lastListId, listId)
}

// 获取上次打开的列表
function getLastListId() {
  return localStorage.getItem(STORAGE_KEYS.lastListId)
}

// 保存隐藏释义模式
function saveHideMeaningMode(mode) {
  localStorage.setItem(STORAGE_KEYS.hideMeaningMode, mode)
}

// 获取隐藏释义模式
function getHideMeaningMode() {
  return localStorage.getItem(STORAGE_KEYS.hideMeaningMode) === 'true'
}

// 更新学习进度
function updateProgress() {
  if (!currentListId) return

  const list = getWordListById(currentListId)
  if (!list) return

  const marked = getMarkedWords()
  const total = list.words.length
  const mastered = list.words.filter(w => marked[`${currentListId}:${w.word}`]).length

  const progressEl = document.getElementById('progress-display')
  if (progressEl) {
    progressEl.textContent = `已掌握 ${mastered}/${total}`
    progressEl.className = `progress-display ${mastered === total ? 'complete' : ''}`
  }
}

// 初始化应用
function init() {
  hideMeaningMode = getHideMeaningMode()
  renderNavigation()

  // 优先显示上次打开的列表
  const lastListId = getLastListId()
  const targetListId = lastListId && getWordListById(lastListId)
    ? lastListId
    : (wordLists.length > 0 ? wordLists[0].id : null)

  if (targetListId) {
    showWordList(targetListId)
  }
}

// 渲染导航菜单
function renderNavigation() {
  const nav = document.getElementById('word-list-nav')

  const dropdownItems = wordLists.map(list => {
    return `<div class="dropdown-item" data-list-id="${list.id}">${list.name}</div>`
  }).join('')

  nav.innerHTML = `
    <div class="list-selector">
      <button class="selector-btn">
        <span class="selector-text">选择单词表</span>
      </button>
      <div class="selector-dropdown">
        ${dropdownItems}
      </div>
    </div>
  `

  const selector = nav.querySelector('.list-selector')
  const selectorBtn = nav.querySelector('.selector-btn')
  const selectorText = nav.querySelector('.selector-text')

  // 点击按钮切换下拉菜单
  selectorBtn.addEventListener('click', (e) => {
    e.stopPropagation()
    selector.classList.toggle('open')
  })

  // 点击选项
  nav.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const listId = e.target.dataset.listId
      const listName = e.target.textContent
      selectorText.textContent = listName
      selector.classList.remove('open')

      // 更新选中状态
      nav.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('active'))
      e.target.classList.add('active')

      showWordList(listId)
    })
  })

  // 点击外部关闭下拉菜单
  document.addEventListener('click', () => {
    selector.classList.remove('open')
  })
}

// 显示单词列表
function showWordList(listId) {
  const list = getWordListById(listId)
  if (!list) return

  currentListId = listId

  // 保存当前列表ID
  saveLastListId(listId)

  // 更新下拉菜单状态
  const selectorText = document.querySelector('.selector-text')
  if (selectorText) {
    selectorText.textContent = list.name
  }
  document.querySelectorAll('.dropdown-item').forEach(item => {
    item.classList.toggle('active', item.dataset.listId === listId)
  })

  // 渲染单词列表
  const container = document.getElementById('word-container')

  const html = `
    <div class="word-list">
      <div class="list-toolbar">
        <span id="progress-display" class="progress-display">已掌握 0/${list.words.length}</span>
        <button id="toggle-meaning-btn" class="toggle-meaning-btn ${hideMeaningMode ? 'active' : ''}">
          ${hideMeaningMode ? '👁 显示释义' : '🙈 自测模式'}
        </button>
      </div>
      <div class="words-table">
        <div class="table-header">
          <span class="col-index">#</span>
          <span class="col-word">单词</span>
          <span class="col-meaning">释义</span>
        </div>
        ${list.words.map((word, index) => `
          <div class="word-row ${isWordMarked(listId, word.word) ? 'marked' : ''}" data-word="${word.word}">
            <span class="col-index">${index + 1}</span>
            <span class="col-word">${word.word}</span>
            <span class="col-meaning ${hideMeaningMode ? 'hidden-meaning' : ''}" data-meaning="${word.meaning}">${word.meaning}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `

  container.innerHTML = html

  // 更新进度
  updateProgress()

  // 自测模式切换按钮
  const toggleBtn = document.getElementById('toggle-meaning-btn')
  toggleBtn.addEventListener('click', () => {
    hideMeaningMode = !hideMeaningMode
    saveHideMeaningMode(hideMeaningMode)
    toggleBtn.textContent = hideMeaningMode ? '👁 显示释义' : '🙈 自测模式'
    toggleBtn.classList.toggle('active', hideMeaningMode)

    // 更新所有释义的显示状态
    document.querySelectorAll('.col-meaning').forEach(el => {
      el.classList.toggle('hidden-meaning', hideMeaningMode)
      el.classList.remove('revealed')
    })
  })

  // 添加单词行点击事件
  container.querySelectorAll('.word-row').forEach(row => {
    const meaningEl = row.querySelector('.col-meaning')

    // 点击释义显示（自测模式）
    meaningEl.addEventListener('click', (e) => {
      e.stopPropagation()
      if (hideMeaningMode) {
        meaningEl.classList.toggle('revealed')
      }
    })

    // 点击行标记掌握
    row.addEventListener('click', (e) => {
      if (e.target === meaningEl) return
      const word = row.dataset.word
      const isMarked = toggleWordMark(listId, word)
      row.classList.toggle('marked', isMarked)
    })
  })
}

// 启动应用
document.addEventListener('DOMContentLoaded', init)
