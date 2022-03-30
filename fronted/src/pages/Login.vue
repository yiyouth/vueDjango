<template>
  <div class="login-container">
    <div>
      <el-form :model="form" class="login-form">
        <el-form-item>
          <div class="login-form-title">账号登录</div>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="用户名"
            class="login-form-input input-username"
            v-model="form.username"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            type="password"
            placeholder="登录密码"
            class="login-form-input input-pwd"
            v-model="form.password"
          />
        </el-form-item>
        <el-form-item class="login-form-check">
          <el-checkbox
            class="login-form-check-checkbox"
            v-model="form.isAgree"
          />
          同意并遵守<a>《服务条款》</a>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="large"
            class="login-form-btn"
            round
            @click="onLogin"
            >登录</el-button
          >
        </el-form-item>
        <el-form-item>
          <div class="login-form-links">
            <span>还没有账号? <a>免费注册</a></span>
            <a>忘记密码?</a>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { crypto } from "/@/assets/js/secret.js";
import { request } from "/@/assets/js/request.js";
export default {
  name: "Login",
  data() {
    return {
      form: {},
    };
  },
  methods: {
    async onLogin() {
      if (!this.form.username) {
        ElNotification({
          title: "请检验",
          message: "用户名不能为空",
          type: "error",
        });
        return;
      }
      if (!this.form.password) {
        ElNotification({
          title: "请检验",
          message: "密码不能为空",
          type: "error",
        });
        return;
      }
      if (!this.form.isAgree) {
        ElNotification({
          title: "请检验",
          message: "请勾选同意后继续",
          type: "error",
        });
        return;
      }
      const secrets = await request("/api/user/getKeys");
      const res = await request("/api/user/login", {
        username: this.form.username,
        password: crypto(this.form.password, secrets.key, secrets.iv),
      });
      if (res && res.result) {
        this.$router.push({ name: "Home" });
      }
    },
  },
  beforeCreate() {},
  created() {
    window.asd = this;
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  @include flex-center();
  width: 100%;
  height: 100%;
  background: url("../assets/img/bg.jpeg") no-repeat;
  background-size: cover;
}
.login-form {
  width: 4rem;
  padding: 0.5rem 0.3rem 0.96rem 0.3rem;
  background: var(--el-color-white);
  border-radius: var(--el-border-radius-round);
  &-title {
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: $font-size-4;
    color: var(--el-color-primary);
    margin: 0.3rem;
  }
  &-input {
    :deep(.el-input__inner) {
      height: 0.48rem;
      text-indent: 0.16rem;
      border-radius: var(--el-border-radius-round);
    }
  }
  &-check {
    font-size: $font-size-1;
    &-checkbox {
      border-radius: 0.16rem;
      margin-right: 0.08rem;
    }
  }
  &-btn {
    width: 100%;
    height: 0.48rem;
    color: $color-white;
    font-size: $font-size-2;
    letter-spacing: 0.16rem;
    border-radius: 0.24rem;
  }
  &-links {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: $font-size-1;
  }
  a {
    color: $color-blue-1;
    cursor: pointer;
  }
}
</style>
