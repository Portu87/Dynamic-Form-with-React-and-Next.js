import { cn } from "@/libs/utils";

interface ContainerInterface {
  children: React.ReactNode;
  bg?: boolean;
  className?: string;
}

const Container: React.FC<ContainerInterface> = ({
  children,
  bg,
  className,
}) => {
  return (
    <div
      className={cn(
        "max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 space-y-4",
        bg ? "bg-neutral-200" : "",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
