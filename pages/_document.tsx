
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="dark">
      <Head />
      <body className="bg-[#0f1117] text-white transition-colors duration-500">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
