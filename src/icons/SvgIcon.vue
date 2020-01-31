<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
import { reactive, ref, onMounted, computed } from "@vue/composition-api";
export default {
  name: "SvfIcon",
  // props: ['iconClass', 'className'],
  props: {
    iconClass: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    console.log(props)
    const msg = ref("手把手撸吗教学");
    const iconName = computed(() => `#icon-${props.iconClass}`)
    const svgClass = computed(() => {
      if(props.className) {
        return `svg-icon ${props.className}`
      }else {
        return `svg-icon`
      }
    })
    return {
      msg,
      iconName,
      svgClass
    }
  }
}
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
}
</style>