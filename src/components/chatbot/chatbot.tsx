'use client';

import { chatbot } from '@/ai/flows/chatbot';
import type { Message } from '@/ai/flows/schemas/chatbot-schema';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Loader2, Send, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen, isMobile]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatbot({
        history: messages,
        message: input,
      });
      const modelMessage: Message = { role: 'model', content: response.response };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage: Message = {
        role: 'model',
        content: "Sorry, I'm having trouble connecting. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollableViewport = scrollAreaRef.current.querySelector(
        'div[data-radix-scroll-area-viewport]'
      );
      if (scrollableViewport) {
        scrollableViewport.querySelector('[data-message]:last-child')?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [messages]);

  return (
    <>
      <Button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 rounded-full w-16 h-16 shadow-lg z-50"
      >
        {isOpen ? <X className="w-8 h-8" /> : <MessageSquare className="w-8 h-8" />}
      </Button>

      {isOpen && (
        <Card className="fixed bottom-24 right-4 w-80 h-[28rem] flex flex-col shadow-lg z-50">
          <CardHeader className="bg-[#F9F7FE] py-4">
            <CardTitle className="flex items-center justify-center gap-2 text-xl font-bold text-[#6F5CFF]">
              <MessageSquare />
              oto.do Assistant
            </CardTitle>
          </CardHeader>
          <CardContent
            className="flex-1 flex flex-col gap-4 overflow-hidden pt-4"
            onTouchMove={(e) => e.stopPropagation()}
          >
            <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    data-message
                    className={`flex gap-2 ${
                      message.role === 'user' ? 'justify-end' : ''
                    }`}
                  >
                    {message.role === 'model' && (
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start" data-message>
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div className="bg-muted rounded-lg px-3 py-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask me anything..."
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading}>
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
}
