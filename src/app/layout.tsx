import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";
import { AuthProvider } from "@/context/AuthContext";
import AuthWrapper from "@/components/AuthWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MTG Commander Tracker",
  description: "Track your Magic: The Gathering Commander matches",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-100">
          <AuthProvider>
            <AuthWrapper>
              <Nav />
              <main className="container mx-auto px-4 py-8">{children}</main>
            </AuthWrapper>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
