<template>
<div class="page_right">
    <div class="about_stationmaster_container">
      <h3>博主信息</h3>
      <ol class="page_right_list trans_3">
                  <li>姓名：叶松林</li>
                  <li>职业：PHP程序猿</li>
                  <li>lover：xhp</li>        
                  <li>站长QQ：1520683535</li>        
                  <li>站长邮箱：1520683535@qq.com</li>
        
                      </ol>
    </div>
    <h3>友情连接</h3>
<div class="links trans_3">
            <a href="https://www.31un.com" target="_blank">公司官网</a>
          <a href="https://github.com/xiaoyeye123" target="_blank">我的github</a>
          <a href="https://laravel-china.org/users/21574" target="_blank">Laravel-China</a>
      </div>    
    <div class="hot_list">
    <h3>我的二维码</h3>
    <div class="mobile_qrcode wechat_qrcode trans_3">
        <div id="qrcode" ><img style="width: 100%;height: auto" src="http://www.xiaoyeyedada.cn/uploads/images/qrcode.png" alt=""></div>
    </div>
</div>
  </div>
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
      
    }
  }
}
</script>

<style scoped>
.page_right {
    position: relative;
    float: right;
    top: 0;
    width: 32%;
}
.page_right_list:hover {
    box-shadow: 0px 1px 16px -8px #000;
}
.page_right_list {
    margin: 0px 0 20px;
    background: #fff;
    padding: 10px 10px 10px 15px;
}
.trans_3 {
    transition: all 0.3s linear;
    -moz-transition: all 0.3s linear;
    -webkit-transition: all 0.3s linear;
    -o-transition: all 0.3s linear;
}.page_right h3 {
    width: auto;
    margin: 0;
    height: 38px;
    line-height: 40px;
    padding: 0 15px;
    border: none;
    background-color: #fff;
    border-bottom: 1px solid #009688;
}
h1, h2, h3 {
    font-size: 14px;
    font-weight: 400;
}
.page_right_list li {
    line-height: 32px;
    white-space: nowrap;
    overflow: hidden;
    list-style: decimal-leading-zero inside;
    color: #009688;
    font-style: oblique;
}
.links {
    padding: 10px 0;
    background: #fff;
    margin-bottom: 20px;
}
.links a {
    display: inline-block;
    padding: 0 10px;
    line-height: 28px;
    color: #333
}
.mobile_qrcode {
    padding: 30px;
}
.wechat_qrcode {
    margin-bottom: 20px;
    font-size: 0;
    text-align: center;
    padding: 15px;
    background: #fff;
}
</style>
