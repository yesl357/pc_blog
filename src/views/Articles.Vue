<template>
  <div>
    <Message :show.sync="msgShow" :type="msgType" :msg="msg"/>



    <!-- 文章内容开始 -->

    <!--<div v-for="type in dataList" class="news">-->
    <!--<div class="newsimg"><img :src="type.img_path" class="nimg"></div>-->

        <!---->
      <!--<div style="text-align: center;">-->
        <!--<span class="title">{{ type.name }}</span>-->
      <!--</div>-->
      <!--<router-link :to="{ name: 'Articles', query: { typeId: type.id }}">-->
      <!--<div class="desc">-->
        <!--<p v-text="type.desc"></p>-->
      <!--</div>-->
      <!--</router-link>-->


    <!--</div>-->

    <!-- 文章内容结束 -->
    <div class="page_left">
      <ul class="index-learn">
        <li v-for="type in dataList">
          <fieldset class="layui-elem-field layui-field-title">
            <legend><router-link :to="{ name: 'Articles', query: { typeId: type.id }}">{{ type.name }}</router-link></legend>
            <p> {{ type.desc }} </p>
          </fieldset>
        </li>
      </ul>
    </div>

    <Right/>
   
  </div>
    
</template>

<script>
import { mapState } from 'vuex'

import Right from '@/components/layouts/Right'

export default {
  name: 'Types',
  components: {
    Right
  },
  data() {
    return {
      msg: '', // 消息
      msgType: '', // 消息类型
      msgShow: false, // 是否显示消息，默认不显示
      
      dataList: [],
      
    }
  },

  created(){
      var self = this;
      this.axios.get('http://www.xiaoyeyedada.cn/api/articles')
        .then(function (response) {
             self.dataList = response.data.data;
             
             console.log(self.dataList);
        })
        .catch(function (response) {
          console.log(response);
        });
  },

  beforeRouteEnter(to, from, next) {
    const fromName = from.name
    const logout = to.params.logout

    next(vm => {
      if (vm.$store.state.auth) {
        switch (fromName) {
          case 'Register':
            vm.showMsg('注册成功')
            break
            // 已登录时，从登录页面跳转过来
          case 'Login':
          // 显示登录成功
            vm.showMsg('登录成功')
            break
        }
      } else if (logout) {
        vm.showMsg('操作成功')
      }
    })
  },
  // computed: {
  //   auth() {
  //     return this.$store.state.auth
  //   }
  // },
  computed: {
    ...mapState([
      'auth',
      'user',
      'articles'
   ])
  },
  watch: {
    auth(value) {
      if (!value) {
        this.showMsg('操作成功')
      }
    }
  },
  methods: {
    showMsg(msg, type = 'success') {
      this.msg = msg
      this.msgType = type
      this.msgShow = true
    }
  }
}
</script>

<style scoped>

</style>
