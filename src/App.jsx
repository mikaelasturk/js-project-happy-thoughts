import { useEffect, useState } from "react";
import { 
  fetchMessages, 
  createMessage, 
  likeMessage 
} from "./data/api/api";
import { ThemeProvider } from "styled-components";
import { theme, GlobalStyle } from "./styles/styles";
import { BodyWrapper } from "./components/layout/layout";
import {
  HeroSection,
  FormSection,
  MessageSection,
  ContactSection,
} from "./components/sections/sections";

export const App = () => {
  //Store current messages in state
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true)

  // Fetch messages on mount
  useEffect(() => {
    setLoading(true)
    fetchMessages()
      .then((data) => {
        // Map API response shape to the shape used by MessageCard component
        const mapped = data.map((item) => ({
          id: item._id,
          text: item.message,
          createdAt: item.createdAt,
          likes: item.hearts,
          liked: false,
        }));

        setMessages(mapped);
      })
      .catch((error) => {
        // Handle error during initial load
        console.error("Failed to fetch messages:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  // Create a new message in the API
  const addMessage = async (text) => {
    try {
      const data = await createMessage(text);

      const newMessage = {
        id: data._id,
        text: data.message,
        createdAt: data.createdAt,
        likes: data.hearts,
        liked: false,
      };

      // New messages appear at the top
      setMessages((previousMessages) => [newMessage, ...previousMessages]);
    } catch (error) {
       // Handle error during message creation
      console.error("Failed to create message:", error);
    }
  };

  // Send a like to the API and update the liked message in state
  const addLike = async (id) => {
    try {
      const updated = await likeMessage(id);

      setMessages((messages) =>
        messages.map((message) =>
          message.id === id
            ? { ...message, likes: updated.hearts, liked: true }
            : message
        )
      );
    } catch (error) {
      // Handle error during liking a message
      console.error("Failed to like message:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BodyWrapper>
        <header>
          <HeroSection />
        </header>

        <main>
            {/* SubmitButton triggers addMessage, which posts to API and updates state */}
          <FormSection 
            variant="input" 
            onFormSubmit={addMessage} 
          />
          {/*  LikeButton triggers addLike, which sends new like to API and updates state */}
          <MessageSection
            variant="message"
            messages={messages}
            onLike={addLike}
            isLoading={loading}
          />
        </main>

        <footer>
          <ContactSection />
        </footer>
      </BodyWrapper>
    </ThemeProvider>
  );
};