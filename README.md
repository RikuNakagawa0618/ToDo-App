# ToDoアプリ

React,TypeScriptがどういったものなのか知るために、ChatGPT4oを用いて作成しました。
制作期間は1日です。

## 概要

このプロジェクトは、ReactとTypeScriptを使用して作成されたToDoアプリケーションです。
Chakra UIを使用してデザインされており、ローカルストレージを用いてデータを保持します。

## 技術スタック

- **フロントエンド**:
  - [React](https://reactjs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Chakra UI](https://chakra-ui.com/)
  - [React DatePicker](https://reactdatepicker.com/)
- **状態管理**:
  - React Hooks (useState, useEffect)
- **データ保存**:
  - LocalStorage

- **src/**:
  - **components/**:
    - `AddTodoForm.tsx`: タスク追加フォームのコンポーネント。
    - `CustomDateInput.tsx`: カスタム日付入力コンポーネント。
    - `Filter.tsx`: フィルタリングコンポーネント。
    - `Sort.tsx`: ソートコンポーネント。
    - `TodoItem.tsx`: ToDoリストアイテムのコンポーネント。
  - `App.tsx`: メインのアプリケーションコンポーネント。
  - `index.tsx`: Reactアプリケーションのエントリーポイント。

1.タスクを入力し、期限を設定して「追加」ボタンをクリック。
2.タスクの完了状態を変更するには、チェックボックスをクリック。
3.タスクを編集するには、「編集」ボタンをクリックし、必要な変更を行って「保存」ボタンをクリック。
4.タスクを削除するには、「削除」ボタンをクリック。
5.フィルタリングオプションを使用して、全てのタスク、未完了のタスク、完了済みのタスクを切り替えできる。
6.ソートオプションを使用して、期限または作成日でタスクを並び替えることができる。