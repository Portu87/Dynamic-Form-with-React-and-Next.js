import { cn } from "@/libs/utils";


export interface FlexContainerInterface {
	children: JSX.Element | JSX.Element[] | React.ReactNode;
	className?:string;
	row?:boolean;
	start?:boolean;
	center?:boolean;
	end?:boolean;
	between?:boolean;
	fullHeight?: boolean;
}

const FlexContainer: React.FC<FlexContainerInterface> = ({children, className, row , start, center, end, between, fullHeight }) => {
	return <div className={cn("flex flex-col  ",	
	start && 'justify-start',
	center && 'justify-center',
	end && 'justify-end',
	between && 'justify-between',
	row ? 'md2:flex-row' : '',
	fullHeight ? "h-screen" : "",
	className
	)}

	>{children}</div>;
};

export default FlexContainer;



