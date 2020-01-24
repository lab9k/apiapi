<template>
  <v-app-bar app
             color="primary" dark>
    <v-toolbar-title class="headline text-uppercase">
      <nuxt-link :to="{name: 'index'}"
                 class="white--text">
        <span>{{ $tc('api', 0) }}</span>
        <span class="font-weight-light">{{ $tc('api', 0) }}</span>
      </nuxt-link>
    </v-toolbar-title>
    <v-spacer />
    <v-btn
      :to="{name:'models'}"
      exact
      color="white"
      class="text--primary font-weight-black mr-4">
      {{ $t('nav.models') }}
    </v-btn>
    <v-btn
      :to="{name:'manage'}"
      exact
      color="white"
      class="text--primary font-weight-black">
      {{ $t('nav.server') }}
    </v-btn>
  </v-app-bar>
</template>
<script>
export default {}
</script>
