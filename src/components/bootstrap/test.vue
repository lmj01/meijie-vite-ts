<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-6">
                <div class="d-flex flex-column">
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                    </button>
                    <button type="button" class="btn btn-primary" @click="myModal.show()">打开对话框</button>
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

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
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
import { ref, defineComponent, onMounted } from 'vue'
import bootstrapModal from 'bootstrap/js/src/modal'
import bootstrapDropdown from 'bootstrap/js/src/dropdown'
export default defineComponent({
    name: 'bootstrap.test',
    setup() {
        const myModal = ref(null)
        const myDropdown = ref(null)
        onMounted(()=>{
            myModal.value = new bootstrapModal(document.getElementById('exampleModal'), {
                keyboard: false
            })
            myDropdown.value = new bootstrapDropdown(document.getElementById('dropdownMenuButton1'), {})
        })
        return {
            myModal,
        }
    },
})
</script>