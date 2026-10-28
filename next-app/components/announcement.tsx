import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { FiInfo } from "react-icons/fi";

interface AnnoucementBannerProps {
	children?: React.ReactNode | React.ReactNode[];
	className?: string;
}

const AnnoucementBanner = ({ children, className }: AnnoucementBannerProps) => {
	return (
		<Alert className={className ?? ""}>
			<FiInfo className="h-5 w-5" />
			<AlertTitle>Announcement</AlertTitle>
			<AlertDescription>{children}</AlertDescription>
		</Alert>
	);
};

export default AnnoucementBanner;
