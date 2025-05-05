# tbsk-orch.com

![CI](https://github.com/tbsk-orch/tbsk-orch.com/workflows/CI/badge.svg)

https://tbsk-orch.com のGitHub pagesを管理するリポジトリ

## Contributing

情報の誤りの指摘・訂正、壊れている箇所の指摘・修正、表記ゆれの修正や、[Issue](https://github.com/tbsk-orch/tbsk-orch.com/issues)の解決などでのコントリビュートを歓迎します。
議論の必要がないような明らかな誤りの修正の場合は直接プルリクエストを出していただいて構いません。

プルリクエストを出す際は以下の点にご留意ください。

- [11ty](https://www.11ty.dev/)によるビルドが必要です。以下のようにビルドできるはずです。

```shell
# node.js をインストール
# https://nodejs.org/ja/download/ の指示に従ってください

# yarn をインストール
corepack enable yarn

# yarn を使って依存関係をインストール
yarn install

# ビルド
yarn build

# ビルドしたものを確認
# dist/ フォルダに吐き出されたファイルを確認してください。
```

- PR提出時はLintを通してください。 `yarn lint` で [prettier](https://prettier.io/)による自動修正ができます。
- PR提出すると[netlify](https://www.netlify.com/)によるステージング環境が立ちますので、修正がうまくいっているかご確認ください。
