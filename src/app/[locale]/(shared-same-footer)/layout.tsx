import Footer from "@/components/footer/Footer";

export default async function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <>
         <div id="navigation-trigger" style={{ height: "80px" }} />
         {children}
         <Footer />
      </>
   );
}
