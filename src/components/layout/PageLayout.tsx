import React, { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

import config from './config';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';

import { useIsMobile } from '@/hooks/use-mobile';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import './App.css';

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  const isMobile = useIsMobile();
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false);

  // Toggle function to open/close chatbot
  const toggleChatbot = () => {
    setIsChatbotOpen((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {!isMobile && <Sidebar />}
      
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">{children}</main>
      </div>

      {/* Chatbot toggle button */}
      <button
        className="chatbot-toggle-button fixed bottom-4 right-4 z-50 p-4 bg-blue-500 text-white rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
        onClick={toggleChatbot}
        aria-label={isChatbotOpen ? 'Close Chatbot' : 'Open Chatbot'}
      >
        {isChatbotOpen ? (
          <span role="img" aria-label="close-chatbot">
            ❌
          </span>
        ) : (
          <span role="img" aria-label="open-chatbot">
            💬
          </span>
        )}
      </button>

      {/* Conditionally render the chatbot with dynamic class */}
      <div
        className={`chatbot-container ${isChatbotOpen ? 'open' : 'closed'}`}
      >
        {isChatbotOpen && (
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        )}
      </div>
    </div>
  );
};

export default PageLayout;
