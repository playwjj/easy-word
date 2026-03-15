// 导入所有单词列表
import annie001 from './annie001.json'
import annie002 from './annie002.json'
import annie003 from './annie003.json'
import annie004 from './annie004.json'
import annie005 from './annie005.json'
import annie006 from './annie006.json'
import annie007 from './annie007.json'
import unit2 from './unit2.json'
import unit3 from './unit3.json'
import unit4 from './unit4.json'
import unit5 from './unit5.json'
import unit6 from './unit6.json'
import play from './play.json'
import family from './family.json'
import list003001 from './003001.json'
import book2unit1 from './book2unit1.json'

// 导出所有单词列表
export const wordLists = [
  annie001,
  annie002,
  annie003,
  annie004,
  annie005,
  annie006,
  annie007,
  unit2,
  unit3,
  unit4,
  unit5,
  unit6,
  play,
  family,
  list003001,
  book2unit1
]

// 按ID获取单词列表
export function getWordListById(id) {
  return wordLists.find(list => list.id === id)
}

export default wordLists
