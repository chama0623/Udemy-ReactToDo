import React, { useState } from "react";
import "./styles.css";

export const App = () => {
  // 入力した値のuseState
  const [todoText, setTodoText] = useState("");
  // 未完了のTODOを管理する配列
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  // 完了したTODOを管理する配列
  const [complateTodos, setCompleteTodos] = useState([]);

  // テキスト入力をtodoTextにセットする
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  // 未完了のTodoを追加する
  const onClickAdd = () => {
    // 空文字のときは何も実行しない
    if (todoText === "") return;
    // スプレッド構文で未完了のTODOにtodoTextを追加する
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    // テキスト入力をリセットする
    setTodoText("");
  };

  // 未完了のTodoリストから削除する
  const onClickdelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  // 未完了のTodoリストから完了のTodoリストに移動する
  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);

    const newComplateTodos = [...complateTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newComplateTodos);
  };

  // 完了のTodoリストから未完了のTodoリストに移動する
  const onClickBack = (index) => {
    const newCompleteTodos = [...complateTodos];
    newCompleteTodos.splice(index, 1);

    const newIncompleteTodos = [...incompleteTodos, complateTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  };

  return (
    <>
      <div className="input-area">
        <input
          placeholder="TODOを入力"
          value={todoText}
          onChange={onChangeTodoText}
        />
        <button onClick={onClickAdd}>追加</button>
      </div>
      <div className="incomplete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {incompleteTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickComplete(index)}>完了</button>
                <button onClick={() => onClickdelete(index)}>削除</button>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="complete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {complateTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickBack(index)}>戻す</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
