<template>
  <router-view v-slot="{ Component,route }">
    <keep-alive>
      <component
        :is="Component"
        v-if="route.meta.keepAlive"
      />
    </keep-alive>
    <component
      :is="Component"
      v-if="!route.meta.keepAlive"
    />
  </router-view>
</template>

<script>
</script>

<style lang='scss' scoped>
</style>
