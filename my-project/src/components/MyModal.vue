<template>
  <div id="overlay">
    <div id="content">
      <p>削除しますか？</p>
      <button @click="$emit('rem')">削除</button>
      <button @click="$emit('clo')">閉じる</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyModal",
};
</script>

<style>
#overlay {
  box-sizing: border-box;
  display: inline-block;
  z-index: 20;
  position: relative;
  width: 50%;
  max-width: 600px;
  padding: 30px 30px 15px;
  border-radius: 2px;
  background: #fff;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.6);
  vertical-align: middle;
  border: 2px solid;
  border-color: black;
}

#content {
  padding: 10px 20px;
}
</style>
