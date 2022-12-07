import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
  // 入力した値のuseState
  const [todoText, setTodoText] = useState("");
  // 未完了のTODOを管理する配列
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  // 完了したTODOを管理する配列
  const [completeTodos, setCompleteTodos] = useState([]);

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

    const newComplateTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newComplateTodos);
  };

  // 完了のTodoリストから未完了のTodoリストに移動する
  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5 && true}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>
          5個以上のtodoを登録できません!todoを消化してね!
        </p>
      )}
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickdelete={onClickdelete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
