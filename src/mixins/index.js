import Vue from 'vue';

Vue.mixin({
  computed: {
    $isLargeAndUp () {
      return this.$vuetify.breakpoint.lgAndUp;
    },
    $isMediumAndDown () {
      return this.$vuetify.breakpoint.mdAndDown;
    },
    $isMedium () {
      return this.$vuetify.breakpoint.mdOnly;
    },
    $isSmallAndDown () {
      return this.$vuetify.breakpoint.smAndDown;
    },
    $isSmall () {
      return this.$vuetify.breakpoint.smOnly;
    },
    $isXSmall () {
      return this.$vuetify.breakpoint.xsOnly;
    }
  }
});
