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
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
#content {
  z-index: 2;
  width: 50%;
  padding-top: 5em;
  padding-bottom: 5em;
  text-align: center;
}
</style>
