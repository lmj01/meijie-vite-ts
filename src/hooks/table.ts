import { reactive } from "vue";

// Table
export interface TestDataOption {
    id: number,
    name: string,
    describe: string,
}
export function testData() {
  const tblCol = reactive({
    col1: { show: true, label: ''},
    col2: { show: true, label: ''},
    col3: { show: true, label: ''},
    col4: { show: true, label: ''},
    count: 0,
  })
  const columnInitial = (type:string) => {
    column1(type);
  }
  const column1 = (type: string) => {

  }
  return {
    tblCol,
  }
}
  