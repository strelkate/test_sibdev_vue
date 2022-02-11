<template>
  <div class="login">
    <div class="login__card">
      <img class="login__logo" src="../assets/sibdev-logo.svg" alt="Image: Login">
      <h3 class="login__title">Вход</h3>
      <div class="login__form">
        <div class="login__label">Логин</div>
        <el-input placeholder="Введите логин" v-model="login"></el-input>
      </div>
      <div class="login__form login__form__password">
        <div class="login__label">Пароль</div>
        <el-input placeholder="Введите пароль" v-model="password" show-password></el-input>
      </div>
      <el-button :loading="loading" type="primary" @click="onLoginClick">Войти</el-button>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "Login",
  data() {
    return {
      login: '',
      password: '',
      loading: false
    }
  },
  methods: {
    ...mapActions(['LOGIN']),
    onLoginClick() {
      this.loading = true
      const allowed = this.LOGIN({login: this.login, password: this.password})
      this.loading = false
      if (!allowed) {
        // print error
        return
      }
      this.$router.push({name: 'Home'})
    }
  }
}
</script>

<style>
.login {
  width: 100%;
  margin: auto;
}

.login__card {
  width: 510px;
  height: 520px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 40px 88px 60px 88px;
  background: #FFFFFF;
  border: 1px solid rgba(39, 39, 39, 0.1);
  border-radius: 5px;
  position: fixed;
  top: 50%;
  left: 50%;
  max-height: 100%;
  transform: translate(-50%, -50%);
}

.login__logo {
  width: 88px;
  height: 88px;
}

.login__title {
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
  margin-top: 32px;
  margin-bottom: 20px;
}

.login__label {
  color: rgba(23, 23, 25, 0.3);
  font-size: 16px;
  line-height: 22px;
}

.login__form {
  width: 100%;
}

.login__form__password {
  margin-top: 20px;
  margin-bottom: 40px;
}
</style>
