import useEmblaCarousel, {
	type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
	type ComponentProps,
	type KeyboardEvent,
} from "react";
import { Button } from "#/components/ui/button";
import { cn } from "#/lib/utils";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

interface CarouselProps {
	opts?: CarouselOptions;
	plugins?: CarouselPlugin;
	orientation?: "horizontal" | "vertical";
	setApi?: (api: CarouselApi) => void;
}

interface CarouselContextProps extends CarouselProps {
	carouselRef: ReturnType<typeof useEmblaCarousel>[0];
	api: ReturnType<typeof useEmblaCarousel>[1];
	scrollPrev: () => void;
	scrollNext: () => void;
	canScrollPrev: boolean;
	canScrollNext: boolean;
}

const CarouselContext = createContext<CarouselContextProps | null>(null);

function useCarousel() {
	const context = useContext(CarouselContext);
	if (!context) {
		throw new Error("useCarousel must be used within a <Carousel />");
	}
	return context;
}

function Carousel({
	orientation = "horizontal",
	opts,
	setApi,
	plugins,
	className,
	children,
	...props
}: ComponentProps<"div"> & CarouselProps) {
	const [carouselRef, api] = useEmblaCarousel(
		{
			...opts,
			axis: orientation === "horizontal" ? "x" : "y",
		},
		plugins,
	);
	const [canScrollPrev, setCanScrollPrev] = useState(false);
	const [canScrollNext, setCanScrollNext] = useState(false);

	const onSelect = useCallback((emblaApi: CarouselApi) => {
		if (!emblaApi) return;
		setCanScrollPrev(emblaApi.canScrollPrev());
		setCanScrollNext(emblaApi.canScrollNext());
	}, []);

	const scrollPrev = useCallback(() => {
		api?.scrollPrev();
	}, [api]);

	const scrollNext = useCallback(() => {
		api?.scrollNext();
	}, [api]);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLDivElement>) => {
			if (event.key === "ArrowLeft") {
				event.preventDefault();
				scrollPrev();
			} else if (event.key === "ArrowRight") {
				event.preventDefault();
				scrollNext();
			}
		},
		[scrollPrev, scrollNext],
	);

	useEffect(() => {
		if (!api || !setApi) return;
		setApi(api);
	}, [api, setApi]);

	useEffect(() => {
		if (!api) return;
		onSelect(api);
		api.on("reInit", onSelect);
		api.on("select", onSelect);
		return () => {
			api.off("select", onSelect);
		};
	}, [api, onSelect]);

	return (
		<CarouselContext.Provider
			value={{
				carouselRef,
				api,
				opts,
				orientation:
					orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
				scrollPrev,
				scrollNext,
				canScrollPrev,
				canScrollNext,
			}}
		>
			<div
				onKeyDownCapture={handleKeyDown}
				className={cn("relative", className)}
				role="region"
				aria-roledescription="carousel"
				{...props}
			>
				{children}
			</div>
		</CarouselContext.Provider>
	);
}

function CarouselContent({ className, ...props }: ComponentProps<"div">) {
	const { carouselRef, orientation } = useCarousel();

	return (
		<div ref={carouselRef} className="overflow-hidden">
			<div
				className={cn(
					"flex",
					orientation === "horizontal" ? "-ml-6" : "-mt-6 flex-col",
					className,
				)}
				{...props}
			/>
		</div>
	);
}

function CarouselItem({ className, ...props }: ComponentProps<"div">) {
	const { orientation } = useCarousel();

	return (
		<div
			role="group"
			aria-roledescription="slide"
			className={cn(
				"min-w-0 shrink-0 grow-0 basis-full",
				orientation === "horizontal" ? "pl-6" : "pt-6",
				className,
			)}
			{...props}
		/>
	);
}

function CarouselPrevious({
	className,
	variant = "secondary",
	size = "icon",
	...props
}: ComponentProps<typeof Button>) {
	const { orientation, scrollPrev, canScrollPrev } = useCarousel();

	return (
		<Button
			variant={variant}
			size={size}
			className={cn(
				"absolute",
				orientation === "horizontal"
					? "-left-12 top-1/2 -translate-y-1/2"
					: "-top-12 left-1/2 -translate-x-1/2 rotate-90",
				className,
			)}
			disabled={!canScrollPrev}
			onClick={scrollPrev}
			aria-label="Previous slide"
			{...props}
		>
			<ArrowLeft />
		</Button>
	);
}

function CarouselNext({
	className,
	variant = "secondary",
	size = "icon",
	...props
}: ComponentProps<typeof Button>) {
	const { orientation, scrollNext, canScrollNext } = useCarousel();

	return (
		<Button
			variant={variant}
			size={size}
			className={cn(
				"absolute",
				orientation === "horizontal"
					? "-right-12 top-1/2 -translate-y-1/2"
					: "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
				className,
			)}
			disabled={!canScrollNext}
			onClick={scrollNext}
			aria-label="Next slide"
			{...props}
		>
			<ArrowRight />
		</Button>
	);
}

export {
	type CarouselApi,
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
};
