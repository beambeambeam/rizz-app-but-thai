"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useServerAction } from "zsa-react";
import { rizzThisMessageUp } from "./actions";
import { Separator } from "~/components/ui/separator";
import Image from "next/image";
import { CopyIcon } from "~/app/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

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
    <div className="grid grid-cols-3 w-full h-screen from-[#CDE3E7] to-[#D7D5DD] place-content-center">
      <div className="col-span-1 col-start-2 flex gap-4 flex-col ">
        {messages.length != 0 && (
          <div className="bg-black flex flex-col gap-2 w-full p-4 rounded">
            {messages.map((message, index) => (
              <div
                className="w-full flex justify-end"
                key={`${message}-${index}`}
              >
                <p className="bg-[#1084FD] text-end w-fit p-2 rounded text-white">
                  {message}
                </p>
              </div>
            ))}
          </div>
        )}
        {data && (
          <div className="w-full grid grid-cols-[1fr_auto_1fr] place-content-center items-center gap-2">
            <Separator />
            <p>👇มุขเสี้ยวที่ปัญญาประดิษฐ์สร้างขึ้น👇</p>
            <Separator />
          </div>
        )}
        {data && (
          <div className="bg-[#EAF0F6] p-4 rounded grid-cols-[1fr_auto] grid">
            <p>{data.text}</p>
            <div className="w-full h-full flex items-center justify-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        navigator.clipboard.writeText(data.text);
                      }}
                    >
                      <CopyIcon className="size-10" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Click to copy</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        )}
        {!data && (
          <>
            <Input
              placeholder="what she told you?"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddMessage();
                }
              }}
              disabled={isSaid}
            />
            <Button onClick={handleAddMessage} disabled={isSaid || !inputValue}>
              Add Message
            </Button>
            <Button
              onClick={handleRizzMessageUp}
              disabled={isSaid || messages.length == 0}
            >
              Rizz her up
            </Button>
          </>
        )}
      </div>
      <div className="col-span-1 col-start-3 items-center justify-center flex flex-col">
        <p className="text-center p-5">
          If you rizz works please donate me, the bigger the tips the bigger
          your pp
        </p>
        <Image src="/qrcode.jpg" alt="qrcode" width="300" height="20" />
      </div>
    </div>
  );
}
