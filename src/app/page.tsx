import ChatWindow from '@/components/ChatWindow';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function Home() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-0 sm:p-4 transition-colors duration-300 relative"
      style={{ 
        background: 'linear-gradient(to bottom right, var(--background), var(--chat-bg))'
      }}
    >
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Chat Window */}
      <div className="w-full h-screen sm:h-auto sm:max-w-lg relative z-10">
        <ChatWindow />
      </div>
    </div>
  );
}