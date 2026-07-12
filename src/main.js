import { wordLists, getWordListById } from './data/index.js'
import speechManager from './speech.js'

// 当前显示的单词列表ID
let currentListId = null

// 自然拼读音节着色
function colorizeWord(text) {
  // 处理包含空格的短语（如 "a banana"）
  return text.split(' ').map(word => colorizeWordPart(word)).join(' ')
}

function colorizeWordPart(word) {
  if (!word) return ''

  // 定义发音组合（按优先级排序，长的在前）
  const phonicsPatterns = [
    // 元音组合
    { pattern: /ough/gi, type: 'vowel-combo' },
    { pattern: /tion/gi, type: 'vowel-combo' },
    { pattern: /sion/gi, type: 'vowel-combo' },
    { pattern: /eigh/gi, type: 'vowel-combo' },
    { pattern: /ight/gi, type: 'vowel-combo' },
    { pattern: /augh/gi, type: 'vowel-combo' },
    { pattern: /ould/gi, type: 'vowel-combo' },
    { pattern: /ious/gi, type: 'vowel-combo' },
    { pattern: /eous/gi, type: 'vowel-combo' },
    { pattern: /eau/gi, type: 'vowel-combo' },
    { pattern: /oo/gi, type: 'vowel-combo' },
    { pattern: /ee/gi, type: 'vowel-combo' },
    { pattern: /ea/gi, type: 'vowel-combo' },
    { pattern: /ai/gi, type: 'vowel-combo' },
    { pattern: /ay/gi, type: 'vowel-combo' },
    { pattern: /oa/gi, type: 'vowel-combo' },
    { pattern: /ow/gi, type: 'vowel-combo' },
    { pattern: /ou/gi, type: 'vowel-combo' },
    { pattern: /oi/gi, type: 'vowel-combo' },
    { pattern: /oy/gi, type: 'vowel-combo' },
    { pattern: /au/gi, type: 'vowel-combo' },
    { pattern: /aw/gi, type: 'vowel-combo' },
    { pattern: /ew/gi, type: 'vowel-combo' },
    { pattern: /ue/gi, type: 'vowel-combo' },
    { pattern: /ui/gi, type: 'vowel-combo' },
    { pattern: /ie/gi, type: 'vowel-combo' },
    { pattern: /ei/gi, type: 'vowel-combo' },

    // 辅音组合
    { pattern: /tch/gi, type: 'consonant-combo' },
    { pattern: /dge/gi, type: 'consonant-combo' },
    { pattern: /sch/gi, type: 'consonant-combo' },
    { pattern: /scr/gi, type: 'consonant-combo' },
    { pattern: /spr/gi, type: 'consonant-combo' },
    { pattern: /spl/gi, type: 'consonant-combo' },
    { pattern: /str/gi, type: 'consonant-combo' },
    { pattern: /squ/gi, type: 'consonant-combo' },
    { pattern: /thr/gi, type: 'consonant-combo' },
    { pattern: /chr/gi, type: 'consonant-combo' },
    { pattern: /ph/gi, type: 'consonant-combo' },
    { pattern: /ch/gi, type: 'consonant-combo' },
    { pattern: /sh/gi, type: 'consonant-combo' },
    { pattern: /th/gi, type: 'consonant-combo' },
    { pattern: /wh/gi, type: 'consonant-combo' },
    { pattern: /ck/gi, type: 'consonant-combo' },
    { pattern: /ng/gi, type: 'consonant-combo' },
    { pattern: /nk/gi, type: 'consonant-combo' },
    { pattern: /gh/gi, type: 'consonant-combo' },
    { pattern: /wr/gi, type: 'consonant-combo' },
    { pattern: /kn/gi, type: 'consonant-combo' },
    { pattern: /gn/gi, type: 'consonant-combo' },
    { pattern: /mb/gi, type: 'consonant-combo' },
    { pattern: /bl/gi, type: 'consonant-combo' },
    { pattern: /cl/gi, type: 'consonant-combo' },
    { pattern: /fl/gi, type: 'consonant-combo' },
    { pattern: /gl/gi, type: 'consonant-combo' },
    { pattern: /pl/gi, type: 'consonant-combo' },
    { pattern: /sl/gi, type: 'consonant-combo' },
    { pattern: /br/gi, type: 'consonant-combo' },
    { pattern: /cr/gi, type: 'consonant-combo' },
    { pattern: /dr/gi, type: 'consonant-combo' },
    { pattern: /fr/gi, type: 'consonant-combo' },
    { pattern: /gr/gi, type: 'consonant-combo' },
    { pattern: /pr/gi, type: 'consonant-combo' },
    { pattern: /tr/gi, type: 'consonant-combo' },
    { pattern: /sc/gi, type: 'consonant-combo' },
    { pattern: /sk/gi, type: 'consonant-combo' },
    { pattern: /sm/gi, type: 'consonant-combo' },
    { pattern: /sn/gi, type: 'consonant-combo' },
    { pattern: /sp/gi, type: 'consonant-combo' },
    { pattern: /st/gi, type: 'consonant-combo' },
    { pattern: /sw/gi, type: 'consonant-combo' },
    { pattern: /tw/gi, type: 'consonant-combo' },

    // R控制元音
    { pattern: /ar/gi, type: 'r-controlled' },
    { pattern: /er/gi, type: 'r-controlled' },
    { pattern: /ir/gi, type: 'r-controlled' },
    { pattern: /or/gi, type: 'r-controlled' },
    { pattern: /ur/gi, type: 'r-controlled' },

    // 单个元音
    { pattern: /[aeiou]/gi, type: 'vowel' },

    // 半元音y（在词尾发元音）
    { pattern: /y$/gi, type: 'vowel' },

    // 辅音
    { pattern: /[bcdfghjklmnpqrstvwxyz]/gi, type: 'consonant' }
  ]

  // 标记每个字符的类型
  const chars = word.split('')
  const types = new Array(chars.length).fill(null)

  // 用一个临时字符串来跟踪已处理的位置
  let processed = word.toLowerCase()

  for (const { pattern, type } of phonicsPatterns) {
    let match
    const regex = new RegExp(pattern.source, 'gi')
    while ((match = regex.exec(word)) !== null) {
      const start = match.index
      const end = start + match[0].length

      // 检查这个位置是否已经被处理
      let alreadyProcessed = false
      for (let i = start; i < end; i++) {
        if (types[i] !== null) {
          alreadyProcessed = true
          break
        }
      }

      if (!alreadyProcessed) {
        for (let i = start; i < end; i++) {
          types[i] = type
        }
      }
    }
  }

  // 生成带颜色的HTML
  let html = ''
  let i = 0
  while (i < chars.length) {
    const type = types[i]
    let j = i + 1

    // 找到连续相同类型的字符
    while (j < chars.length && types[j] === type) {
      j++
    }

    const segment = chars.slice(i, j).join('')
    html += `<span class="phonics-${type || 'consonant'}">${segment}</span>`
    i = j
  }

  return html
}
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

  // 检查语音合成支持
  checkSpeechSupport()

  // 优先显示上次打开的列表
  const lastListId = getLastListId()
  const targetListId = lastListId && getWordListById(lastListId)
    ? lastListId
    : (wordLists.length > 0 ? wordLists[0].id : null)

  if (targetListId) {
    showWordList(targetListId)
  }
}

