# Whisper Box

**Whisper Box** is a Next.js application that enables users to send and receive anonymous messages. With a focus on privacy and simplicity, this application provides a secure and anonymous messaging platform with OTP-based email verification for user authentication.

## Features

- **Anonymous Messaging**: Allows users to send and receive messages without revealing their identity.
- **User Authentication**: Secure login with email/password using NextAuth.js.
- **OTP Verification**: Email-based OTP verification using Resend to ensure account security.
- **Responsive Design**: Fully responsive and optimized for both desktop and mobile devices.
- **Database Integration**: Stores user data and messages in a MongoDB database.
- **Security**: Utilizes JWT for session management and secure user authentication.

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation.
- **React Hook Form**: Form management and validation.
- **Zod**: TypeScript-first schema validation.
- **NextAuth.js**: Authentication library with credentials provider.
- **Resend**: Email service for OTP verification.
- **Tailwind CSS**: Utility-first CSS framework.
- **MongoDB**: NoSQL database.
- **bcryptjs**: Password hashing library.
- **Axios**: HTTP requests library.

## Installation

To get started with Whisper Box, follow these steps:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/Abhyuday-Dev/whisper-box.git
    ```

2. **Navigate into the project directory**:

    ```bash
    cd whisper-box
    ```

3. **Install the dependencies**:

    ```bash
    npm install
    ```

4. **Set up environment variables**:

   Create a `.env.local` file in the root directory and add the following:

    ```env
    NEXT_PUBLIC_RESEND_API_KEY=your-resend-api-key
    NEXTAUTH_SECRET=your-next-auth-secret
    MONGODB_URI=your-mongodb-connection-string
    ```

5. **Run the development server**:

    ```bash
    npm run dev
    ```

   Open `http://localhost:3000` in your browser to view the application.

## Usage

1. **Sign Up / Sign In**: Use email/password for authentication. OTP verification is required for account setup and login.
2. **Send Anonymous Messages**: Access the messaging form to send anonymous messages to other users.
3. **Receive Messages**: View received messages through your account dashboard.

## Project Structure

- `pages/`: Contains route pages.
- `components/`: Reusable React components.
- `lib/`: Utility functions and database connection.
- `models/`: Mongoose schemas and models.
- `public/`: Static assets like images and fonts.
- `styles/`: Global styles and Tailwind CSS configuration.
- `schemas/`: Zod validation schemas.
- `services/`: Email service integration with Resend.

## Contributing

We welcome contributions to the project! To contribute:

1. **Fork the repository**.
2. **Create a new branch**: `git checkout -b feature/your-feature`.
3. **Make your changes**.
4. **Commit your changes**: `git commit -am 'Add new feature'`.
5. **Push to your branch**: `git push origin feature/your-feature`.
6. **Create a Pull Request**.

Please follow coding guidelines and add tests for new features.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [NextAuth.js](https://next-auth.js.org/)
- [Resend](https://resend.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- [Axios](https://axios-http.com/)
