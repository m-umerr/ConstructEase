import { createChatBotMessage } from 'react-chatbot-kit';
import React from 'react';

const config = {
  initialMessages: [
    createChatBotMessage(
      "Hi! How can I help you with your projects today? Here are some services I can provide:",
      {
        widget: "serviceOptions", // First widget to show the service options
      }
    ),
  ],
  botName: "ProjectBot",
  widgets: [
    {
      widgetName: "serviceOptions",
      widgetFunc: (props) => {
        return (
          <div>
            <p>Select a service:</p>
            <button onClick={() => props.actionProvider.handleListProjects()}>1: List Projects</button><br></br>
            <button onClick={() => props.actionProvider.handleShowReports()}> 2: List Resources</button><br></br>
            <button onClick={() => props.actionProvider.handleShowSchedule()}>3: Show Schedule</button><br></br>
          </div>
        );
      },
    },
  ],
};

export default config;
