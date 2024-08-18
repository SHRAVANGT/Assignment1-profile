import "./../globals.css";
import { Nav } from "./../../nav/Nav";
import { TooltipProvider } from "./../../components/tooltip";

export default async function StoreLayout({ children, modal }) {
  return (
    <>
      <Nav />
      <TooltipProvider>
        <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-6 pt-6 sm:px-6 lg:px-8">
          {children}
          {modal}
        </main>
      </TooltipProvider>
    </>
  );
}
