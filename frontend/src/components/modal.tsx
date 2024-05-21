import { cn } from "@/utils/cn";

export const Modal = ({ isOpen, close, title, className, children }) => {
  return (
    <>
      <div
        className={`${
          isOpen ? "" : "opacity-0 pointer-events-none"
        } h-screen w-screen flex bg-black opacity-40 backdrop-blur-2xl fixed top-0 left-0 z-10 transition-all duration-200 ease-in-out`}
        onClick={close}
      />
      <div
        className={cn(
          `flex flex-col p-4 fixed top-1/2 left-1/2 transform -translate-x-1/2 ${
            isOpen ? "" : "opacity-0 pointer-events-none scale-95"
          } -translate-y-1/2 z-20 w-[400px] bg-slate-400 rounded-xl border border-black  transition-all duration-200 ease-in-out`,
          className
        )}
      >
        {title ? (
          <h2 className="font-medium text-white text-2xl mb-4">{title}</h2>
        ) : null}
        {children}
      </div>
    </>
  );
};
