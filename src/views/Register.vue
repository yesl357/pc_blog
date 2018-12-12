<template xmlns:v-validator="http://www.w3.org/1999/xhtml">
  <div class="row">
    <div class="col-md-4 col-md-offset-4 floating-box">
    
    <!-- 消息组件 -->
  <Message :show.sync="msgShow" :type="msgType" :msg="msg"/>

      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">请注册</h3>
        </div>

        <div class="panel-body" data-validator-form>
          <div class="form-group">
            <label class="control-label">用户名/手机号</label>
            <input v-model.trim="username" v-validator:input.required="{ regex: /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/, error: '请输入正确的手机号' }" type="text" class="form-control" placeholder="请填写手机号">
          </div>
          <div class="form-group">
            <label class="control-label">密码</label>
            <input id="password" v-model.trim="password" v-validator.required="{ regex: /^\w{6,16}$/, error: '密码要求 6 ~ 16 个单词字符' }" type="password" class="form-control" placeholder="请填写密码">
          </div>
          <div class="form-group">
            <label class="control-label">确认密码</label>
            <input v-model.trim="cpassword" v-validator.required="{ target: '#password' }" type="password" class="form-control" placeholder="请填写确认密码">
          </div>
          <div class="form-group">
            <label class="control-label">图片验证码</label>
            <input v-model.trim="captcha" v-validator.required="{ title: '图片验证码' }" type="text" class="form-control" placeholder="请填写验证码">
          </div>
          <div class="thumbnail" title="点击图片重新获取验证码" @click="getCaptcha">
            <!--<div class="captcha vcenter" v-html="captchaTpl"></div>-->
            <img :src="captchaTpl" alt="">
          </div>
          <button type="submit" class="btn btn-lg btn-success btn-block" @click="register">
            <i class="fa fa-btn fa-sign-in"></i> 注册
          </button>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import createCaptcha from '@/utils/createCaptcha'
import ls from '@/utils/localStorage'
import config from '@/components/config'

export default {
  name: 'Register',
  data() {
    return {
      captchaTpl: '', // 验证码模板
      username: '', // 用户名
      password: '', // 密码
      cpassword: '', // 确认密码
      captcha: '', // 验证码
      msg: '', // 消息
      msgType: '', // 消息类型
      msgShow: false // 是否显示消息，默认不显示
    }
  },
  created() {
    this.getCaptcha()
  },
  methods: {
    getCaptcha() {
      var self = this;
      this.axios.post(config.api+'/api/captchas')
        .then(function (response) {
          self.captchaTpl = response.data.captcha_image_content;
          self.captchaKey = response.data.captcha_key;
          // console.log(response.data)
        })
        .catch(function (response) {
          console.log(response);
        });
    },
    register(e) {
      this.$nextTick(() => {
        const target = e.target.type === 'submit' ? e.target : e.target.parentElement

        if (target.canSubmit) {
          this.submit()
        }
      })
    },
    submit() {
        const user = {
          name: this.username,
          password: this.password,
        }
        console.log(user);
       // const localUser = ls.getItem('user')
        // 为 => 从仓库获取用户信息
        const localUser = this.$store.state.user
        var self = this;
        var data = {
          mobile: user.name,
          password : user.password,
          captcha_key: self.captchaKey,
          captcha_code: self.captcha,
        };
        // console.log(data);return;
        this.axios.post(config.api+'/api/users',data)
          .then(function (response){
            console.log(response)
            self.showMsg('注册成功', 'success');
            self.$router.push('Login');
            return;
          })
          .catch(function (error) {
            // var message = error.response.data.message;
            // alert(error.response.status);
            if(error.response.status == '401'){
              self.$swal({
                text: error.response.data.message,
                type: 'error'
              });
            }else if(error.response.status == '422'){
              let mess = error.response.data.errors;
              var message = '';
              if(error.response.data.errors.mobile){
                message = message+error.response.data.errors.mobile[0];
              }
              self.$swal({
                text: message,
                type: 'error'
              });
            }
          })


    },
    login(user) {
      ls.setItem('user', user)
      this.$store.dispatch('login', user)
      // this.showMsg('注册成功', 'success')
    },
    showMsg(msg, type = 'warning') {
      this.msg = msg
      this.msgType = type
      this.msgShow = false

      this.$nextTick(() => {
        this.msgShow = true
      })
    }
  }
}
</script>
<style scoped>
.thumbnail { width: 170px; margin-top: 10px; cursor: pointer;}
.thumbnail .captcha { height: 46px; background: #E1E6E8;}
.captcha { font-size: 24px; font-weight: bold; user-select: none;}
</style>
