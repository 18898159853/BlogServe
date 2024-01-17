import { defineConfig } from 'vite'
import path from 'path' 
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
        "@": path.resolve("./src") // 相对路径别名配置，使用 @ 代替 src
    }
  },
  css: {
    preprocessorOptions: {
        scss: {
            additionalData: '@use "@/assets/css/vars.scss" as *;'
        }
    }
},
server: {
  proxy: {
    ['/api']: {
      //获取数据的服务器地址设置
      target: 'http://101.201.58.143:3007',
      //需要代理跨域
      changeOrigin: true,
      //路径重写
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
    '/ipx':{
      target:'https://ip.useragentinfo.com',
      changeOrigin: true,
      secure:true,
      rewrite: (path) => path.replace(/^\/ipx/, ' '),
    }
  },
},
})
