import { useState } from 'react';
import { Bot, Send, Sparkles, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function DrishtiqCopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello. I am DRISHTIQ™ Copilot. How can I assist you with your automotive insights today?' }
  ]);
  const [input, setInput] = useState('');

  // Enterprise-grade sound effects
  const playSound = (type: 'open' | 'close' | 'send' | 'receive') => {
    try {
      // Satisfying "pop win" (success pop) sound effect
      const unifiedSound = 'https://assets.mixkit.co/active_storage/sfx/1114/1114-preview.mp3'; 
      const sounds = {
        open: unifiedSound,
        close: unifiedSound,
        send: unifiedSound,
        receive: unifiedSound
      };
      const audio = new Audio(sounds[type]);
      audio.volume = 1.0; // Max volume so it is clearly heard
      audio.play().catch(e => console.log('Audio play failed', e));
    } catch (e) {
      console.log('Audio not supported', e);
    }
  };

  const toggleCopilot = () => {
    playSound(!isOpen ? 'open' : 'close');
    setIsOpen(!isOpen);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    playSound('send');
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    
    setTimeout(() => {
      playSound('receive');
      setMessages(prev => [...prev, { role: 'assistant', content: 'Analyzing your request through DRISHTIQ™ intelligence...' }]);
    }, 1500);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={toggleCopilot}
        className={cn(
          "fixed bottom-6 right-6 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-primary p-2 text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          isOpen && "rotate-90 scale-0 opacity-0 pointer-events-none"
        )}
      >
        <img src="/logos/drishti_logo2.png" alt="DRISHTIQ Logo" className="h-9 w-9 object-contain" />
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-[100] flex w-[90vw] flex-col overflow-hidden rounded-2xl border border-border/50 bg-background/95 shadow-2xl backdrop-blur-xl transition-all duration-300 sm:w-[400px]",
          isOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-12 opacity-0 scale-95 pointer-events-none"
        )}
        style={{ height: '600px', maxHeight: 'calc(100vh - 48px)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/50 bg-muted/30 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 p-1">
              <img src="/logos/drishtiq_logo1.png" alt="DRISHTIQ Logo" className="h-7 w-7 object-contain" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground tracking-tight">DRISHTIQ™ Copilot</h3>
              <p className="text-xs text-muted-foreground font-medium">Enterprise AI Assistant</p>
            </div>
          </div>
          <button
            onClick={toggleCopilot}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/10">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "flex w-max max-w-[85%] flex-col gap-2 rounded-2xl px-4 py-2.5 text-sm shadow-sm",
                msg.role === 'user' 
                  ? "ml-auto bg-primary text-primary-foreground rounded-br-sm"
                  : "bg-background border border-border/50 text-foreground rounded-bl-sm"
              )}
            >
              {msg.content}
            </div>
          ))}
        </div>

        {/* Input area */}
        <div className="border-t border-border/50 p-4 bg-background">
          <form onSubmit={handleSend} className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Copilot anything..."
              className="flex-1 rounded-full border border-input bg-muted/50 px-4 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:bg-background"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
          <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] font-medium text-muted-foreground">
            <Sparkles className="h-3 w-3" />
            Secure AI Intelligence Platform
          </div>
        </div>
      </div>
    </>
  );
}
