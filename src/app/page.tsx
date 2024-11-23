"use client";

import { useState } from "react";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useServerAction } from "zsa-react";
import { rizzThisMessageUp } from "./actions";

export default function Page() {
  const [messages, setMessage] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const { execute, data } = useServerAction(rizzThisMessageUp);
  const [isSaid, setIsSaid] = useState<boolean>(false);

  const handleAddMessage = () => {
    if (inputValue.trim()) {
      setMessage([...messages, inputValue]);
      setInputValue("");
    }
  };

  const handleRizzMessageUp = () => {
    setIsSaid(true);
    execute({
      messages: messages,
    });
  };

  return (
    <div>
      {messages.map((message) => (
        <div key={message}>{message}</div>
      ))}
      <div>
        <div>👇มุขเสี้ยวที่ปัญญาประดิษฐ์สร้างขึ้น👇</div>
      </div>
      {data?.text}
      <Input
        placeholder="what she told you?"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={isSaid}
      />
      <Button onClick={handleAddMessage} disabled={isSaid}>
        Add Message
      </Button>
      <Button
        onClick={handleRizzMessageUp}
        disabled={isSaid || messages.length == 0}
      >
        Rizz her up
      </Button>
    </div>
  );
}
