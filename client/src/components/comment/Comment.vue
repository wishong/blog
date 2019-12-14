<template>
  <div class="comment-container">
    <h2>评论</h2>
    <form method="POST" @submit.prevent="postComment" class="form">
      <div class="info">
        <input type="text" placeholder="name.." v-model.trim="commentInfo.commenter" />
        <input type="email" placeholder="(选填)email.. " v-model.trim="commentInfo.email" />
      </div>
      <textarea type="text" class="content" placeholder="评论.." v-model.trim="commentInfo.comment" />
      <button type="sumbit">发表</button>
    </form>
    <h2 v-if="list.length === 0">没有评论</h2>
    <ul v-else>
      <li v-for="(item,i) in list" :key="item._id">
        <div class="commentItem">
          <div class="top">
            <span :title="'评论人:'+item.commenter">{{ item.commenter }}</span>
            <span>第{{ list.length - i}}楼</span>
          </div>
          <p class="bottom">{{ item.comment }}</p>
          <p class="time">{{ item.commentTime }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Comment",
  data() {
    return {
      commentInfo: {
        commenter: "",
        comment: "",
        email: "",
        articleId: this.id
      },
      list: []
    };
  },
  props: {
    id: String
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`/comments/${this.id}`);
      this.list = res.data;
    },
    async postComment() {
      if (this.commentInfo.commenter === "") {
        return this.$toast("昵称不能为空");
      }
      if (this.commentInfo.comment === "") {
        return this.$toast("评论内容不能为空");
      }
      const res = await this.$http.post("/comments", this.commentInfo);
      this.clear();
      this.fetch();
      return this.$toast("评论成功");
    },
    clear() {
      this.commentInfo.commenter = "";
      this.commentInfo.comment = "";
      this.commentInfo.email = "";
    }
  }
};
</script>

<style scoped>
.comment-container {
  margin: 80px 20px 0;
}

.comment-container .form {
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px;
}

.comment-container .form .info {
  display: flex;
}

.comment-container .form .info input {
  font-size: 18px;
  margin: 3px 25px;
  padding: 0 8px;
  width: 220px;
  height: 40px;
  outline: none;
  border: none;
  border-bottom: 1px solid #ccc;
  color: #666;
}

.comment-container .form .content {
  outline: none;
  margin: 20px 0 10px;
  height: 80px;
  width: 100%;
  resize: none;
  font-size: 18px;
  padding: 5px 10px;
  line-height: 30px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: #ebebeb;
  color: #666;
}

.comment-container .form .content:hover {
  background-color: #f1f1f1;
}

.comment-container .commentItem {
  margin: 10px 0;
  padding: 10px 15px;
  border: 2px solid #eee;
  border-radius: 15px;
}

.comment-container .commentItem:hover {
  border: 2px solid #666;
}

.comment-container .commentItem .top {
  display: flex;
  justify-content: space-between;
}

.comment-container .commentItem .top span {
  font-size: 18px;
  letter-spacing: 1px;
  color: #888;
}

.comment-container .commentItem .top span:first-child {
  font-weight: bold;
  color: #3192e2;
  letter-spacing: 0;
}

.comment-container .commentItem .bottom {
  margin: 10px 0;
  font-size: 20px;
}

.comment-container .commentItem .time {
  font-size: 16px;
  color: #888;
}

button {
  align-self: flex-end;
  outline: none;
  cursor: pointer;
  margin: 0 10px;
  height: 35px;
  width: 75px;
  border-radius: 15px;
  border: 1px solid #ccc;
  background: #fff;
}

button:hover {
  border: 2px solid #363636;
  font-weight: bold;
}

h2 {
  padding: 0 10px 5px;
}

h2:first-child {
  border-bottom: 2px solid #ccc;
}

ul {
  margin: 0 10px;
  padding: 0 10px;
  list-style: none;
  /* border: 1px solid #ccc; */
}

@media screen and (max-width: 768px) {
  .comment-container {
    margin: 25px 0;
  }

  .comment-container .form {
    padding: 5px;
    margin: 0;
  }

  .comment-container .form .info input {
    width: 50%;
    margin: 0 10px;
    font-size: 15px;
  }

  .comment-container .form .content {
    font-size: 16px;
    height: 70px;
    line-height: 25px;
    margin: 14px 0 7px;
  }

  .comment-container .commentItem {
    padding: 5px 15px;
  }

  .comment-container .commentItem .top span {
    font-size: 15px;
  }

  .comment-container .commentItem .bottom {
    margin: 8px 0;
    font-size: 16px;
  }

  .comment-container .commentItem .time {
    font-size: 14px;
  }

  h2 {
    font-size: 22px;
  }

  ul {
    margin: 0;
    padding: 0 5px;
  }
}
</style>