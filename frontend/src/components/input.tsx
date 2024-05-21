import { cn } from "@/utils/cn";

export const Input = ({ handleChange, className, title, ...props }) => {
  return (
    <>
      <p className="text-white text-base mb-2.5 mt-5">{title}</p>
      <input
        onChange={handleChange}
        placeholder={title}
        className={cn(
          "text-white bg-slate-500 h-[40px] px-2.5 w-full border border-white rounded-lg",
          className
        )}
        {...props}
      />{" "}
    </>
  );
};
