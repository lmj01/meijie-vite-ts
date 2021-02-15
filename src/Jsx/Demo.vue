<script>
export default {
  props: ['msg'],
  render() {
    return (
      <div>
        <p>jsx Child Component</p>
        <p>msg: {this.msg}</p>
      </div>
    );
  }
};
</script>
