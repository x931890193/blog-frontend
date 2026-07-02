<template>
  <div class="footBack footBackQian">
    <div class="fcontainer">
      <div class="footer-primary">
        <span>© {{ currentYear }} {{ author }}</span>
        <span class="footer-separator" />
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ icpText }}
        </a>
      </div>
      <div class="footer-meta">
        <span>在线 {{ this.$store.state.user.online || '获取中' }}</span>
        <span>已运行 {{ longTime }}</span>
        <a v-if="github" :href="github" target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
    </div>
  </div>
</template>

<script>
import siteApi from '@/api/siteinfo'

export default {
  name: 'Foot',
  data() {
    return {
      longTime: 0,
      author: 'ByteAlien',
      github: 'https://github.com/x931890193',
      icpText: '渝ICP备18016573号-4'
    }
  },
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  },
  mounted() {
    this.runTime()
    this.siteInfo()
  },
  methods: {
    runTime() {
      // 运行倒计时
      var BirthDay = new Date('December 10,2018')
      setInterval(() => {
        const nowTime = new Date()
        const longTime = nowTime - BirthDay
        const days = parseInt(longTime / 1000 / 60 / 60 / 24, 10) // 计算剩余的天数
        const hours = parseInt((longTime / 1000 / 60 / 60) % 24, 10) // 计算剩余的小时
        const minutes = parseInt((longTime / 1000 / 60) % 60, 10) // 计算剩余的分钟
        const seconds = parseInt((longTime / 1000) % 60, 10) // 计算剩余的秒数
        this.longTime = days + '天' + hours + '小时' + minutes + '分' + seconds + '秒'
      }, 1000)
    },
    async siteInfo() {
      const siteData = await siteApi.getSite()
      this.author = siteData.author || 'ByteAlien'
      this.github = siteData.github || 'https://github.com/x931890193'
      this.icpText = this.formatIcpText(siteData.beian)
    },
    formatIcpText(value) {
      if (!value) return '渝ICP备18016573号-4'
      const text = String(value).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
      const match = text.match(/[\u4e00-\u9fa5]ICP备[\d-]+号(?:-\d+)?/)
      return match ? match[0] : text
    }
  }
}
</script>

<style scoped lang="less">
.footBack {
  color: rgba(255, 255, 255, 0.72);
  margin-top: 24px;
  font-size: 13px;
  line-height: 1.7;
  text-align: center;
  width: 100%;
  min-height: 50px;
  position: relative;
}

.footBack .fcontainer {
  width: 100%;
  background: rgba(12, 19, 31, 0.96);
  /*top:294px;*/
  /*left:0;*/
  /*position: absolute;*/
  padding: 24px 16px 22px;
  box-sizing: border-box;
  /*z-index: 1;*/
}

.footer-primary,
.footer-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}

.footer-primary {
  color: #ffffff;
  font-weight: 600;
}

.footer-meta {
  margin-top: 8px;
  color: rgba(255, 255, 255, 0.56);
}

.footer-separator {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.34);
}

.footBack a {
  color: #72d7e3;
  z-index: 3;
  transition: color 0.2s ease;
}

.footBack a:hover {
  color: #ff8aa1;
}

/*时间跳动*/
.timeJump {
  animation: my-face 5s infinite ease-in-out;
  -webkit-animation: my-face 5s infinite ease-in-out;
  display: inline-block;
  margin: 0 5px;
}

