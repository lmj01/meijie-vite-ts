<script>
import { ref, h } from 'vue';
// import Demo from './Demo.jsx'
export default {
  // data() {
  //   return {
  //     msg: 'test child jsx'
  //   }
  // },
  // setup() {
  //   const root = ref(null);
  //   return () => h('div', {ref: root});
  //   // return () => <div ref={root} />
  // },
  render() {
    return () => h('div', {ref: 'sd'});
  }
}
</script>
