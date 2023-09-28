import { cn } from "@/libs/utils";

/**
 * FlexContainer component for flexible layout.
 * @param {object} props - The props for the FlexContainer component.
 * @param {JSX.Element | JSX.Element[] | React.ReactNode} props.children - The content to be rendered inside the flex container.
 * @param {string} props.className - Optional. Additional CSS classes to be applied to the flex container.
 * @param {boolean} props.row - Optional. If true, arranges children in a row direction, otherwise in a column direction.
 * @param {boolean} props.start - Optional. Aligns children to the start of the main axis.
 * @param {boolean} props.center - Optional. Aligns children to the center of the main axis.
 * @param {boolean} props.end - Optional. Aligns children to the end of the main axis.
 * @param {boolean} props.between - Optional. Justifies content evenly between children on the main axis.
 * @param {boolean} props.fullHeight - Optional. Sets the flex container to full height.
 * @returns {React.FC} - A React functional component representing the flexible container.
 */
export interface FlexContainerInterface {
  children: JSX.Element | JSX.Element[] | React.ReactNode;
  className?: string;
  row?: boolean;
  start?: boolean;
  center?: boolean;
  end?: boolean;
  between?: boolean;
  fullHeight?: boolean;
}

const FlexContainer: React.FC<FlexContainerInterface> = ({
  children,
  className,
  row,
  start,
  center,
  end,
  between,
  fullHeight,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col ",
        start && "justify-start",
        center && "justify-center",
        end && "justify-end",
        between && "justify-between",
        row ? "md2:flex-row" : "",
        fullHeight ? "h-screen" : "",
        className
      )}
    >
      {children}
    </div>
  );
};

export default FlexContainer;
