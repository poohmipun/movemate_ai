import "../styles/globals.css";
import { ProgramProvider } from "./context/ProgramContext";

export const metadata = {
  title: "MoveMate AI",
  description: "Virtual Personal Fitness Trainer Web application",
  icons: {
    icon: "/icon.png",
  },
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ProgramProvider>
          <div className="main"></div>
          <main className="app">{children}</main>
        </ProgramProvider>
      </body>
    </html>
  );
};

export default RootLayout;
