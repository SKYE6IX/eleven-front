import Footer from "@/components/footer/Footer";

export default async function Layout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <>
         {children}
         <Footer />
      </>
   );
}
