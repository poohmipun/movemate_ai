# MoveMateAI

MoveMateAI is your ultimate fitness companion powered by artificial intelligence. With its intuitive interface, real-time feedback, and personalized guidance, MoveMateAI empowers users to unlock their full potential and elevate their fitness journey.

## Getting Started

To run the project locally, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/poohmipun/movemate_ai.git
   cd movemate_ai
   ```

2. **Install Dependencies**
   Ensure you have Node.js version **20.8.1** installed, then run:
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

For optimal performance, it is recommended to use the specified versions of the following dependencies:

- **@p5-wrapper/react (4.3.4)**: A React wrapper for p5.js.
- **@tensorflow-models/pose-detection (2.1.3)**: Pose detection library.
- **@tensorflow/tfjs-backend-webgl (4.17.0)**: WebGL backend for TensorFlow.js.
- **axios (1.6.8)**: A promise-based HTTP client for the browser and Node.js.
- **flowbite-react (0.7.5)**: Tailwind CSS components for React.
- **mongodb (6.5.0)**: MongoDB Node.js driver.
- **mongoose (8.2.4)**: MongoDB ODM.
- **next (14.0.4)**: Next.js framework.
- **next-cloudinary (6.3.0)**: Cloudinary integration for Next.js.
- **p5 (1.9.1)**: A JavaScript library for creative coding.
- **react (18)**: A JavaScript library for building user interfaces.
- **react-dom (18)**: Entry point of the DOM renderer for React.
- **uuid (9.0.1)**: A simple, fast generation of RFC4122 UUIDs.

## Dev Dependencies

- **@types/node (20.12.2)**: TypeScript definitions for Node.js.
- **@types/react (18.2.73)**: TypeScript definitions for React.
- **autoprefixer (10.0.1)**: Adds vendor prefixes to CSS rules.
- **postcss (8)**: A tool for transforming CSS with JavaScript.
- **tailwindcss (3.3.0)**: A utility-first CSS framework.
- **typescript (5.4.3)**: TypeScript compiler.
