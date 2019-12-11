<template>
  <div>
    <about-blog />
    <about-me />
    <contact-me />
    <back-top />
  </div>
</template>

<script>
import AboutBlog from "./comps/AboutBlog";
import AboutMe from "./comps/AboutMe";
import ContactMe from "./comps/ContactMe";
import BackTop from "@/components/backTop/BackTop";

export default {
  name: "About",
  components: {
    AboutBlog,
    AboutMe,
    ContactMe,
    BackTop
  }
};
</script>

<style scoped>
</style>