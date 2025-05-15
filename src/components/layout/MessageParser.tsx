// src/MessageParser.ts

type ActionProviderType = {
  handleListProjects: () => void;
  handleProjectReport: (projectName: string) => void;
};

class MessageParser {
  actionProvider: ActionProviderType;

  constructor(actionProvider: ActionProviderType) {
    this.actionProvider = actionProvider;
  }

  parse(message: string) {
    const lower = message.toLowerCase();

    if (lower.includes("list")) {
      this.actionProvider.handleListProjects();
    } else if (lower.includes("report")) {
      const match = message.match(/report.*?(project\s\w+)/i);
      const projectName = match ? match[1] : "your project";
      this.actionProvider.handleProjectReport(projectName);
    }
  }
}

export default MessageParser
