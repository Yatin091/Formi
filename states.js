const states = {
    INIT: {
        message: "Hi! Welcome to Barbeque Nation. How can I help you?",
        next: (input) => {
          const lowerInput = input.toLowerCase();
          if (lowerInput.includes("book") || lowerInput.includes("table") || lowerInput.includes("reservation")) 
            return "BOOKING_PHONE";
          if (lowerInput.includes("menu")) 
            return "MENU";
          if (lowerInput.includes("faq") || lowerInput.includes("question") || lowerInput.includes("hours") || lowerInput.includes("location")) 
            return "FAQ";
          
          // Fallback: better default to FAQ rather than jumping straight to booking
          return "FAQ";
        }
      },      
    FAQ: {
      message: "Hi! Welcome to Barbeque Nation. How can I help you?",
      next: (input) => {
        const lowerInput = input.toLowerCase();
        if (lowerInput.includes("book") || lowerInput.includes("table") || lowerInput.includes("reservation"))
          return "BOOKING_PHONE";
        if (lowerInput.includes("menu"))
          return "MENU";
        if (lowerInput.includes("thank") || lowerInput.includes("bye"))
          return "END";
        // Continue answering questions
        return "FAQ";
      }
    },
    
    MENU: {
      message: "Our menu includes grill buffet with unlimited starters, main course, and desserts. We have veg and non-veg options. Would you like to book a table to try our delicious menu?",
      next: (input) => {
        const lowerInput = input.toLowerCase();
        if (lowerInput.includes("yes") || lowerInput.includes("book") || lowerInput.includes("sure"))
          return "BOOKING_PHONE";
        return "END";
      }
    },
  
    BOOKING_PHONE: {
      message: "Great! Can I have your phone number?",
      next: () => "BOOKING_DATE"
    },
  
    BOOKING_DATE: {
      message: "What date would you like to book for? (e.g., 2025-05-15)",
      next: () => "BOOKING_TIME"
    },
  
    BOOKING_TIME: {
      message: "What time would you prefer? (e.g., 19:30)",
      next: () => "BOOKING_GUESTS"
    },
  
    BOOKING_GUESTS: {
      message: "How many guests will be attending?",
      next: () => "BOOKING_NAME"
    },
  
    BOOKING_NAME: {
      message: "Lastly, may I have your name?",
      next: () => "END"
    },
  
    END: {
      message: "Thank you! Your request has been processed. Is there anything else I can help you with today?",
      next: (input) => {
        const lowerInput = input.toLowerCase();
        if (lowerInput.includes("yes") || lowerInput.includes("help") || lowerInput.includes("another"))
          return "INIT";
        return "GOODBYE";
      }
    },
    
    GOODBYE: {
      message: "Thank you for choosing Barbeque Nation! We look forward to serving you. Have a great day! 😊",
      next: () => "INIT" // Reset to INIT if user continues conversation
    }
  };
  
  module.exports = states;