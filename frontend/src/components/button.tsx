import { cn } from "@/utils/cn";
import Link from "next/link";

export const Button = ({ title, url, className, ...props }) => {
  return (
    <button
      className={cn(
        "text-white bg-slate-500 h-[40px] px-2.5 w-fit border border-white rounded-lg",
        className
      )}
      {...props}
    >
      {url ? <Link href={url}>{title}</Link> : title}
    </button>
  );
};
