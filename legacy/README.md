# ScholarCatalyst
# EdTech Scholarship Portal

Welcome to the **ScholarCatalyst**, an innovative platform inspired by websites like Buddy4Study. This portal aims to bridge the gap between students seeking scholarships and organizations offering them. Additionally, it provides tools for students to estimate their expenses and manage their educational finances efficiently.

---

## 🚀 Features

### **User Panels**

#### **1. Student Panel:**
- **Sign Up & Sign In**: Secure login and registration system for students.
- **Browse Scholarships**: Access a comprehensive database of scholarships.
- **Sort & Filter**: Filter scholarships based on criteria like eligibility, amount, location, etc.
- **Expense Estimation Tool**: Calculate and manage estimated expenses for tuition, accommodation, books, etc.

#### **2. Admin Panel:**
- **Scholarship Registration**: Organizations or individuals can register and post new scholarships.
- **Management Dashboard**: Admins can review, approve, or reject scholarship entries.

---

## 🎯 Objectives

- Provide a unified platform for students to explore and apply for scholarships.
- Enable sponsors to seamlessly offer financial aid opportunities.
- Offer additional tools for students to plan their education journey financially.

---

## 🛠️ Tech Stack

### **Frontend:**
- HTML5, CSS3, JavaScript
- Framework: [React.js](https://reactjs.org/) (or any framework of choice)

### **Backend:**
- Node.js with Express.js
- Database: MongoDB (or any database of choice)

### **Authentication:**
- JWT-based authentication for secure login and registration.

### **APIs:**
- Expense Calculation API
- Scholarship Management API

---

## 🔧 Installation and Setup

### **Prerequisites:**
- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) set up locally or via cloud
- Git

### **Steps to Set Up the Project:**

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/edtech-scholarship-portal.git
   cd edtech-scholarship-portal
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

4. **Run the Application:**
   ```bash
   npm start
   ```
   Access the app at `http://localhost:5000`.

---

## 📂 Project Structure

```
.
├── public
├── src
│   ├── components
│   ├── pages
│   ├── services
│   ├── utils
│   └── styles
├── backend
│   ├── models
│   ├── routes
│   ├── controllers
│   └── middlewares
├── .env
├── .gitignore
├── README.md
├── package.json
└── server.js
```

---

## 🚧 Roadmap

- [ ] Build the core Student Panel functionalities.
- [ ] Develop Admin Panel with authentication and role-based access.
- [ ] Implement sorting and filtering for scholarships.
- [ ] Add expense estimation tool with dynamic calculations.
- [ ] Optimize the website for responsiveness and accessibility.
- [ ] Integrate real-time notifications for new scholarships.

---

## 🤝 Contributing

We welcome contributions to make this platform better! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a Pull Request.

---

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 📧 Contact

For any inquiries or feedback, please contact:
- **Name**: Rishiraj Debnath
- **Email**: your-email@example.com

---

## ⭐ Acknowledgments

- Inspiration: Buddy4Study
- Technologies: React.js, Node.js, MongoDB
