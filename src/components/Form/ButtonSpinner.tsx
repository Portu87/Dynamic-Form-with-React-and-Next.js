"use client";
import { cn } from "@/libs/utils";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { FaSpinner } from "react-icons/fa";
interface Props {
  type: "submit" | "button";
  className: string;
  text?: string;
  onClick?: () => void;
  isPending?: boolean;
  icon?: React.ReactNode;
}
const ButtonSpinner = ({
  text = "",
  className = "",
  type,
  onClick,
  isPending,
  icon,
}: Props) => {
  const { pending } = useFormStatus();
  const loading = pending || isPending;
 
  return (
    <button
      type={type}
      disabled={loading}
      onClick={type !== "submit" ? onClick : undefined}
      className={cn(
        "p-2 min-w-full border-none rounded-md grid place-items-center h-full",
        className
      )}
    >
      {loading ? (
        <span className="block animate-spin">
          <FaSpinner className="transform rotate-90" />
        </span>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {text}
        </>
      )}
    </button>
  );
};

export default ButtonSpinner;
