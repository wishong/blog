<template>
  <div>
    <pageHeader />
    <h3>回复评论</h3>
    <el-form label-width="120px" @submit.native.prevent="save" :model="comment">
      <el-form-item label="回复" prop="name">
        <el-input v-model="comment.reply" placeholder="回复评论"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">回复</el-button>
        <el-button type="primary" @click="comment.reply=''">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fetchComment, replyComment } from "@/network/article";
import PageHeader from "@/components/pageHeader/PageHeader";

export default {
  name: "ReplyComment",
  created() {
    this.fetch();
  },
  data() {
    return {
      id: this.$route.params.id,
      comment: {}
    };
  },
  methods: {
    fetch() {
      fetchComment(this.id).then(res => {
        this.comment = res.data;
      });
    },
    save() {
      replyComment(this.id, this.comment).then(res => {
        this.$router.back();
        this.$message({
          type: "success",
          message: "回复成功",
          duration: 1000
        });
      });
    }
  },

  components: {
    PageHeader
  }
};
</script>

<style scoped>
</style>