<template>
  <div class="navbar navbar-default topnav">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" @click="toggleNav">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>

        <router-link to="/" class="navbar-brand">
          <span class="title">{{ logo.title }}</span>
          <img :src="logo.src" :alt="logo.title" class="logo">
        </router-link>
      </div>

      <div id="top-navbar-collapse" :class="['collapse', 'navbar-collapse', { in: showCollapsedNav }]">
        <ul class="nav navbar-nav">
          <li v-for="(item, index) in navList" :class="{ active: index === activeNavIndex }">
          <router-link :to="item.url"  @click.native="changeNavIndex(index)">
            {{ item.navname }}
          </router-link>
            <!--<a href="#" @click="changeNavIndex(index)">{{ item.navname }}</a>-->
          </li>
        </ul>
         <!-- 入口组件 -->
        <div class="navbar-right">
          <TheDs/>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import TheDs from '@/components/layouts/TheDs'

export default {
  name: 'TheHeader',
  // 添加 components 选项，并注册 
  components: {
    TheDs
  },
  data() {
    return {
      logo: {
        src: `http://www.xiaoyeyedada.cn/logo.jpg`,
        title: '松林博客'
      },
      navList: [
          {navname:'首页',url:'/'},
          {navname:'文章',url:'/types'},
          {navname:'我的',url:'/my'},
      ],
      activeNavIndex: 0,
      showCollapsedNav: false
    }
  },
  beforeCreate() {
    this.uploadsUrl = 'https://vuejscaffcdn.phphub.org/uploads/'
  },
  created() {

  },
  methods: {
    changeNavIndex(index) {
      this.activeNavIndex = index

    },
    toggleNav() {
      this.showCollapsedNav = !this.showCollapsedNav
    }
  }
}
</script>

<style scoped>
.title { display: none;}
.navbar-default .navbar-nav > .active > a { background: grey;}
.logo {
  height: 48px !important;
  margin-top: -15px !important;
}
</style>
