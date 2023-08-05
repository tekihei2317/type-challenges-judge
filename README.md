# type-challenges-judge

[type-challenges](https://github.com/type-challenges/type-challenges)のオンラインジャッジです。

![](https://i.gyazo.com/e9eff32dc0db479da0a31eef62ebdd21.png)
## できること

- type-challengesの問題の閲覧する
- 問題の回答の提出して、正誤を確認する
- 自分がどれくらい問題を解いたかをグラフで確認する


## 環境構築

- Node.js 18
- sqlc
  - [Installing sqlc — sqlc 1.20.0 documentation](https://docs.sqlc.dev/en/stable/overview/install.html)

```bash
yarn install

# データベースに初期データを入れる
yarn db:seed

# Firebaseのエミュレーターの起動する
yarn emulators
```

```bash
# 判定用のワーカーを起動する
ln -s ../.wrangler judge-worker/.wrangler # ローカルのデータベースを共有する
cd judge-worker
yarn dev
```

```bash
# 開発サーバーを起動する
yarn dev
```

## 開発

### データベースのマイグレーション

wranglerで、マイグレーションファイルを作成して実行します。

```bash
wrangler d1 migrations create type-challenges-judge <migration_name>
yarn migrate
```

マイグレーションを実行したら、sqlcで使用するための`database/schema.sql`を次のコマンドで更新します。

```bash
yarn db:dump-schema
```

### データベースにアクセスする処理を書く

`server/query.sql`にSQLを書いてから、次のコマンドを実行してD1用のクエリと型を生成します。

```bash
yarn generate:query
```