// 检查浏览器是否支持语音合成
function checkSpeechSupport() {
  if (!('speechSynthesis' in window)) {
    console.warn('当前浏览器不支持语音合成功能')
    // 可以选择隐藏发音按钮或显示提示
    // showToast('您的浏览器不支持语音功能', 'warning')
  } else {
    console.log('✅ 语音合成功能已就绪')
  }
}

// 单词表分组规则（按顺序匹配，最后一条作为兜底分组）
const NAV_GROUPS = [
  { title: 'Annie 系列', match: id => /^annie\d+$/.test(id) },
  { title: 'Book2 Unit 系列', match: id => /^book2unit\d+$/.test(id) },
  { title: 'Unit 系列', match: id => /^unit\d+$/.test(id) },
  { title: '其他', match: () => true }
]

// 将单词表按分组规则归类
function groupWordLists(lists) {
  const groups = NAV_GROUPS.map(g => ({ title: g.title, items: [] }))
  lists.forEach(list => {
    const index = NAV_GROUPS.findIndex(g => g.match(list.id))
    groups[index >= 0 ? index : groups.length - 1].items.push(list)
  })
  return groups.filter(g => g.items.length > 0)
}

// 渲染导航菜单
function renderNavigation() {
  const nav = document.getElementById('word-list-nav')

  const groups = groupWordLists(wordLists)

  const groupsHtml = groups.map(group => `
    <div class="dropdown-group">
      <div class="dropdown-group-title">${group.title}</div>
      ${group.items.map(list => `<div class="dropdown-item" data-list-id="${list.id}">${list.name}</div>`).join('')}
    </div>
  `).join('')

  nav.innerHTML = `
    <div class="list-selector">
      <button class="selector-btn">
        <span class="selector-text">选择单词表</span>
      </button>
      <div class="selector-dropdown">
        <div class="selector-search">
          <input type="text" class="selector-search-input" placeholder="搜索单词表..." />
        </div>
        <div class="selector-dropdown-list">
          ${groupsHtml}
        </div>
        <div class="selector-no-results" hidden>无匹配结果</div>
      </div>
    </div>
  `

  const selector = nav.querySelector('.list-selector')
  const selectorBtn = nav.querySelector('.selector-btn')
  const selectorText = nav.querySelector('.selector-text')
  const searchInput = nav.querySelector('.selector-search-input')
  const noResults = nav.querySelector('.selector-no-results')

  // 按关键字过滤下拉列表（按名称或ID匹配，隐藏无匹配项的分组）
  function filterDropdown(query) {
    let anyVisible = false
    nav.querySelectorAll('.dropdown-group').forEach(groupEl => {
      let groupHasVisible = false
      groupEl.querySelectorAll('.dropdown-item').forEach(item => {
        const matches = !query ||
          item.textContent.toLowerCase().includes(query) ||
          item.dataset.listId.toLowerCase().includes(query)
        item.style.display = matches ? '' : 'none'
        if (matches) groupHasVisible = true
      })
      groupEl.style.display = groupHasVisible ? '' : 'none'
      if (groupHasVisible) anyVisible = true
    })
    noResults.hidden = anyVisible
  }

  // 点击按钮切换下拉菜单
  selectorBtn.addEventListener('click', (e) => {
    e.stopPropagation()
    const willOpen = !selector.classList.contains('open')
    selector.classList.toggle('open')
    if (willOpen) {
      searchInput.value = ''
      filterDropdown('')
      setTimeout(() => searchInput.focus(), 0)
    }
  })

  // 阻止在搜索框内的点击冒泡关闭菜单
  searchInput.addEventListener('click', (e) => e.stopPropagation())
  searchInput.addEventListener('input', (e) => {
    filterDropdown(e.target.value.trim().toLowerCase())
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
            <span class="col-word">
              <span class="word-text">${colorizeWord(word.word)}</span>
              <button class="speak-btn" data-word="${word.word}" title="点击发音" aria-label="朗读单词 ${word.word}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                </svg>
              </button>
            </span>
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
    const speakBtn = row.querySelector('.speak-btn')

    // 点击发音按钮
    if (speakBtn) {
      speakBtn.addEventListener('click', async (e) => {
        e.stopPropagation()
        const word = e.target.dataset.word || e.target.closest('.speak-btn').dataset.word

        // 添加播放动画
        speakBtn.classList.add('speaking')

        try {
          await speechManager.speak(word)
        } catch (error) {
          console.error('发音失败:', error)
          // 可以添加错误提示
          showToast('发音失败，请检查浏览器是否支持语音功能', 'error')
        } finally {
          speakBtn.classList.remove('speaking')
        }
      })
    }

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
      if (e.target.classList.contains('speak-btn') || e.target.closest('.speak-btn')) return
      const word = row.dataset.word
      const isMarked = toggleWordMark(listId, word)
      row.classList.toggle('marked', isMarked)
    })
  })
}

// 简单的提示框功能
function showToast(message, type = 'info') {
  const existingToast = document.querySelector('.toast')
  if (existingToast) {
    existingToast.remove()
  }

  const toast = document.createElement('div')
  toast.className = `toast toast-${type}`
  toast.textContent = message
  document.body.appendChild(toast)

  // 添加显示动画
  setTimeout(() => toast.classList.add('show'), 10)

  // 3秒后移除
  setTimeout(() => {
    toast.classList.remove('show')
    setTimeout(() => toast.remove(), 300)
  }, 3000)
}

// 启动应用
document.addEventListener('DOMContentLoaded', init)
