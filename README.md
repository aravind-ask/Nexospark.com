# Nexospark - Drone Manufacturing & R&D Company Website

A modern, responsive website for Nexospark, showcasing our drone manufacturing capabilities and educational programs.

## Tech Stack

- Frontend:
  - React (Vite + TypeScript)
  - TailwindCSS
  - shadcn/ui
  - Framer Motion
  - Three.js
  - Redux Toolkit

- Backend:
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - JWT Authentication

## Features

- Responsive design for all screen sizes
- Modern UI with animations and micro-interactions
- Dark mode support
- 3D drone visualization
- Interactive course catalog
- Team showcase
- Contact form
- Blog section

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nexospark.git
cd nexospark
```

2. Install dependencies:
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables:
Create `.env` files in both frontend and backend directories with the necessary environment variables.

4. Start the development servers:
```bash
# Start frontend (from project root)
npm run dev

# Start backend (from project root)
npm run server
```

## Project Structure

```
nexospark/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── store/
│   │   ├── services/
│   │   ├── utils/
│   │   └── assets/
│   └── public/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   └── utils/
│   └── config/
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.