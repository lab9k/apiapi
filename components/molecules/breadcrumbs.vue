<template>
  <nav v-if="crumbs"
       class="grey lighten-4">
    <v-breadcrumbs :items="crumbs"
                   divider=">">
      <v-breadcrumbs-item
        slot="item"
        slot-scope="{ item }"
        :to="item.route"
        exact>
        {{ item.label }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import { getterTypes } from '../../store/crumbs'

export default {
  computed: {
    ...mapGetters('crumbs', {
      crumbs: getterTypes.CRUMBS
    })
  }
}
</script>
