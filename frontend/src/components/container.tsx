import { cn } from "@/utils/cn";

export const Container = ({ children, className }) => {
  return (
    <section
      className={cn(
        "flex flex-col max-w-[1200px] my-[100px] mx-auto w-[90%]",
        className
      )}
    >
      {children}
    </section>
  );
};
