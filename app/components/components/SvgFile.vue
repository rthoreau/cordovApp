<template>
  <svg viewBox="0 0 23.125 23.129"><use :xlink:href="'#icon-' + icon"></use></svg>
</template>

<script>
export default {
  name: 'SvgFile',
  props: {
    icon: String
  }
}
</script>