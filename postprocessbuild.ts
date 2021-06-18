const fs = require('fs')
const map = {
  'scrip1': './dist_path1/',  
  'scrip2': './dist_path2/',  
}
const typeList = ['path1', 'path2']
const icoTypeList = ['path1.ico', 'path2.ico']
const retainType = process.env.npm_lifecycle_event
console.log('--', retainType)
console.log('--', process.env)
const prefix = map[process.env.npm_lifecycle_event]
typeList.forEach((type) => {
  if (retainType.indexOf(type) < 0) {
    if (icoTypeList.includes(`${type}.ico`)) {
      fs.unlinkSync(`${prefix}${type}.ico`)
    }
  }
})
