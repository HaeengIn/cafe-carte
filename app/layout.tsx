import Navbar from "./Navbar";
import ScrollAnimation from "./ScrollAnimation";
import type { ReactNode } from "react";
import "./reset.css";
import "./global.css";

export default function App({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <Navbar />
        <ScrollAnimation />
        <main>{children}</main>
      </body>
    </html>
  );
}
