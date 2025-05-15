import { supabase } from '@/lib/supabase'; // Import your Supabase client

class ActionProvider {
  createChatBotMessage;
  setState;
  createClientMessage;

  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  // Handle "List Projects" with dynamic fetch from Supabase
  handleListProjects = async () => {
    try {
      // Fetch project names from the 'projects' table in Supabase
      const { data, error } = await supabase
        .from('projects')
        .select('name'); // Select only the project names

      if (error) throw error;

      // Map through the fetched data to get an array of project names
      const projectNames = data.map((project) => project.name).join(', ');

      // Create the messages to send back to the user
      const message1 = this.createChatBotMessage(
        `Here is the list of your projects: ${projectNames}`
      );
      const message2 = this.createChatBotMessage(
        "Would you like to see reports for any project?"
      );

      // Set the state with the new messages
      this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, message1, message2],
      }));
    } catch (error) {
      // Handle any errors that occur during the fetch
      const errorMessage = this.createChatBotMessage(
        "Sorry, there was an issue fetching your projects. Please try again later."
      );
      this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, errorMessage],
      }));
    }
  };

  // Handle "Show Reports" with dynamic fetch from Supabase
  handleShowReports = async (projectName) => {
    try {
      // Fetch reports related to the selected project from the 'reports' table
      const { data, error } = await supabase
        .from('reports')
        .select('title, description')
        .eq('project_name', projectName); // Filter reports by project name

      if (error) throw error;

      // Map through the fetched data to get an array of report titles and descriptions
      const reportDetails = data
        .map(
          (report) =>
            `Title: ${report.title}\nDescription: ${report.description}`
        )
        .join('\n\n');

      // Create the messages to send back to the user
      const message1 = this.createChatBotMessage(
        `Here are the reports for the project "${projectName}":\n\n${reportDetails}`
      );
      const message2 = this.createChatBotMessage(
        "Would you like to see the schedule for these reports?"
      );

      // Set the state with the new messages
      this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, message1, message2],
      }));
    } catch (error) {
      // Handle any errors that occur during the fetch
      const errorMessage = this.createChatBotMessage(
        "Sorry, there was an issue fetching the reports. Please try again later."
      );
      this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, errorMessage],
      }));
    }
  };

  // Handle "Show Schedule"
  handleShowSchedule = () => {
    const message1 = this.createChatBotMessage(
      "Here is your schedule: Monday - Meeting, Tuesday - Deadline, Wednesday - Review."
    );
    const message2 = this.createChatBotMessage(
      "Would you like me to update your schedule?"
    );
    
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message1, message2],
    }));
  };
}

export default ActionProvider;
