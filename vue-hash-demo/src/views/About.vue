<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div v-html="html"></div>
  </div>
</template>


<script>
export default {
  data() {
    return { html: `<h2 style="color:red">哈哈哈<h2>` };
  }
};
</script>
