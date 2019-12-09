<template>
  <div>
    <span>
      <slot name="title">ALL</slot>
    </span>
    <div class="categories">
      <ul>
        <li :class="{active:name === undefined}">
          <router-link to="/categories">ALL</router-link>
        </li>
        <li v-for="item in list" :key="item" :class="{active:item === name}">
          <router-link :to="'/categories/'+item">{{ item }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  created() {
    this.fetch();
  },
  data() {
    return {
      list: [],
      name: this.$route.params.name
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/categories");
      this.list = res.data;
    }
  }
};
</script>

<style scoped>
div {
  margin-left: 20px;
}
.categories {
  padding-left: 10px;
  margin-top: 20px;
}

.categories .active a {
  display: none;
}

span {
  position: relative;
  font-size: 30px;
  color: #666;
}

span::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  width: 110%;
  height: 4px;
  background-color: #3d57e7;
  opacity: 0.4;
}

a {
  color: #363636;
}

ul {
  list-style: none;
}

ul li {
  margin: 10px;
  font-size: 18px;
}
</style>