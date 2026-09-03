import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StudyBoard Dummy",
  description: "2주차 실습용 더미 웹사이트",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