@-webkit-keyframes my-face {
  2% {
    -webkit-transform: translate(0, 1.5px) rotate(1.5deg);
    -moz-transform: translate(0, 1.5px) rotate(1.5deg);
    -ms-transform: translate(0, 1.5px) rotate(1.5deg);
    -o-transform: translate(0, 1.5px) rotate(1.5deg);
    transform: translate(0, 1.5px) rotate(1.5deg);
  }
  4% {
    -webkit-transform: translate(0, -1.5px) rotate(-0.5deg);
    -moz-transform: translate(0, -1.5px) rotate(-0.5deg);
    -ms-transform: translate(0, -1.5px) rotate(-0.5deg);
    -o-transform: translate(0, -1.5px) rotate(-0.5deg);
    transform: translate(0, -1.5px) rotate(-0.5deg);
  }
  6% {
    -webkit-transform: translate(0, 1.5px) rotate(-1.5deg);
    -moz-transform: translate(0, 1.5px) rotate(-1.5deg);
    -ms-transform: translate(0, 1.5px) rotate(-1.5deg);
    -o-transform: translate(0, 1.5px) rotate(-1.5deg);
    transform: translate(0, 1.5px) rotate(-1.5deg);
  }
  8% {
    -webkit-transform: translate(0, -1.5px) rotate(-1.5deg);
    -moz-transform: translate(0, -1.5px) rotate(-1.5deg);
    -ms-transform: translate(0, -1.5px) rotate(-1.5deg);
    -o-transform: translate(0, -1.5px) rotate(-1.5deg);
    transform: translate(0, -1.5px) rotate(-1.5deg);
  }
  10% {
    -webkit-transform: translate(0, 2.5px) rotate(1.5deg);
    -moz-transform: translate(0, 2.5px) rotate(1.5deg);
    -ms-transform: translate(0, 2.5px) rotate(1.5deg);
    -o-transform: translate(0, 2.5px) rotate(1.5deg);
    transform: translate(0, 2.5px) rotate(1.5deg);
  }
  12% {
    -webkit-transform: translate(0, -0.5px) rotate(1.5deg);
    -moz-transform: translate(0, -0.5px) rotate(1.5deg);
    -ms-transform: translate(0, -0.5px) rotate(1.5deg);
    -o-transform: translate(0, -0.5px) rotate(1.5deg);
    transform: translate(0, -0.5px) rotate(1.5deg);
  }
  14% {
    -webkit-transform: translate(0, -1.5px) rotate(1.5deg);
    -moz-transform: translate(0, -1.5px) rotate(1.5deg);
    -ms-transform: translate(0, -1.5px) rotate(1.5deg);
    -o-transform: translate(0, -1.5px) rotate(1.5deg);
    transform: translate(0, -1.5px) rotate(1.5deg);
  }
  16% {
    -webkit-transform: translate(0, -0.5px) rotate(-1.5deg);
    -moz-transform: translate(0, -0.5px) rotate(-1.5deg);
    -ms-transform: translate(0, -0.5px) rotate(-1.5deg);
    -o-transform: translate(0, -0.5px) rotate(-1.5deg);
    transform: translate(0, -0.5px) rotate(-1.5deg);
  }
  18% {
    -webkit-transform: translate(0, 0.5px) rotate(-1.5deg);
    -moz-transform: translate(0, 0.5px) rotate(-1.5deg);
    -ms-transform: translate(0, 0.5px) rotate(-1.5deg);
    -o-transform: translate(0, 0.5px) rotate(-1.5deg);
    transform: translate(0, 0.5px) rotate(-1.5deg);
  }
  20% {
    -webkit-transform: translate(0, -1.5px) rotate(2.5deg);
    -moz-transform: translate(0, -1.5px) rotate(2.5deg);
    -ms-transform: translate(0, -1.5px) rotate(2.5deg);
    -o-transform: translate(0, -1.5px) rotate(2.5deg);
    transform: translate(0, -1.5px) rotate(2.5deg);
  }
  22% {
    -webkit-transform: translate(0, 0.5px) rotate(-1.5deg);
    -moz-transform: translate(0, 0.5px) rotate(-1.5deg);
    -ms-transform: translate(0, 0.5px) rotate(-1.5deg);
    -o-transform: translate(0, 0.5px) rotate(-1.5deg);
    transform: translate(0, 0.5px) rotate(-1.5deg);
  }
  24% {
    -webkit-transform: translate(0, 1.5px) rotate(1.5deg);
    -moz-transform: translate(0, 1.5px) rotate(1.5deg);
    -ms-transform: translate(0, 1.5px) rotate(1.5deg);
    -o-transform: translate(0, 1.5px) rotate(1.5deg);
    transform: translate(0, 1.5px) rotate(1.5deg);
  }
  26% {
    -webkit-transform: translate(0, 0.5px) rotate(0.5deg);
    -moz-transform: translate(0, 0.5px) rotate(0.5deg);
    -ms-transform: translate(0, 0.5px) rotate(0.5deg);
    -o-transform: translate(0, 0.5px) rotate(0.5deg);
    transform: translate(0, 0.5px) rotate(0.5deg);
  }
  28% {
    -webkit-transform: translate(0, 0.5px) rotate(1.5deg);
    -moz-transform: translate(0, 0.5px) rotate(1.5deg);
    -ms-transform: translate(0, 0.5px) rotate(1.5deg);
    -o-transform: translate(0, 0.5px) rotate(1.5deg);
    transform: translate(0, 0.5px) rotate(1.5deg);
  }
  30% {
    -webkit-transform: translate(0, -0.5px) rotate(2.5deg);
    -moz-transform: translate(0, -0.5px) rotate(2.5deg);
    -ms-transform: translate(0, -0.5px) rotate(2.5deg);
    -o-transform: translate(0, -0.5px) rotate(2.5deg);
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  32% {
    -webkit-transform: translate(0, 1.5px) rotate(-0.5deg);
    -moz-transform: translate(0, 1.5px) rotate(-0.5deg);
    -ms-transform: translate(0, 1.5px) rotate(-0.5deg);
    -o-transform: translate(0, 1.5px) rotate(-0.5deg);
    transform: translate(0, 1.5px) rotate(-0.5deg);
  }
  34% {
    -webkit-transform: translate(0, 1.5px) rotate(-0.5deg);
    -moz-transform: translate(0, 1.5px) rotate(-0.5deg);
    -ms-transform: translate(0, 1.5px) rotate(-0.5deg);
    -o-transform: translate(0, 1.5px) rotate(-0.5deg);
    transform: translate(0, 1.5px) rotate(-0.5deg);
  }
  36% {
    -webkit-transform: translate(0, -1.5px) rotate(2.5deg);
    -moz-transform: translate(0, -1.5px) rotate(2.5deg);
    -ms-transform: translate(0, -1.5px) rotate(2.5deg);
    -o-transform: translate(0, -1.5px) rotate(2.5deg);
    transform: translate(0, -1.5px) rotate(2.5deg);
  }
  38% {
    -webkit-transform: translate(0, 1.5px) rotate(-1.5deg);
    -moz-transform: translate(0, 1.5px) rotate(-1.5deg);
    -ms-transform: translate(0, 1.5px) rotate(-1.5deg);
    -o-transform: translate(0, 1.5px) rotate(-1.5deg);
    transform: translate(0, 1.5px) rotate(-1.5deg);
  }
  40% {
    -webkit-transform: translate(0, -0.5px) rotate(2.5deg);
    -moz-transform: translate(0, -0.5px) rotate(2.5deg);
    -ms-transform: translate(0, -0.5px) rotate(2.5deg);
    -o-transform: translate(0, -0.5px) rotate(2.5deg);
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  42% {
    -webkit-transform: translate(0, 2.5px) rotate(-1.5deg);
    -moz-transform: translate(0, 2.5px) rotate(-1.5deg);
    -ms-transform: translate(0, 2.5px) rotate(-1.5deg);
    -o-transform: translate(0, 2.5px) rotate(-1.5deg);
    transform: translate(0, 2.5px) rotate(-1.5deg);
  }
  44% {
    -webkit-transform: translate(0, 1.5px) rotate(0.5deg);
    -moz-transform: translate(0, 1.5px) rotate(0.5deg);
    -ms-transform: translate(0, 1.5px) rotate(0.5deg);
    -o-transform: translate(0, 1.5px) rotate(0.5deg);
    transform: translate(0, 1.5px) rotate(0.5deg);
  }
  46% {
    -webkit-transform: translate(0, -1.5px) rotate(2.5deg);
    -moz-transform: translate(0, -1.5px) rotate(2.5deg);
    -ms-transform: translate(0, -1.5px) rotate(2.5deg);
    -o-transform: translate(0, -1.5px) rotate(2.5deg);
    transform: translate(0, -1.5px) rotate(2.5deg);
  }
  48% {
    -webkit-transform: translate(0, -0.5px) rotate(0.5deg);
    -moz-transform: translate(0, -0.5px) rotate(0.5deg);
    -ms-transform: translate(0, -0.5px) rotate(0.5deg);
    -o-transform: translate(0, -0.5px) rotate(0.5deg);
    transform: translate(0, -0.5px) rotate(0.5deg);
  }
  50% {
    -webkit-transform: translate(0, 0.5px) rotate(0.5deg);
    -moz-transform: translate(0, 0.5px) rotate(0.5deg);
    -ms-transform: translate(0, 0.5px) rotate(0.5deg);
    -o-transform: translate(0, 0.5px) rotate(0.5deg);
    transform: translate(0, 0.5px) rotate(0.5deg);
  }
  52% {
    -webkit-transform: translate(0, 2.5px) rotate(2.5deg);
    -moz-transform: translate(0, 2.5px) rotate(2.5deg);
    -ms-transform: translate(0, 2.5px) rotate(2.5deg);
    -o-transform: translate(0, 2.5px) rotate(2.5deg);
    transform: translate(0, 2.5px) rotate(2.5deg);
  }
  54% {
    -webkit-transform: translate(0, -1.5px) rotate(1.5deg);
    -moz-transform: translate(0, -1.5px) rotate(1.5deg);
    -ms-transform: translate(0, -1.5px) rotate(1.5deg);
    -o-transform: translate(0, -1.5px) rotate(1.5deg);
    transform: translate(0, -1.5px) rotate(1.5deg);
  }
  56% {
    -webkit-transform: translate(0, 2.5px) rotate(2.5deg);
    -moz-transform: translate(0, 2.5px) rotate(2.5deg);
    -ms-transform: translate(0, 2.5px) rotate(2.5deg);
    -o-transform: translate(0, 2.5px) rotate(2.5deg);
    transform: translate(0, 2.5px) rotate(2.5deg);
  }
  58% {
    -webkit-transform: translate(0, 0.5px) rotate(2.5deg);
    -moz-transform: translate(0, 0.5px) rotate(2.5deg);
    -ms-transform: translate(0, 0.5px) rotate(2.5deg);
    -o-transform: translate(0, 0.5px) rotate(2.5deg);
    transform: translate(0, 0.5px) rotate(2.5deg);
  }
  60% {
    -webkit-transform: translate(0, 2.5px) rotate(2.5deg);
    -moz-transform: translate(0, 2.5px) rotate(2.5deg);
    -ms-transform: translate(0, 2.5px) rotate(2.5deg);
    -o-transform: translate(0, 2.5px) rotate(2.5deg);
    transform: translate(0, 2.5px) rotate(2.5deg);
  }
  62% {
    -webkit-transform: translate(0, -0.5px) rotate(2.5deg);
    -moz-transform: translate(0, -0.5px) rotate(2.5deg);
    -ms-transform: translate(0, -0.5px) rotate(2.5deg);
    -o-transform: translate(0, -0.5px) rotate(2.5deg);
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  64% {
    -webkit-transform: translate(0, -0.5px) rotate(1.5deg);
    -moz-transform: translate(0, -0.5px) rotate(1.5deg);
    -ms-transform: translate(0, -0.5px) rotate(1.5deg);
    -o-transform: translate(0, -0.5px) rotate(1.5deg);
    transform: translate(0, -0.5px) rotate(1.5deg);
  }
  66% {
    -webkit-transform: translate(0, 1.5px) rotate(-0.5deg);
    -moz-transform: translate(0, 1.5px) rotate(-0.5deg);
    -ms-transform: translate(0, 1.5px) rotate(-0.5deg);
    -o-transform: translate(0, 1.5px) rotate(-0.5deg);
    transform: translate(0, 1.5px) rotate(-0.5deg);
  }
  68% {
    -webkit-transform: translate(0, -1.5px) rotate(-0.5deg);
    -moz-transform: translate(0, -1.5px) rotate(-0.5deg);
    -ms-transform: translate(0, -1.5px) rotate(-0.5deg);
    -o-transform: translate(0, -1.5px) rotate(-0.5deg);
    transform: translate(0, -1.5px) rotate(-0.5deg);
  }
  70% {
    -webkit-transform: translate(0, 1.5px) rotate(0.5deg);
    -moz-transform: translate(0, 1.5px) rotate(0.5deg);
    -ms-transform: translate(0, 1.5px) rotate(0.5deg);
    -o-transform: translate(0, 1.5px) rotate(0.5deg);
    transform: translate(0, 1.5px) rotate(0.5deg);
  }
  72% {
    -webkit-transform: translate(0, 2.5px) rotate(1.5deg);
    -moz-transform: translate(0, 2.5px) rotate(1.5deg);
    -ms-transform: translate(0, 2.5px) rotate(1.5deg);
    -o-transform: translate(0, 2.5px) rotate(1.5deg);
    transform: translate(0, 2.5px) rotate(1.5deg);
  }
  74% {
    -webkit-transform: translate(0, -0.5px) rotate(0.5deg);
    -moz-transform: translate(0, -0.5px) rotate(0.5deg);
    -ms-transform: translate(0, -0.5px) rotate(0.5deg);
    -o-transform: translate(0, -0.5px) rotate(0.5deg);
    transform: translate(0, -0.5px) rotate(0.5deg);
  }
  76% {
    -webkit-transform: translate(0, -0.5px) rotate(2.5deg);
    -moz-transform: translate(0, -0.5px) rotate(2.5deg);
    -ms-transform: translate(0, -0.5px) rotate(2.5deg);
    -o-transform: translate(0, -0.5px) rotate(2.5deg);
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  78% {
    -webkit-transform: translate(0, -0.5px) rotate(1.5deg);
    -moz-transform: translate(0, -0.5px) rotate(1.5deg);
    -ms-transform: translate(0, -0.5px) rotate(1.5deg);
    -o-transform: translate(0, -0.5px) rotate(1.5deg);
    transform: translate(0, -0.5px) rotate(1.5deg);
  }
  80% {
    -webkit-transform: translate(0, 1.5px) rotate(1.5deg);
    -moz-transform: translate(0, 1.5px) rotate(1.5deg);
    -ms-transform: translate(0, 1.5px) rotate(1.5deg);
    -o-transform: translate(0, 1.5px) rotate(1.5deg);
    transform: translate(0, 1.5px) rotate(1.5deg);
  }
  82% {
    -webkit-transform: translate(0, -0.5px) rotate(0.5deg);
    -moz-transform: translate(0, -0.5px) rotate(0.5deg);
    -ms-transform: translate(0, -0.5px) rotate(0.5deg);
    -o-transform: translate(0, -0.5px) rotate(0.5deg);
    transform: translate(0, -0.5px) rotate(0.5deg);
  }
  84% {
    -webkit-transform: translate(0, 1.5px) rotate(2.5deg);
    -moz-transform: translate(0, 1.5px) rotate(2.5deg);
    -ms-transform: translate(0, 1.5px) rotate(2.5deg);
    -o-transform: translate(0, 1.5px) rotate(2.5deg);
    transform: translate(0, 1.5px) rotate(2.5deg);
  }
  86% {
    -webkit-transform: translate(0, -1.5px) rotate(-1.5deg);
    -moz-transform: translate(0, -1.5px) rotate(-1.5deg);
    -ms-transform: translate(0, -1.5px) rotate(-1.5deg);
    -o-transform: translate(0, -1.5px) rotate(-1.5deg);
    transform: translate(0, -1.5px) rotate(-1.5deg);
  }
  88% {
    -webkit-transform: translate(0, -0.5px) rotate(2.5deg);
    -moz-transform: translate(0, -0.5px) rotate(2.5deg);
    -ms-transform: translate(0, -0.5px) rotate(2.5deg);
    -o-transform: translate(0, -0.5px) rotate(2.5deg);
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  90% {
    -webkit-transform: translate(0, 2.5px) rotate(-0.5deg);
    -moz-transform: translate(0, 2.5px) rotate(-0.5deg);
    -ms-transform: translate(0, 2.5px) rotate(-0.5deg);
    -o-transform: translate(0, 2.5px) rotate(-0.5deg);
    transform: translate(0, 2.5px) rotate(-0.5deg);
  }
  92% {
    -webkit-transform: translate(0, 0.5px) rotate(-0.5deg);
    -moz-transform: translate(0, 0.5px) rotate(-0.5deg);
    -ms-transform: translate(0, 0.5px) rotate(-0.5deg);
    -o-transform: translate(0, 0.5px) rotate(-0.5deg);
    transform: translate(0, 0.5px) rotate(-0.5deg);
  }
  94% {
    -webkit-transform: translate(0, 2.5px) rotate(0.5deg);
    -moz-transform: translate(0, 2.5px) rotate(0.5deg);
    -ms-transform: translate(0, 2.5px) rotate(0.5deg);
    -o-transform: translate(0, 2.5px) rotate(0.5deg);
    transform: translate(0, 2.5px) rotate(0.5deg);
  }
  96% {
    -webkit-transform: translate(0, -0.5px) rotate(1.5deg);
    -moz-transform: translate(0, -0.5px) rotate(1.5deg);
    -ms-transform: translate(0, -0.5px) rotate(1.5deg);
    -o-transform: translate(0, -0.5px) rotate(1.5deg);
    transform: translate(0, -0.5px) rotate(1.5deg);
  }
  98% {
    -webkit-transform: translate(0, -1.5px) rotate(-0.5deg);
    -moz-transform: translate(0, -1.5px) rotate(-0.5deg);
    -ms-transform: translate(0, -1.5px) rotate(-0.5deg);
    -o-transform: translate(0, -1.5px) rotate(-0.5deg);
    transform: translate(0, -1.5px) rotate(-0.5deg);
  }
  0%,
  100% {
    -webkit-transform: translate(0, 0) rotate(0);
    -moz-transform: translate(0, 0) rotate(0);
    -ms-transform: translate(0, 0) rotate(0);
    -o-transform: translate(0, 0) rotate(0);
    transform: translate(0, 0) rotate(0);
  }
}
</style>
