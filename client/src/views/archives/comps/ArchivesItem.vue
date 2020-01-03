<template>
  <div class="archives">
    <ul>
      <li v-for="item in archives" :key="item._id">
        <div class="archives-item">
          <div class="time" :title="item.createTime">{{ item.createTime | createTime}}</div>
          <div>
            <span>
              <router-link :to="'/article/'+item._id">{{ item.title }} |</router-link>
            </span>
            <span>
              <router-link :to="'/categories/'+item.categoryId.name">{{ item.categoryId.name }}</router-link>
            </span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ArchivesItem",
  props: {
    archives: Array
  },
  filters: {
    createTime(val) {
      const month = val.split(" ")[0].split("-")[1];
      const day = val.split(" ")[0].split("-")[2];
      return `${month}-${day}`;
    }
  }
};
</script>

<style scoped>
.archives {
  padding-top: 10px;
  margin: 0 20px;
  margin-right: 25vw;
}

.archives .archives-item {
  margin: 25px 16px;
  position: relative;
}

.archives .archives-item::before {
  content: "";
  position: absolute;
  top: 7px;
  left: -43px;
  width: 28px;
  height: 1px;
  border: 1px solid #e4e7ed;
  background-color: #e4e7ed;
}

.archives .archives-item::after {
  content: "";
  position: absolute;
  top: 5px;
  left: -49px;
  height: 6px;
  width: 6px;
  border: 1px solid #3192e2;
  background-color: #3192e2;
  border-radius: 50%;
}

.archives .archives-item:hover::after {
  background-color: #ffffff;
  border-color: #ccc;
}

.archives .archives-item .time {
  position: absolute;
  top: -1px;
  left: -100px;
}

.archives .archives-item span:first-child {
  font-size: 20px;
}

.archives .archives-item span:last-child a {
  color: #3192e2;
}

.archives .archives-item span:last-child:hover {
  text-decoration: underline;
}

ul {
  list-style: none;
}

a {
  color: #363636;
}

@media screen and (max-width: 768px) {
  .archives .archives-item {
    margin: 20px 16px;
  }

  .archives .archives-item span:first-child {
    font-size: 15px;
  }
  .archives .archives-item span:last-child a {
    font-size: 13px;
  }
}
</style>