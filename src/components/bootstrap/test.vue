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
        <p>每页个数{{ud.count}}, 总数有{{ud.total2}}</p>
        <div class="table-component">
            <div class="table-container">
                <div class="table-header-container">
                    <table id="tHead">
                        <tr>
                            <td :class="ud.cls">编号</td>
                            <td>姓名</td>
                            <td>Tonnage</td>
                            <td>Tonnage</td>
                            <td>操作</td>
                        </tr>
                    </table>
                </div>
                <div class="table-body-container">
                    <table id="tBody">
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
import { ref, defineComponent, onMounted, reactive } from 'vue'
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
        })
        // 模拟数据
        const { fetchDataType1 } = testData();
        const callTestData = (count) => Promise.resolve(fetchDataType1(count));
        onMounted(()=>{
            ud.modal = new bootstrapModal(document.getElementById('exampleModal'), {
                keyboard: false
            })
            ud.dropdown = new bootstrapDropdown(document.getElementById('dropdownMenuButton1'), {})
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
        return {
            ud,
            updateNewPage,
            updateRandomTotal,
        }
    },
})
</script>