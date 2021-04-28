<template>
  <svg>
    <use :xlink:href="`/images/icons.svg#${name}`"></use>
  </svg>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
})
</script>
