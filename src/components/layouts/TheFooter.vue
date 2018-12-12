<template>
  <footer class="footer">
    <div class="container">
      <div class="row footer-top">
        <div class="col-sm-5 col-lg-5">
          <p class="padding-top-xsm">{{ description }}</p>

          <div class="text-md">
            <a v-for="item in contacts" v-title="item.title" :href="item.link" :style="contactStyle" target="_blank">
              <i :class="`fa fa-${item.icon}`"></i>
            </a>
          </div>

          <br>

          <span v-html="designer"></span>
        </div>

        <div class="col-sm-6 col-lg-6 col-lg-offset-1">
          <div class="row">
            
            <div class="col-sm-4">
              <h4>{{ statistics.title }}</h4>

              <ul class="list-unstyled">
                <li v-for="item in statistics.list">{{ item.title }}: {{ item.description }}</li>
              </ul>
            </div>

            <div class="col-sm-4">
              <h4>{{ other.title }}</h4>

              <ul class="list-unstyled">
                <li v-for="item in other.list">
                  <a :href="item.link" v-title="item.title" target="_blank">
                    <i :class="`fa fa-${item.icon}`"></i> {{ item.title }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
// 引入 title.js 的默认值
import title from '@/directives/title'
export default {
  name: 'TheFooter',
  // 添加 directives 选项，并注册 title
  directives: {
    title
  },
  data() {
    return {
      description: '欢迎浏览松林博客，谢谢您的支持！',
      contacts: [
        {
          icon: 'envelope',
          title: '反馈问题',
          link: 'mailto:1520683535@qq.com'
        },
        {
          icon: 'weixin',
          title: '我的微信',
          link: '#'
        }
      ],
      contactStyle: {
        paddingRight: '8px'
      },
      designer: `
        <span style="font-size:0.9em">感谢<a href="https://vuejscaff.com">vuejscaff社区</a>和<a href="https://laravel-china.org">laravel-china社区</a>的教程学习
        </span>
      `,
     
      statistics: {
        title: '统计信息',
        list: [
          {
            title: '注册会员',
            description: '嘻嘻哈哈'
          },
          {
            title: '文章数',
            description: '统计中。。。。'
          },
          {
            title: '评论数',
            description: '39375'
          }
        ]
      },
      other: {
        title: '其他信息',
        list: [
        
          {
            icon: 'globe',
            title: '推荐网站',
            link: 'https://vuejscaff.com/sites'
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
a:hover, a:focus { color: #e27575; transition: color .15s;}
</style>