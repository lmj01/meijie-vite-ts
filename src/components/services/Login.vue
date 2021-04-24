<template>
  <div class="login">
    <p>测试代理逻辑</p>    
    <div class="part-login">
      <p>登录</p>
      <form autocomplete="on" novalidate>
        <label for="name">用户名<input type="text" name="name" v-model="formLogin.email"></label>          
        <label for="password">密码<input type="password" name="password" v-model="formLogin.password"></label>          
        <input type="button" @click="submitLogin" value="登录">
      </form>
      <p>空action的api测试</p>
      <button @click="submitEmpty">空数据请求</button>
    </div>
    <div class="part-register">      
      <p>注册</p>
      <form autocomplete="on" novalidate>
        <label for="name">用户名<input type="text" name="name" v-model="formRegister.nickname"></label>          
        <label for="name">邮箱<input type="text" name="name" v-model="formRegister.email"></label>          
        <label for="password">密码<input type="password" name="password" v-model="formRegister.password"></label>          
        <label for="">
          <select v-model="formRegister.language">
            <option value="cn">中文</option>
            <option value="en">英文</option>
          </select>
        </label>
        <input type="button" @click="submitRegister" value="注册">
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import {register, empty} from '@/apis/login'
export default defineComponent({
  name: 'Service.Login',
  setup: () => {  
    const store = useStore()  
    const formLogin = reactive({
      email: '',
      password: '',  
    })
    const formRegister = reactive({
      nickname: '',
      email: '',
      password: '',
      language: '',
    })
    const submitLogin = () => {
      store.dispatch('login/login', formLogin).then((res)=>{
        console.log('login success', res, store.getters['login/info']);        
      })
      .catch((err: any) => {
        console.error('login failure', err);
      })
    }
    const submitRegister = () => {
      register(formRegister).then((res: any)=>{
        console.log('register return', res);
      })
      .catch((err: any) => {
        console.error('login failure', err);
      })
    }
    const submitEmpty = () => {
      empty().then((res: any)=>{
        console.log('empty return ', res);
      })
      .catch((err: any) => {
        console.error('empty error', err);
      })
    }
    return { 
      formLogin,
      formRegister,
      submitLogin,
      submitRegister,
      submitEmpty,
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
  .part-register {
    width: 300px;
    form {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
