<template>
  <div class="search-container">
    <div class="search-bar">
      <input
        type="text"
        placeholder="搜索.."
        v-model.trim="data"
        @keyup.enter="fetch(data)"
        autocomplete="off"
      />
      <span class="el-icon-search" @click="fetch(data)"></span>
    </div>
    <hr />
    <div class="search-result" v-show="init">
      <pre v-show="list.length !== 0"><p>包含<span>"{{ oldData }}"</span>的文章：</p></pre>
      <pre v-show="list.length === 0"><p>没有搜索到包含<span>"{{ oldData }}"</span>的文章</p></pre>
      <ol>
        <li v-for="(item,i) in list" :key="item._id">
          <div class="article">
            <router-link :to="'/article/'+item._id">
              <h3 v-html="ruleTitle(i)">{{ item.title }}</h3>
            </router-link>
            <div class="describe" v-html="ruleDescribe(i)">{{ item.describe }}</div>
          </div>
        </li>
      </ol>
    </div>
    <back-top />
  </div>
</template>

<script>
import { fetchSearch } from "@/network/search";
import BackTop from "@/components/backTop/BackTop";

export default {
  name: "Search",
  data() {
    return {
      init: false,
      data: "",
      list: [],
      oldData: ""
    };
  },
  methods: {
    fetch(data) {
      if (data === "") {
        this.init = false;
        this.$toast("不能为空");
      }
      fetchSearch(this.data).then(res => {
        this.init = true;
        this.list = res.data;
        this.oldData = this.data;
      });
    }
  },
  computed: {
    ruleTitle() {
      return function(i) {
        let titleString = this.list[i].title;
        if (!titleString) {
          return "";
        }
        if (this.oldData && this.oldData.length > 0) {
          // 匹配关键字正则
          let replaceReg = new RegExp(this.oldData, "g");
          // 高亮替换v-html值
          let replaceString =
            '<span style="color:#f16f6f;font-weight:bold;">' +
            this.oldData +
            "</span>";
          // 开始替换
          titleString = titleString.replace(replaceReg, replaceString);
        }
        return titleString;
      };
    },
    ruleDescribe() {
      return function(i) {
        let describeString = this.list[i].describe;
        if (!describeString) {
          return "";
        }
        if (this.oldData && this.oldData.length > 0) {
          // 匹配关键字正则
          let replaceReg = new RegExp(this.oldData, "g");
          // 高亮替换v-html值
          let replaceString =
            '<span style="color:#f16f6f;font-weight:bold;">' +
            this.oldData +
            "</span>";
          // 开始替换
          describeString = describeString.replace(replaceReg, replaceString);
        }
        return describeString;
      };
    }
  },
  components: {
    BackTop
  }
};
</script>

<style scoped>
.search-container {
  min-height: 350px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-container .search-bar {
  margin-top: 30px;
}

.search-container .search-bar .el-icon-search {
  cursor: pointer;
  position: relative;
  left: -30px;
  font-size: 20px;
  font-weight: bold;
}

.search-container .search-result {
  width: 60%;
}

.search-container .search-result span {
  color: #f16f6f;
  white-space: pre-wrap;
}

.search-container .search-result .article {
  padding: 8px 0px 3px;
  border-top: 2px solid #ddd;
}

.search-container .search-result .article h3 {
  margin-bottom: 5px;
}

.search-container .search-result .article .describe {
  font-size: 16px;
  text-indent: 20px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

input {
  outline: none;
  height: 35px;
  width: 250px;
  padding-left: 12px;
  padding-right: 32px;
  border: 2px solid #888;
  border-radius: 20px;
  font-size: 18px;
}

input:hover {
  border: 2px solid #363636;
  box-shadow: 1px 2px 2px #ccc;
}

ol {
  margin: 20px 20px 0;
}

ol li {
  margin: 10px 0;
}

p {
  font-size: 25px;
}

hr {
  margin: 50px 0 30px;
  width: 60%;
  height: 3px;
  border: none;
  background-color: #ddd;
  background-image: repeating-linear-gradient(
    -45deg,
    #fff,
    #fff 4px,
    transparent 4px,
    transparent 8px
  );
  border-radius: 15px;
}

a {
  color: #363636;
}

h3:hover {
  text-shadow: 1px 0 1px #ccc;
}

pre {
  width: 100%;
}

@media screen and (max-width: 768px) {
  .search-container .search-result {
    width: 90%;
  }

  hr {
    width: 90%;
    margin: 30px 0 20px;
  }

  input {
    width: 200px;
  }
  p {
    font-size: 20px;
  }

  h3 {
    font-size: 18px;
  }
}
</style>