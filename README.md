## 会員登録制Todoリスト

Vue.jsを使用して作成したweb上で動くTodo管理アプリ。
下記サイトのチュートリアルで作成したTodoリストを機能拡張した形。
https://cr-vue.mio3io.com/tutorials/todo.html

## デモ

以下のようにTodoの状態を管理できる。

![todo-demo](https://user-images.githubusercontent.com/86580511/144947294-dbda9c82-6591-4e92-910f-dad010a96bac.gif)

## 特徴

Cloud Firestoreを用いてユーザの会員情報を管理。Todoを追加した日にちや締切日、作業中か完了済かの状態を管理可能。
状態管理にはVuexを使用。

## 動作環境

* Ubuntu 20.04.3 LTS

## 使用方法

1. npmを事前にインストールしておく。
2. ローカルサーバを起動する。
```bash
npm run serve
```


## 注意

**このシステムは未完成です**

* 現状、ローカルストレージを使用しているため、保存したデータを他の端末から見ることは**できません**。
* 会員登録はできるものの、ユーザごとに固有のTodoリストを持たせることが**できていません**。

