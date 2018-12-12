<template>
  <div>
    <Message :show.sync="msgShow" :type="msgType" :msg="msg"/>


    <!-- 文章内容开始 -->

    <!-- <div v-for="blog in dataList" class="news">
    <div class="newsimg"><img :src="blog.img" class="nimg"></div>
      
      <div style="text-align: center;">
        <span class="title">{{ blog.title}}</span>
      </div>

      <div class="desc">
        <p v-text="blog.desc"></p>
      </div>
      <router-link :to="{ name: 'Detail', query: { id: blog.id }}" class="desc">
        <p v-text="blog.desc"></p>
      </router-link>

      <div class="tips">
        <div class="button">
           <button class="btn btn-primary" v-text="blog.type"></button>
          
        </div>
        <router-link :to="{ name: 'Detail', query: { id: blog.id }}" class="time">
        <p>点击查看详情1</p>
      </router-link>
      </div>

    </div> -->

    <!-- 文章内容结束 -->
    <!-- 文章内容新排版 -->
    <div class="main index_main">
    <div class="page_left">
     <ul class="page_left_list">
     <li v-for="blog in dataList">
     <router-link :to="{ name: 'Detail', query: { id: blog.id }}" class="pic"><img :src="blog.img" alt=""></router-link>
     <h2 class="title">
     <router-link :to="{ name: 'Detail', query: { id: blog.id }}">
     <p v-text="blog.title"></p>
      </router-link>
     </h2>
     <div class="date_hits"><span>{{ blog.author }}</span><span>{{ blog.created_at }}</span><span class="type">{{ blog.type }}</span> </div>
     <div class="desc">{{ blog.desc }}</div>
     </li>
  </ul>

  </div>

  <Right/>
  
</div>

  </div>
    
</template>

<script>
import { mapState } from 'vuex'
import Right from '@/components/layouts/Right'

export default {
  name: 'Home',
  components: {
    Right
  },
  data() {
    return {
      msg: '', // 消息
      msgType: '', // 消息类型
      msgShow: false, // 是否显示消息，默认不显示
      logo: {
        src: `http://ball.test/logo.jpg`,
        title: '松林博客'
      },
      dataList: [],
      
    }
  },

  created(){
      var self = this;
      this.axios.get('http://www.xiaoyeyedada.cn/api/recommend')
        .then(function (response) {
             self.dataList = response.data.data;
             console.log(response.data)
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
.news {
  width:100%;
    height:250px;
}
.newsimg {
  float: left;
  width: 35%;
  height: 200px;
}
.nimg {
  width: 90%;
  height: 90%;
}


.button {display: inherit;float: left;}
.time {display: inherit;float: right;margin-right: 20px;}
.bb {}

.main {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
}
.page_left {
    width: 66%;
    float: left;
    padding-bottom: 10px;
}
.page_left_list li {
    position: relative;
    height: 140px;
    margin-bottom: 15px;
    padding: 15px 15px 15px 200px;
    border-bottom: 1px solid #fff;
    background: #fff;
    transition: all 0.3s linear;
    -moz-transition: all 0.3s linear;
    -webkit-transition: all 0.3s linear;
}
li {
    list-style: none;
}
.page_left_list li .title a {
    max-width: 99%;
    margin-right: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 16px;
    line-height: 26px;
}
.page_left_list li .title * {
    display: inline-block;
    vertical-align: top;
}
a {
    color: #333;
}
.page_left_list li .pic {
    position: absolute;
    left: 15px;
    top: 15px;
    height: 110px;
    overflow: hidden;
    line-height: 110px;
    width: 165px;
}
.page_left_list li .pic img {
    vertical-align: middle;
    width: 100%;
    height: 100%;
}
img {
    display: inline-block;
    border: none;
}
blockquote, body, button, dd, div, dl, dt, form, h1, h2, h3, h4, h5, h6, input, li, ol, p, pre, td, textarea, th, ul {
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}
.page_left_list li .title {
    line-height: 28px;
    font-size: 0;
    position: relative;
}
.page_left_list li .date_hits span {
    padding-right: 15px;
    height: 20px;
    line-height: 20px;
}
.page_left_list li .date_hits {
    position: relative;
    line-height: 20px;
    font-size: 12px;
    color: #666;
}
.type {
    color: #009688;
}
.page_left_list li .desc {
    height: 48px;
    line-height: 24px;
    overflow: hidden;
    margin-top: 8px;
    color: #444;
}
</style>
