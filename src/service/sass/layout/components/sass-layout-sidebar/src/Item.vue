<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      default: ''
    }
  },
  render (h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      vnodes.push(<svg-icon icon-class={icon} />)
    }

    if (title) {
      vnodes.push(<span slot='title'>{title}</span>)
    }
    return vnodes
  }
}
</script>
<style lang="less" scoped>
.svg-icon {
  margin-right: 16px;
  vertical-align: middle;
}
</style>
