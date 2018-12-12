<template>
  <div>
    <Message :show.sync="msgShow" :type="msgType" :msg="msg"/>

    <!--&lt;!&ndash; 文章内容开始 &ndash;&gt;-->
    <!--<div>-->
      <!--<h3 style="text-align: center;">{{ article.title }}</h3>-->
    <!--</div>-->
    <!--<div v-html="article.content">-->
      <!---->
    <!--</div>   -->

    <!--&lt;!&ndash; 文章内容结束 &ndash;&gt;-->


    <div class="page_left" style="background: #fff;padding: 10px">
      <div class="detail_container trans_3">
        <h1>{{ article.title }}</h1>
        <div class="date_hits"><span><i>修改时间：</i>{{article.created_at}}</span><span><i>作者：</i>{{article.author}}</span><span><i>热度：</i> {{article.looked}} ℃</span><span><i>评论数：</i>{{article.reply}}</span></div>
        <div v-html="article.content" class="content">

        </div>

      </div>

      <div class="comments">

        <div class="comment" v-for="comment in comments">

          <div><span class="comment-name">{{ comment.name }}</span>   <span class="comment-time">{{ comment.created_at }}</span></div>
          <div class="comment-content">{{ comment.contents }}</div>
          <div class="comment-action"><span class="comment-reply">赞同</span><span class="comment-like">反对</span></div>

        </div>

      </div>

      <div class="ui segment extra-padding comment-composing-box" style="padding:20px;margin-left:10px">

          <div class="message info">
            <i class="icon info" aria-hidden="true"></i> &nbsp;&nbsp;请勿发布不友善或者负能量的内容。与人为善，比聪明更重要！
          </div>

          <div class="field">
            <textarea style="width:100%;font-size: 16px;height: 64px;" v-model.trim="contentss" v-validator.required="{ error: '请输入评论内容' }"></textarea>
          </div>
          <button class="btn btn-primary" type="submit" id="comment-composing-submit" @click="comment">
            <i class="icon comment"></i> 评论
          </button>

      </div>

    </div>

    <Right/>
   
  </div>
    
</template>

<script>
import { mapState } from 'vuex'
import Right from '@/components/layouts/Right'
import config from '@/components/config'
import ls from '@/utils/localStorage'


export default {
  name: 'Detail',
  components: {
    Right
  },
  data() {
    return {
      msg: '', // 消息
      msgType: '', // 消息类型
      msgShow: false, // 是否显示消息，默认不显示
      contentss: '',
    
      article: [],
      comments: [],
    }
  },

  created(){
      var self = this;
      var id = this.$route.query.id;
      this.axios.get('http://www.xiaoyeyedada.cn/api/articles/'+id)
        .then(function (response) {
             self.article = response.data;
             
             // console.log(self.article);
        })
        .catch(function (response) {
          console.log(response);
        });

      this.getComment();

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
      'articles',
   ]),
  },
  watch: {
    auth(value) {
      if (!value) {
        this.showMsg('操作成功')
      }
    }
  },
  methods: {
    getComment() {
      var self = this;
      var id = this.$route.query.id;
      this.axios.get(config.api+'/api/articles/'+id+'/comments')
        .then(function (response) {
          self.comments = response.data.data;

          console.log(self.comments);
        })
        .catch(function (response) {
          console.log(response);
        });
    },
    comment() {
      var self = this;
      if(!this.$store.state.auth){
        this.$swal({
          text: '登录后才能评论!',
          confirmButtonText: '去登录'
        }).then((res) => {
          if (res.value) {
            self.$router.push({name: 'Login'});
          }
        })
      }else{
        var data = {
          contents: this.contentss,
        };
        var article = this.$route.query.id;
        // alert(ls.getItem('access_token'));
        // alert(article);
        this.axios({
          method: 'post',
          url: config.api+'/api/articles/'+article+'/comments',
          data: data,
          headers: {
            Authorization: 'Bearer '+ls.getItem('access_token'),
          },
        }).then(function (response) {
          self.$swal({
            text: '评论成功',
            type: 'success'
          });
          self.getComment();
        })
      }
    },
    showMsg(msg, type = 'success') {
      this.msg = msg
      this.msgType = type
      this.msgShow = true
    },
  }
}
</script>

<style scoped>
.comment-time{
  float: right;
  margin-right: 10px;
  font-family: Arial;
  color: silver;
}
  .comment-name{
    margin-left: 10px;
    color: #7a2626;
  }
  .comment-content{
    /*float: left;*/
    margin: 10px 10px 10px 10px;
  }
  .comment-reply{
    cursor: pointer;
    margin-right: 30px;
  }
  .comment-like{
    cursor: pointer;
    margin-right: 30px;
  }
  .comment{
    margin-top: 10px;
  }
  .comment-action{
    text-align: right;
  }
  .comments{
    border-top: 1px solid #009688;
  }
  .message{
    box-shadow: 0px 0px 0px 1px #A9D5DE inset, 0px 0px 0px 0px transparent;
    position: relative;
    min-height: 1em;
    margin: 1em 0em;
    background: #F8F8F9;
    padding: 1em 1.5em;
    line-height: 1.4285em;
    color: rgba(0, 0, 0, 0.87);
    -webkit-transition: opacity 0.1s ease, color 0.1s ease, background 0.1s ease, box-shadow 0.1s ease;
    -webkit-transition: opacity 0.1s ease, color 0.1s ease, background 0.1s ease, -webkit-box-shadow 0.1s ease;
    transition: opacity 0.1s ease, color 0.1s ease, background 0.1s ease, -webkit-box-shadow 0.1s ease;
    transition: opacity 0.1s ease, color 0.1s ease, background 0.1s ease, box-shadow 0.1s ease;
    transition: opacity 0.1s ease, color 0.1s ease, background 0.1s ease, box-shadow 0.1s ease, -webkit-box-shadow 0.1s ease;
    border-radius: 0.28571429rem;
    -webkit-box-shadow: 0px 0px 0px 1px rgba(34, 36, 38, 0.22) inset, 0px 0px 0px 0px transparent;
    box-shadow: 0px 0px 0px 1px rgba(34, 36, 38, 0.22) inset, 0px 0px 0px 0px transparent;
  }

</style>
