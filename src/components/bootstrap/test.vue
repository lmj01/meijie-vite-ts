<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-6">
                <div class="d-flex flex-column">
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                    </button>
                    <button type="button" class="btn btn-primary" @click="ud.modal.show()">打开对话框</button>
                </div>
            </div>
            <div class="col-6">
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown button
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item" href="/page1/">Action</a></li>
                        <li><a class="dropdown-item" href="/page1/">Another action</a></li>
                        <li><a class="dropdown-item" href="/page1/">Something else here</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <button type="class" class="btn btn-primary" @click="updateRandomTotal">更新随机页数</button>
        <div class="row">
            <Pagination :pageTotal="ud.total" @page="updateNewPage" />
        </div>
        <div>
            <p>每页个数{{ud.count}}, 总数有{{ud.total2}}</p>
            <form class="row">
                <div class="col-auto">
                    <input class="form-control" list="dataSearchOptions" id="sss" />
                    <datalist id="dataSearchOptions">
                        <option value="San Francisco" />
                        <option value="New York" />
                        <option value="Seattle" />
                        <option value="Los Angeles" />
                        <option value="Chicago" />
                    </datalist>
                </div>
            </form>
        </div>
        <div class="table-component">
            <div class="table-container">
                <div class="table-header-container">
                    <table id="tHead">
                        <colgroup>
                            <col>
                            <col>
                            <col>
                            <col>
                            <col>
                            <col v-if="ud.scroll" width="17px">
                        </colgroup>
                        <tbody>
                            <tr>
                                <td :class="ud.cls">
                                    <div>编号</div>
                                </td>
                                <td>
                                    <div>姓名</div>
                                </td>
                                <td>
                                    <div>Tonnage</div>
                                </td>
                                <td>
                                    <div>Tonnage</div>
                                </td>
                                <td>
                                    <div>操作</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div id="idtBodyContainer" class="table-body-container">
                    <table id="tBody" v-scroll>
                        <colgroup>
                            <col>
                            <col>
                            <col>
                            <col>
                            <col>
                        </colgroup>
                        <tbody>
                            <tr v-for="item in ud.data" :key="item.id">
                                <td :class="ud.cls">
                                    <div>{{item.id}}</div>
                                </td>
                                <td>
                                    <div>{{item.name}}</div>
                                </td>
                                <td>
                                    <div>{{Date.now()}}</div>
                                </td>
                                <td>
                                    <div>{{item.describe}}
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <button type="button" class="btn btn-primary" @click="openDialogCommon(0, '操作1', item)">操作1</button>
                                        <button type="button" class="btn btn-primary" @click="openDialogCommon(1, '操作2', item)">操作2</button>    
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="table-pagination">
                <Pagination2 :total="Number(Math.ceil(ud.total2/ud.count))" @page="updateNewPage" />
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script lang="ts">
import { ref, defineComponent, onMounted, reactive, watch } from 'vue'
import bootstrapModal from 'bootstrap/js/src/modal'
import bootstrapDropdown from 'bootstrap/js/src/dropdown'
import Pagination from './Pagination.vue'
import Pagination2 from './Pagination2.vue'
import { testData, TestDataOption } from '@/utils/testData'
export default defineComponent({
    name: 'bootstrap.test',
    components: {
        Pagination,
        Pagination2,
    },
    setup() {
        const ud = reactive({
            total: 10,
            total2: 10,
            count: 5,
            page: 1,
            testData: [],
            data: [],
            modal: null,
            dropdown: null,
            cls: 'w180',
            scroll: false,
            elTable: null,
        })
        // 模拟数据
        const { fetchDataType1 } = testData();
        const callTestData = (count) => Promise.resolve(fetchDataType1(count));
        onMounted(()=>{
            ud.modal = new bootstrapModal(document.getElementById('exampleModal'), {
                keyboard: false
            })            
            ud.dropdown = new bootstrapDropdown(document.getElementById('dropdownMenuButton1'), {})
            window.addEventListener('resize', (event)=> {
                console.log('window scroll event', event);
            })
            ud.elTable = document.getElementById('idtBodyContainer')
            ud.elTable.addEventListener('resize', (event)=>{
                console.log('table scroll event', event)
            })
        })
        // 初始测试数据
        const getPageData = () => {
            let start = (ud.page - 1) * ud.count;
            let count = ud.count;
            if (start + ud.count > ud.testData.length) {
                count = ud.testData.length - start;
            }
            ud.data = [];
            for (let i = 0; i < count; i++) {
                ud.data.push(ud.testData[start + i])
            }
        }
        callTestData(229).then((data) => {
            ud.testData = data;
            ud.total2 = data.length;
            ud.page = 1;
            getPageData();
        })
        const updateNewPage = (page) => {            
            ud.page = page;
            getPageData();
        }
        const updateRandomTotal = () => {
            let random = Math.random();
            let random100 = random * 100;
            ud.total = Math.ceil(random100)
            console.log('-random total-', random, random100, ud.total)
        }
        watch(
            () => ud.elTable,
            (vnew, vold) => {
                console.log('watch table', vnew, vold)
            }
        )
        return {
            ud,
            updateNewPage,
            updateRandomTotal,
        }
    },
})
</script>