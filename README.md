# tbsk-orch.com

![CI](https://github.com/tbsk-orch/tbsk-orch.com/workflows/CI/badge.svg)

https://tbsk-orch.com のGitHub pagesを管理するリポジトリ

## Contributing

情報の誤りの指摘・訂正、壊れている箇所の指摘・修正、表記ゆれの修正や、[Issue](https://github.com/tbsk-orch/tbsk-orch.com/issues)の解決などでのコントリビュートを歓迎します。
議論の必要がないような明らかな誤りの修正の場合は直接プルリクエストを出していただいて構いません。

プルリクエストを出す際は以下の点にご留意ください。

- https://tbsk-orch.com には[docs/](./docs)フォルダ以下のファイルが露出します。（ `https://tbsk-orch.com/README.md` のようなファイルがwebページ上に露出してほしくないのでこのようにしています）このフォルダ上で作業を行ってください。
- ビルド等は（今の所）特に必要ありません。単に[docs/](./docs)フォルダにあるhtmlファイルを開けば現在デプロイされているwebページを閲覧できます。
- PR提出時はLintを通してください。 `npm run lint` で [prettier](https://prettier.io/)による自動修正ができます。
- PR提出すると[netlify](https://www.netlify.com/)によるステージング環境が立ちますので、修正がうまくいっているかご確認ください。
