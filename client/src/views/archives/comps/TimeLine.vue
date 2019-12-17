<template>
  <div class="archives-container">
    <div class="year">
      <span>2019</span>
      <archives-item />
    </div>
  </div>
</template>

<script>
import ArchivesItem from "./ArchivesItem";

export default {
  name: "TimeLine",
  components: {
    ArchivesItem
  }
};
</script>

<style scoped>
.archives-container {
  position: relative;
  min-height: 50vh;
  margin-bottom: 20vh;
  margin-left: 30vh;
  width: 100%;
}

.archives-container .year {
  position: relative;
}

.archives-container .year::before {
  content: "";
  position: absolute;
  border-right: 3px solid #e4e7ed;
  top: 62px;
  left: -11px;
  height: 105%;
}

.archives-container .year span {
  font-size: 35px;
  color: #888;
}

.archives-container .year span:hover {
  color: #363636;
}

.archives-container .year span::before {
  content: "";
  position: absolute;
  top: 42px;
  left: -19px;
  width: 18px;
  height: 18px;
  border: 1px solid #e4e7ed;
  border-radius: 50%;
  background-color: #e4e7ed;
}

@media screen and (max-width: 768px) {
  .archives-container {
    margin-left: 20vh;
  }
}

@media screen and (max-width: 500px) {
  .archives-container {
    margin-left: 11vh;
  }
}
</style>