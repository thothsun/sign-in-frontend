<template>
  <div>
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="80px"
             class="login-container">

<!--      <h2 class="title">系统登录</h2>-->

      <el-form-item prop="account" label="用户名">
        <el-input type="text" v-model="ruleForm2.account" placeholder="请输入用户名" clearable ></el-input>
      </el-form-item>

      <el-form-item prop="checkPass" label="密码">
        <el-input type="password" v-model="ruleForm2.checkPass" placeholder="请输入密码" clearable show-password ></el-input>
      </el-form-item>

      <el-checkbox v-model="checked" class="remember">记住密码</el-checkbox>

      <el-button type="primary" style="width:100%;" @click="handleSubmit2" :loading="logining">登录</el-button>

    </el-form>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: '',
          checkPass: ''
        },
        rules2: {
          account: [
            {required: true, message: '请输入账号', trigger: 'blur'},
          ],
          checkPass: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ]
        },
        checked: true
      };
    },
    methods: {
      handleSubmit2() {
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            this.logining = true;


            var loginParams = {username: this.ruleForm2.account, password: this.ruleForm2.checkPass};
            requestLogin(loginParams).then(data => {
              this.logining = false;
              let {msg, code, user} = data;
              if (code !== 200) {
                this.$message({
                  message: msg,
                  type: 'error'
                });
              } else {
                sessionStorage.setItem('user', JSON.stringify(user));
                this.$router.push({path: '/table'});
              }
            });

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>
  .login-container {
    border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 35px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .title {
    margin: 0 auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .remember {
    margin: 0 0 35px 0;
  }
</style>
