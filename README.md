# Fraud Detection App

This project is a Fraud Detection application built with Next.js. The application allows users to input transaction details and predicts the likelihood of the transaction being fraudulent. The application also includes a dashboard for viewing past transactions and their statuses.

## Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- Node.js
- MongoDB (or use MongoDB Atlas for a cloud solution)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/fraud-detection-app.git
    cd fraud-detection-app
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Set up your environment variables:
    Create a `.env.local` file in the root of your project and add the following variables:
    ```bash
    NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your_secret_key
    ```

### Running the App

Start the development server:
```bash
npm run dev