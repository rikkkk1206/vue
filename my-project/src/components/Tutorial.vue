<template>
  <div>
    <label v-for="label in options" v-bind:key="label.value">
      <input type="radio" v-model="current" v-bind:value="label.value" />{{
        label.label
      }}
    </label>
    <table>
      <!-- テーブルヘッダー -->
      <thead>
        <tr>
          <th class="id">ID</th>
          <th class="comment">コメント</th>
          <th class="state">状態</th>
          <th class="button">-</th>
        </tr>
      </thead>
      <tbody>
        <!-- [1] ここに <tr> で ToDo の要素を1行づつ繰り返し表示したい -->
        <tr v-for="item in computedTodos" v-bind:key="item.id">
          <th>{{ item.id }}</th>
          <td>{{ item.comment }}</td>
          <td class="state">
            <!-- 状態変更ボタンのモック -->
            <button v-on:click="doChangeState(item)">
              {{ labels[item.state] }}
            </button>
          </td>
          <td class="button">
            <!-- 削除ボタンのモック -->
            <button v-on:click="openModal()">削除</button>
            <!--<button v-on:click="doRemove(item)">削除</button>-->
          </td>
        </tr>
      </tbody>
    </table>

    <h2>新しい作業の追加</h2>
    <form class="add-form" v-on:submit.prevent="doAdd">
      <!-- コメント入力フォーム -->
      コメント <input type="text" ref="comment" />
      <!-- 追加ボタンのモック -->
      <button type="submit">追加</button>
    </form>

    <h3 v-if="rems">
      <MyModal
        v-show="removeWindow"
        @rem="doRemove(item)"
        @clo="closeModal()"
      />
    </h3>
  </div>
</template>

<script>
import todoStorange from "../plugins/todoStorage";
import MyModal from "./MyModal.vue";

export default {
  components: { MyModal },
  name: "Tutorial",
  data() {
    return {
      removeWindow: false,
      rems: false,
      todos: [],
      uid: 0,
      options: [
        { value: -1, label: "すべて" },
        { value: 0, label: "作業中" },
        { value: 1, label: "完了" },
      ],
      // 選択している options の value を記憶するためのデータ
      // 初期値を「-1」つまり「すべて」にする
      current: -1,
    };
  },
  computed: {
    labels() {
      return this.options.reduce(function (a, b) {
        return Object.assign(a, { [b.value]: b.value });
      }, {});
      // キーから見つけやすいように、次のように加工したデータを作成
      // {0: '作業中', 1: '完了', -1: 'すべて'}
    },
    computedTodos: function () {
      // データ current が -1 ならすべて
      // それ以外なら current と state が一致するものだけに絞り込む
      return this.todos.filter(function (el) {
        return this.current < 0 ? true : this.current === el.state;
      }, this);
    },
  },
  created() {
    // インスタンス作成時に自動的にfetch()する
    this.todos = todoStorange.fetch();
    this.uid = this.todos.length;
  },
  watch: {
    // オプションを使う場合はオブジェクト形式にする
    todos: {
      // 引数はウォッチしているプロパティ形式にする
      handler: function (todos) {
        todoStorange.save(todos);
      },
      // deepオプションでネストしているデータも監視できる
      deep: true,
    },
  },
  methods: {
    // Todo追加の処理
    doAdd: function () {
      // refで名前をつけておいた要素を参照
      var comment = this.$refs.comment;
      // 入力がなければ何もしないで return
      if (!comment.value.length) {
        return;
      }
      // { 新しいID, コメント, 作業状態 }というオブジェクトを現在のtodosリストへpush
      // 作業状態「state」はデフォルト「作業中=0」で作成
      this.todos.push({
        id: this.uid++,
        comment: comment.value,
        state: 0,
      });
      comment.value = "";
    },
    doChangeState: function (item) {
      item.state = item.state ? 0 : 1;
    },
    doRemove: function (item) {
      const index = this.todos.indexOf(item);
      this.todos.splice(index, 1);
      this.removeWindow = false;
      this.rems = false;
    },
    openModal() {
      this.removeWindow = true;
      this.rems = true;
    },
    closeModal() {
      this.removeWindow = false;
      this.rems = false;
    },
  },
};
</script>

<style scoped>
</style>
