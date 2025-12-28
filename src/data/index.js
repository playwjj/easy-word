// 导入所有单词列表
import annie001 from './annie001.json'
import annie002 from './annie002.json'
import annie003 from './annie003.json'
import annie004 from './annie004.json'
import unit2 from './unit2.json'
import unit3 from './unit3.json'
import unit4 from './unit4.json'
import unit5 from './unit5.json'
import unit6 from './unit6.json'
import play from './play.json'
import family from './family.json'

// 导出所有单词列表
export const wordLists = [
  annie001,
  annie002,
  annie003,
  annie004,
  unit2,
  unit3,
  unit4,
  unit5,
  unit6,
  play,
  family
]

// 按ID获取单词列表
export function getWordListById(id) {
  return wordLists.find(list => list.id === id)
}

export default wordLists
