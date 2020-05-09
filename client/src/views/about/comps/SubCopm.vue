<template>
  <div class="sub-container">

    <div class="title">
      <slot name="title" />
    </div>

    <div class="content">
      <slot name="content" />
    </div>

  </div>
</template>

<script>
export default {
  name: "SubCopm"
};
</script>

<style scoped>
.sub-container {
  margin: 10px 20px;
  padding: 10px;
}

.title {
  position: relative;
  background: linear-gradient(to right, #eee 0%, #f8f8f8 100%);
  width: 120%;
}

.title::before {
  content: '';
  position: absolute;
  height: 100%;
  width: 3px;
  background-color: #363636;
  top: 0px;
  left: -7px;
}

.content p {
  font-size: 16px;
  text-indent: 32px;
  line-height: 30px;
  letter-spacing: 1px;
}
</style>