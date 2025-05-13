# Barbeque Nation Booking Chatbot
A smart conversational assistant designed for Barbeque Nation that helps customers inquire about restaurant timings, menu options, FAQs, and book a table—while also logging all completed bookings to a Google Sheet for post-call analytics.

## Here is my GoogleSheet Link: 
    🔗 https://docs.google.com/spreadsheets/d/13loSkZK11WDgAcMld1680vOLXoU8RM2FbyBiNrxlRRY/edit?usp=sharing

    
## 🚀 Features:

      🤖 Conversational flow using state machine logic

      📅 Table booking with guest details, date, time, and name

      🗂️ Integrated knowledge base for FAQs and menu inquiries

      ✅ Google Sheet integration for logging booking summaries

      💬 Chat UI using TailwindCSS and vanilla JavaScript

      🧠 Context-aware memory for capturing and structuring booking data

## 📦 Project Structure:

      server.js – Express server, routes for state machine & Google Sheets logging

      googleSheetsService.js – Service for Google Sheets API

      states.js – Conversation logic and state transitions

      knowledgeBase.js – Answers to FAQ and menu questions

      public/index.html – Interactive chat interface

      credentials.json – Google API credentials for Sheets access (not shared publicly)

## 🧠 Knowledge Base Highlights:

      Menu options for veg and non-veg

      Drinks and desserts available

      Special dietary options (Jain, Halal)

      Outlet timings and amenities

      Branch-specific data (e.g., JP Nagar, Bangalore)

## 📄 Sources:

      Menu: Menu List _ Barbeque Nation.pdf

      FAQs: Menu and Drinks _ Barbeque Nation.pdf

      Branch Info: Bangalore _ JP Nagar _ Barbeque Nation.pdf

## ✅ Post-Call Configuration:

      After the conversation reaches the final booking state:

      Booking details + full chat summary are posted to /api/log

      Backend appends structured data to a Google Sheet

      Includes Modality, Phone, Name, Guests, Summary, and Call Time

## 🛠️ Tech Stack:

      Node.js & Express (v23.11.0)

      HTML, CSS (Tailwind), JavaScript

      Google Sheets API

      PDF-based knowledge base integration
