<template>
  <v-app-bar app>
    <v-toolbar-title class="headline text-uppercase">
      <span>{{ $tc('api', 0) }}</span>
      <span class="font-weight-light">{{ $tc('api', 0) }}</span>
    </v-toolbar-title>
    <v-spacer />
    <v-btn
      :to="{name:'index'}"
      text
      exact
      class="mr-3">
      {{ $t('nav.home') }}
    </v-btn>
    <v-btn
      :to="{name:'apis'}"
      text
      exact
      class="mr-3">
      {{ $t('nav.apis') }}
    </v-btn>
    <v-btn
      :to="{name:'model-create'}"
      text
      exact
      class="mr-3">
      {{ $t('nav.models') }}
    </v-btn>
    <v-btn
      :to="{name:'manage'}"
      exact
      color="primary">
      {{ $t('nav.server') }}
    </v-btn>
  </v-app-bar>
</template>
<script>
export default {}
</script>
