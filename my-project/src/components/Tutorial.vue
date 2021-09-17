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
          <th class="addDate">追加日</th>
          <th class="comment">やること</th>
          <th class="state">状態</th>
          <th class="button">-</th>
        </tr>
      </thead>
      <tbody>
        <!-- [1] ここに <tr> で ToDo の要素を1行づつ繰り返し表示したい -->
        <tr v-for="item in computedTodos" v-bind:key="item.id">
          <th>{{ item.id }}</th>
          <td>{{ item.addDate }}</td>
          <td>{{ item.comment }}</td>
          <td class="state">
            <!-- 状態変更ボタンのモック -->
              <b-badge pill variant="primary" v-on:click="doChangeState(item)">
                {{ labels[item.state] }}
              </b-badge>
          </td>
          <td class="button">
            <!-- 削除ボタンのモック -->
            <b-button @click="openModal(item)">削除</b-button>
            <!--<button v-on:click="doRemove(item)">削除</button>-->
          </td>
        </tr>
      </tbody>
    </table>

    <div>
      <form class="add-form" v-on:submit.prevent="doAdd">
        <div class="form-group">
          <label for="addTodoComment">新規ToDo：</label>
          <input
            type="text"
            id="addTodoComment"
            ref="comment"
            placeholder="ToDoを入力してください."
          />
          <b-button type="submit" @click="doGetDate">追加</b-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import todoStorange from "../plugins/todoStorage";
//import MyModal from "./MyModal.vue";

export default {
  //components: { MyModal },
  name: "Tutorial",
  data() {
    return {
      date: "",
      week: ["(日)", "(月)", "(火)", "(水)", "(木)", "(金)", "(土)"],
      removeWindow: false,
      rems: false,
      remItem: "",
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
        return Object.assign(a, { [b.value]: b.label });
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
    doGetDate() {
      let current_date = new Date();
      this.date =
        current_date.getMonth() +
        1 +
        "月" +
        current_date.getDate() +
        "日" +
        this.week[current_date.getDay()];
    },

    // Todo追加の処理
    doAdd: function () {
      // refで名前をつけておいた要素を参照
      var comment = this.$refs.comment;
      // 入力がなければ何もしないで return
      if (!comment.value.length) {
        return;
      }

      this.doGetDate();

      // { 新しいID, コメント, 作業状態 }というオブジェクトを現在のtodosリストへpush
      // 作業状態「state」はデフォルト「作業中=0」で作成
      this.todos.push({
        id: this.uid++,
        addDate: this.date,
        comment: comment.value,
        state: 0,
      });
      comment.value = "";
    },
    doChangeState: function (item) {
      item.state = item.state ? 0 : 1;
    },
    doRemove: function (remItem) {
      const index = this.todos.indexOf(remItem);
      this.todos.splice(index, 1);
    },
    openModal(item) {
      this.remItem = item;
      this.$bvModal
        .msgBoxConfirm(this.remItem.comment, {
          title: "このTodoを削除しますか？",
          size: "lg",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "はい",
          cancelTitle: "いいえ",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          this.rems = value;
          if (this.rems) {
            this.doRemove(this.remItem);
          }
        });
    },
  },
};
</script>

<style scoped>
  button {
    border: none;
    border-radius: 20px;
    line-height: 24px;
    padding: 0 8px;
    background: #0099e4;
    color: #fff;
    cursor: pointer;
  }
</style>
