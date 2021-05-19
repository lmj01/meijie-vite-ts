// 测试数据
export interface TestDataOption {
    id: number,
    name: string,
    describe: string,
}
export function testData() {
    const literal = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomStr = (count: number) => {    
      count = count % 90;
      let str = new Array()
      str.length = count;
      for (let i = 0; i< count; i++) {
        let pos = Math.floor(Math.random() * literal.length) % literal.length;
        str.fill(literal.charAt(pos), i, i+1);
      }
      return str.join('');
    }
    const fetchDataType1 = (count:number) => {
      const data: TestDataOption[] = [];
      if (typeof count !== 'number') throw 'count must is integer number'
      for (let i = 0; i < count; i++) {
        data.push({
          id: Math.ceil(Math.random() * 10000),
          name: `ss${i+1}`,
          describe: `describe--${randomStr(i+1)}`,
        })
      }
      return data;
    }
    return {
      fetchDataType1,
    }
  }
  