import "../styles/globals.css";
import Navbar from "@components/Navbar";

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
      <body>
        <div className="main"></div>
        <main className="app">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
