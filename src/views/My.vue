<template>
  <div>

      <Message :show.sync="msgShow" :type="msgType" :msg="msg"/>

      <div class="page_left" style="background: #fff">
        <div class="detail_container trans_3">
          <h1>个人简历</h1>
          <div class="date_hits"><span><i>修改时间：</i>{{ dataList.updated_at }}</span><span><i>作者：</i>{{ dataList.author }}</span><span><i>热度：</i> 651 ℃</span><span><i>评论数：</i>0</span></div>
          <div v-html="dataList.content" class="content">

          </div>

        </div>
      </div>

    <Right/>


  </div>
</template>

<script>
import ls from '@/utils/localStorage'
import config from '@/components/config'
import Right from '@/components/layouts/Right'

export default {
  name: 'My',
  components: {
    Right
  },
  data() {
    return {
      username: '', // 用户名
      password: '', // 密码
      msg: '', // 消息
      msgType: '', // 消息类型
      msgShow: false, // 是否显示消息，默认不显示
      dataList: [],
    }
  },
  created(){
    var self = this;
    this.axios.get(config.api+'/api/my')
      .then(function (response) {
        self.dataList = response.data;
        console.log(response.data)
        console.log(self.dataList);
      })
      .catch(function (error) {
        var message = error.response.data.message;
        // console.log(message);
        self.showMsg(message);
      });
  },
  methods: {

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

</style>
