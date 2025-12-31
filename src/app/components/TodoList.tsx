"use client";

import { useState } from "react";
import { useTodos, Todo } from "../hooks/useTodos";

function TodoItem({
  todo,
  index,
  onToggle,
  onDelete,
  onEdit,
}: {
  todo: Todo;
  index: number;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSubmit = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "Escape") {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  // 季節の花モチーフ
  const flowers = ["桜", "梅", "菊", "藤", "椿", "牡丹", "蓮"];
  const flowerIndex = index % flowers.length;

  return (
    <li
      className="flex items-center gap-3 p-4 rounded-lg group transition-all hover:translate-y-[-2px]"
      style={{
        background: todo.completed
          ? "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)"
          : "linear-gradient(135deg, #fff 0%, #f8f4eb 100%)",
        border: "1px solid #c9a84c",
        boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      {/* 和風チェックボタン（花モチーフ） */}
      <button
        onClick={() => onToggle(todo.id)}
        className="w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110 flex-shrink-0"
        style={{
          background: todo.completed
            ? "linear-gradient(135deg, #c9a84c 0%, #a67c00 100%)"
            : "linear-gradient(135deg, #fce4ec 0%, #f8bbd9 100%)",
          border: todo.completed ? "2px solid #a67c00" : "2px solid #d14836",
          boxShadow: todo.completed
            ? "0 0 10px rgba(201, 168, 76, 0.5)"
            : "inset 0 0 10px rgba(255,255,255,0.5)",
        }}
      >
        <span className="text-lg" style={{ color: todo.completed ? "#fff" : "#d14836" }}>
          {todo.completed ? "済" : flowers[flowerIndex]}
        </span>
      </button>

      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSubmit}
          onKeyDown={handleKeyDown}
          className="flex-1 px-3 py-2 text-lg rounded"
          style={{
            border: "1px solid #c9a84c",
            fontFamily: "'Noto Serif JP', serif",
            background: "#fff",
          }}
          autoFocus
        />
      ) : (
        <span
          onClick={() => setIsEditing(true)}
          className={`flex-1 cursor-pointer text-lg ${
            todo.completed ? "line-through text-gray-500" : "text-gray-800"
          }`}
          style={{
            fontFamily: "'Noto Serif JP', serif",
          }}
        >
          {todo.text}
        </span>
      )}

      {/* 削除ボタン */}
      <button
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 px-3 py-2 rounded transition-all hover:scale-105"
        style={{
          background: "linear-gradient(135deg, #264c6e 0%, #1a3a54 100%)",
          border: "1px solid #1a3a54",
          color: "#fff",
          fontFamily: "'Noto Serif JP', serif",
          fontSize: "0.9rem",
        }}
      >
        消す
      </button>
    </li>
  );
}

export default function TodoList() {
  const { todos, isLoaded, addTodo, toggleTodo, deleteTodo, editTodo } =
    useTodos();
  const [newTodoText, setNewTodoText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo(newTodoText);
    setNewTodoText("");
  };

  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;

  if (!isLoaded) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[200px]">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #fce4ec 0%, #f8bbd9 100%)",
            border: "2px solid #d14836",
            animation: "float 1.5s ease-in-out infinite",
          }}
        >
          <span className="text-2xl">桜</span>
        </div>
        <p
          className="mt-4 text-lg"
          style={{
            color: "#264c6e",
            fontFamily: "'Noto Serif JP', serif",
          }}
        >
          読み込み中...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto relative z-10">
      {/* 入力フォーム */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="新しい予定を書く..."
            className="flex-1 px-4 py-3 text-lg rounded-lg"
            style={{
              border: "1px solid #c9a84c",
              boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
              fontFamily: "'Noto Serif JP', serif",
              background: "#fff",
            }}
          />
          <button
            type="submit"
            disabled={!newTodoText.trim()}
            className="px-6 py-3 rounded-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(135deg, #d14836 0%, #b71c1c 100%)",
              border: "1px solid #b71c1c",
              boxShadow: "2px 2px 8px rgba(0,0,0,0.15)",
              color: "#fff",
              fontFamily: "'Noto Serif JP', serif",
              fontSize: "1rem",
            }}
          >
            追加
          </button>
        </div>
      </form>

      {/* 進捗表示 */}
      {totalCount > 0 && (
        <div
          className="mb-4 p-3 rounded-lg text-center"
          style={{
            background: "linear-gradient(135deg, #264c6e 0%, #1a3a54 100%)",
            border: "1px solid #1a3a54",
            boxShadow: "2px 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          <span
            className="text-lg text-white"
            style={{
              fontFamily: "'Noto Serif JP', serif",
            }}
          >
            進捗: {completedCount} / {totalCount} 完了
          </span>
          {completedCount === totalCount && totalCount > 0 && (
            <span className="ml-2">御見事!</span>
          )}
        </div>
      )}

      {todos.length === 0 ? (
        <div
          className="text-center py-12 rounded-lg"
          style={{
            background: "rgba(255,255,255,0.9)",
            border: "1px solid #c9a84c",
            boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <div
            className="text-5xl mb-4"
            style={{
              animation: "float 2s ease-in-out infinite",
            }}
          >
            🌸
          </div>
          <p
            className="text-xl"
            style={{
              color: "#d14836",
              fontFamily: "'Noto Serif JP', serif",
            }}
          >
            予定がありません
          </p>
          <p
            className="text-base mt-2"
            style={{
              fontFamily: "'Noto Serif JP', serif",
              color: "#666",
            }}
          >
            上のフォームから追加してください
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {todos.map((todo, index) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              index={index}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
