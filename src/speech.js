/**
 * 语音合成模块 - 使用 Web Speech API 实现单词发音
 */

class SpeechManager {
  constructor() {
    this.synth = window.speechSynthesis
    this.voices = []
    this.currentVoice = null
    this.isSpeaking = false

    // 初始化语音列表
    this.loadVoices()

    // 某些浏览器需要等待 voiceschanged 事件
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => this.loadVoices()
    }
  }

  /**
   * 加载可用的语音列表
   */
  loadVoices() {
    this.voices = this.synth.getVoices()

    // 优先选择英语语音（美式或英式）
    this.currentVoice = this.voices.find(voice =>
      voice.lang === 'en-US' || voice.lang === 'en-GB'
    ) || this.voices.find(voice =>
      voice.lang.startsWith('en')
    ) || this.voices[0]

    console.log('Available voices:', this.voices.length)
    console.log('Selected voice:', this.currentVoice?.name, this.currentVoice?.lang)
  }

  /**
   * 朗读单词
   * @param {string} text - 要朗读的文本
   * @param {Object} options - 配置选项
   * @returns {Promise<void>}
   */
  speak(text, options = {}) {
    return new Promise((resolve, reject) => {
      // 如果正在朗读，先停止
      if (this.isSpeaking) {
        this.synth.cancel()
      }

      // 检查浏览器支持
      if (!this.synth) {
        reject(new Error('您的浏览器不支持语音合成功能'))
        return
      }

      // 创建语音合成utterance
      const utterance = new SpeechSynthesisUtterance(text)

      // 设置语音参数
      utterance.voice = this.currentVoice
      utterance.rate = options.rate || 0.9  // 语速（0.1-10，默认1）
      utterance.pitch = options.pitch || 1   // 音调（0-2，默认1）
      utterance.volume = options.volume || 1 // 音量（0-1，默认1）
      utterance.lang = options.lang || 'en-US' // 语言

      // 事件监听
      utterance.onstart = () => {
        this.isSpeaking = true
      }

      utterance.onend = () => {
        this.isSpeaking = false
        resolve()
      }

      utterance.onerror = (event) => {
        this.isSpeaking = false
        console.error('Speech error:', event.error)
        reject(new Error(`发音失败: ${event.error}`))
      }

      // 开始朗读
      this.synth.speak(utterance)
    })
  }

  /**
   * 停止朗读
   */
  stop() {
    if (this.synth) {
      this.synth.cancel()
      this.isSpeaking = false
    }
  }

  /**
   * 暂停朗读
   */
  pause() {
    if (this.synth && this.isSpeaking) {
      this.synth.pause()
    }
  }

  /**
   * 恢复朗读
   */
  resume() {
    if (this.synth) {
      this.synth.resume()
    }
  }

  /**
   * 检查是否支持语音合成
   * @returns {boolean}
   */
  static isSupported() {
    return 'speechSynthesis' in window
  }

  /**
   * 获取所有可用的英语语音
   * @returns {Array}
   */
  getEnglishVoices() {
    return this.voices.filter(voice => voice.lang.startsWith('en'))
  }

  /**
   * 设置当前使用的语音
   * @param {SpeechSynthesisVoice} voice
   */
  setVoice(voice) {
    this.currentVoice = voice
  }
}

// 创建单例实例
const speechManager = new SpeechManager()

export default speechManager
