# MoveMateAI

MoveMateAI is your ultimate fitness companion powered by artificial intelligence. With its intuitive interface, real-time feedback, and personalized guidance, MoveMateAI empowers users to unlock their full potential and elevate their fitness journey.

## Getting Started

To run the project locally, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone <your-repo-url>
   cd MoveMateAI
   ```

2. **Install Dependencies**
   Ensure you have Node.js installed, then run:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env.local` file in the project root directory and add your environment variables:
   ```plaintext
   MONGODB_URL=<Your MongoDB URL>
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<Your Cloudinary Cloud Name>
   CLOUDINARY_API_KEY=<Your Cloudinary API Key>
   CLOUDINARY_API_SECRET=<Your Cloudinary API Secret>
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=<Your Cloudinary Upload Preset>
   ```

4. **Run the Development Server**
   Start the development server by running:
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs code linting.

## Dependencies

- **@p5-wrapper/react**: A React wrapper for p5.js.
- **@tensorflow-models/pose-detection**: Pose detection library.
- **@tensorflow/tfjs-backend-webgl**: WebGL backend for TensorFlow.js.
- **axios**: A promise-based HTTP client for the browser and Node.js.
- **flowbite-react**: Tailwind CSS components for React.
- **mongodb**: MongoDB Node.js driver.
- **mongoose**: MongoDB ODM.
- **next**: Next.js framework.
- **next-cloudinary**: Cloudinary integration for Next.js.
- **p5**: A JavaScript library for creative coding.
- **react**: A JavaScript library for building user interfaces.
- **react-dom**: Entry point of the DOM renderer for React.
- **uuid**: A simple, fast generation of RFC4122 UUIDs.

## Dev Dependencies

- **@types/node**: TypeScript definitions for Node.js.
- **@types/react**: TypeScript definitions for React.
- **autoprefixer**: Adds vendor prefixes to CSS rules.
- **postcss**: A tool for transforming CSS with JavaScript.
- **tailwindcss**: A utility-first CSS framework.
- **typescript**: TypeScript compiler.
