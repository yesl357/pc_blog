<template>
  <div>
    <Message :show.sync="msgShow" :type="msgType" :msg="msg"/>

       <!-- 文章内容开始 -->

    <!--<div v-for="blog in dataList" class="news">-->
    <!--<div class="newsimg"><img :src="blog.img" class="nimg"></div>-->
      <!---->
      <!--<div style="text-align: center;">-->
        <!--<span class="title">{{ blog.title}}</span>-->
      <!--</div>-->

      <!--<router-link :to="{ name: 'Detail', query: { id: blog.id }}">-->
        <!--<p v-text="blog.desc"></p>-->
      <!--</router-link>-->
     <!--&lt;!&ndash;  <div class="desc">-->
        <!--<p v-text="blog.desc"></p>-->
      <!--</div> &ndash;&gt;-->

      <!--<div class="tips">-->
        <!--<div class="button">-->
           <!--<button class="btn btn-primary" v-text="blog.type"></button>-->
          <!---->
        <!--</div>-->
        <!--<div v-text="blog.created_at" class="time">-->
          <!---->
        <!--</div>-->
      <!--</div>-->

    <!--</div>-->

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


        <div class="page">
          <span>共{{pagination.total}}篇文章，当前第{{pagination.current_page}}页</span>

          <a @click="fpage(1)" class="btn btn-info">首页</a>
          <a @click="fpage(parseInt(pagination.current_page) - 1)" class="btn btn-info">上一页</a>
          <a @click="fpage(parseInt(pagination.current_page) + 1)" class="btn btn-info">下一页</a>
          <a @click="fpage(pagination.total_pages)" class="btn btn-info">尾页</a>
          <input type="text" class="page_number">
          <button class="btn btn-info">跳转</button>
        </div>

      </div>


      <Right/>
    </div>



    <!-- 文章内容结束 -->

  </div>
    
</template>

<script>
import { mapState } from 'vuex'
import Right from '@/components/layouts/Right';
export default {
  name: 'Articles',
  components: {
    Right
  },
  data() {
    return {
      msg: '', // 消息
      msgType: '', // 消息类型
      msgShow: false, // 是否显示消息，默认不显示
    
      dataList: [],
      pagination: [],
      
    }
  },

  created(){
      var self = this;
      var id = this.$route.query.typeId;
      var page = this.$route.query.page;
      this.axios.get('http://www.xiaoyeyedada.cn/api/blogTypes/'+id+'/articles?page='+page)
        .then(function (response) {
             self.dataList = response.data.data;
             self.pagination = response.data.meta.pagination;
             // console.log(self.dataList);
             console.log(response.data.meta);
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
   ]),
    // 当前页，从查询参数 page 返回
    currentPage() {
      return parseInt(this.$route.query.page) || 1
    }
  },
  watch: {
    auth(value) {
      if (!value) {
        this.showMsg('操作成功')
      }
    }
  },
  methods: {
    fpage(page) {
      var self = this;
      if(page < 1) {
        page = 1;
      }
      if(page > self.pagination.total_pages) {
        page = self.pagination.total_pages;
      }
      this.$router.push({ query: { ...this.$route.query, page } })
      // var self = this;
      var id = this.$route.query.typeId;
      var page2 = this.$route.query.page;
      this.axios.get('http://www.xiaoyeyedada.cn/api/blogTypes/'+id+'/articles?page='+page2)
        .then(function (response) {
          self.dataList = response.data.data;
          self.pagination = response.data.meta.pagination;
          // console.log(self.dataList);
          console.log(response.data.meta);
        })
        .catch(function (response) {
          console.log(response);
        });
    },
    showMsg(msg, type = 'success') {
      this.msg = msg
      this.msgType = type
      this.msgShow = true
    }
  }
}
</script>

<style scoped>
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
.page { float: right; }
  .page_number {
    width: 50px;
  }
</style>
