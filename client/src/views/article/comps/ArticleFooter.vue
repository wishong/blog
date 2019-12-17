<template>
  <div>
    <div class="artcile-footer">
      <div class="prev" v-if="prev.title" title="上一篇">
        <router-link :to="'/article/'+prev._id">{{ prev.title }}</router-link>
      </div>
      <div class="next" v-if="next.title" title="下一篇">
        <router-link :to="'/article/'+next._id">{{ next.title }}</router-link>
      </div>
    </div>
    <div class="artcile-footer-mobile">
      <div class="prev-mobile" v-if="prev.title" title="上一篇">
        <span>上一篇：</span>
        <span>
          <router-link :to="'/article/'+prev._id">{{ prev.title }}</router-link>
        </span>
      </div>
      <div class="next-mobile" v-if="next.title" title="下一篇">
        <span>下一篇：</span>
        <span>
          <router-link :to="'/article/'+next._id">{{ next.title }}</router-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleFooter",
  props: {
    prev: Object,
    next: Object
  }
};
</script>

<style scoped>
.artcile-footer {
  margin: 20px 20px 0;
  position: relative;
}

.artcile-footer a {
  font-size: 20px;
  color: #888;
}

.artcile-footer a:hover {
  color: #363636;
}

.artcile-footer .prev {
  position: absolute;
  top: 0;
  left: 50px;
}

.artcile-footer .next {
  position: absolute;
  top: 0;
  right: 50px;
}

.artcile-footer .prev::before {
  content: "";
  position: absolute;
  left: -15px;
  top: 3px;
  width: 15px;
  height: 15px;
  border-top: 2px solid #888;
  border-left: 2px solid #888;
  transform: rotate(-45deg);
}

.artcile-footer .next::after {
  content: "";
  position: absolute;
  right: -15px;
  top: 3px;
  width: 15px;
  height: 15px;
  border-top: 2px solid #888;
  border-right: 2px solid #888;
  transform: rotate(45deg);
}

.artcile-footer-mobile {
  margin: 20px 20px 0;
  display: none;
}

.artcile-footer-mobile a {
  color: #363636;
}

.artcile-footer-mobile .prev-mobile {
  margin-bottom: 10px;
}

.artcile-footer-mobile .prev-mobile span,
.next-mobile span {
  color: #888;
}

.artcile-footer-mobile .prev-mobile a,
.next-mobile a {
  letter-spacing: 1px;
}

@media screen and (max-width: 768px) {
  .artcile-footer {
    display: none;
  }

  .artcile-footer-mobile {
    display: block;
  }
}
</style>