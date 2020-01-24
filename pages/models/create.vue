<template>
  <div />
</template>

<script>
import page from '~/mixins/page'

export default {
  name: 'ModelCreate',
  mixins: [page],
  mounted () {
    this.setCrumbs([
      { label: this.$t('nav.home'), route: { name: 'index' } },
      { label: this.$t('nav.models'), route: { name: 'models' } },
      { label: this.$t('nav.createModel'), route: { name: 'models-create' } }
    ])
  }
}
</script>

<style scoped>

</style>
