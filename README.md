# Happy Thoughts 💌  
**Week 1 – React state & forms**

This project is the first version of the Happy Thoughts messaging app, built with React.  
The focus this week was on learning how to use state, handle form inputs, and update the UI dynamically based on user interaction.

The app allows users to write happy thoughts and display them instantly as message cards.

---

## 🚀 Live demo
https://mikaela-js-project-happy-thoughts.netlify.app/

---

## 🧠 What I learned

- What state is and why it’s needed in React
- How to use the `useState` hook
- How to connect form inputs to state
- How to handle form submission in React
- How to conditionally render UI based on state
- How to structure components in a React app
- Basic animations using styled-components

---

## 🛠️ Tech stack

- React
- JavaScript (ES6)
- Styled Components
- HTML & CSS

---

## 📦 Features

### Core features
- Text area for writing a happy thought
- Submit button to post the message
- Messages appear instantly as message cards
- Form clears after submission
- Messages are shown with newest at the top
- Each message displays:
  - text content
  - number of likes
  - time since posted

### Form validation
- Minimum 5 characters
- Maximum 140 characters
- Submit disabled if validation fails
- Live character counter below the input

### UI & UX
- Hard “elevated” card design
- Smooth animation when a new message appears
- Responsive layout (mobile → desktop)
- Like button changes color when clicked
- Likes increase on every click

---

## 🧩 Component structure (REDO THIS)

<!-- - `App`
  - Holds messages state
- `FormSection`
  - Handles user input and submission
- `MessageSection`
  - Renders the list of messages
- `MessageCard`
  - Displays individual messages
- `InputField`, `Button`, `BodyText`
  - Reusable UI components -->


---

## 🔮 Stretch goals completed

- Character counter with min/max validation
- Visual feedback for invalid input
- Animation when new messages are added
- Persistent button state for likes (per message)

---

## ✨ Summary

This project introduced the fundamentals of React by focusing on state management, controlled form inputs, and dynamic rendering. It laid the foundation for adding APIs and side effects in later weeks.