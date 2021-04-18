<template>
  <div class="login">
    <p>测试代理逻辑</p>    
    <div class="part-login" autocomplete="on" novalidate>
      <p>登录</p>
      <form>
        <label for="name">用户名<input type="text" name="name" v-model="formLogin.userName"></label>          
        <label for="password">密码<input type="password" name="password" v-model="formLogin.password"></label>          
        <input type="button" @click="submitForm" value="登录">
      </form>
    </div>
    <div>      
      <p>注册</p>
      <form>
        <label for="name">用户名<input type="text" name="name" v-model="formLogin.userName"></label>          
        <label for="password">密码<input type="password" name="password" v-model="formLogin.password"></label>          
        <input type="button" @click="submitForm" value="登录">
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'Service.Login',
  setup: () => {  
    const store = useStore()  
    const formLogin = reactive({
      userName: '',
      password: '',  
    })
    console.log('store-', store)
    const submitForm = () => {
      store.dispatch('login/login', formLogin).then(()=>{
        alert('login success');
      }).catch(err=>{
        alert('login failure');
      })
    }
    const options = [ 1, 2, 3, 4, 5, 6]
    return { 
      options,
      formLogin,
      submitForm,
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  // height: 100%;
  .part-login {
    width: 300px;
    form {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
