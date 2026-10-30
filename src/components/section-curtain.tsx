import { motion, useReducedMotion } from "motion/react";
import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useMemo,
	useRef,
	useState,
} from "react";
import {
	CURTAIN_FADE_MS,
	CURTAIN_HOLD_MS,
	type CurtainPhase,
	shouldPlayCurtain,
	sleep,
	waitTwoFrames,
} from "#/lib/section-curtain";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

interface RunCurtainArgs {
	fromPath: string;
	toPath: string;
	navigate: () => Promise<unknown> | unknown;
}

interface CurtainContextValue {
	phase: CurtainPhase;
	runSectionCurtain: (args: RunCurtainArgs) => Promise<void>;
}

const CurtainContext = createContext<CurtainContextValue | null>(null);

export function useSectionCurtain() {
	const value = useContext(CurtainContext);
	if (!value) {
		throw new Error("useSectionCurtain needs SectionCurtainProvider");
	}
	return value;
}

function CurtainOverlay({ phase }: { phase: CurtainPhase }) {
	if (phase === "idle") return null;

	return (
		<motion.div
			aria-hidden="true"
			className="fixed inset-0 z-[60] flex items-center justify-center bg-background"
			initial={{
				opacity: phase === "hold" ? 1 : 0,
				translateY: phase === "hold" ? 0 : 10,
			}}
			animate={{
				opacity: phase === "out" ? 0 : 1,
				translateY: phase === "out" ? -10 : 0,
			}}
			transition={{ duration: CURTAIN_FADE_MS / 1000, ease: EASE_OUT }}
		>
			<img src="/logo.png" alt="" className="size-24 object-contain" />
		</motion.div>
	);
}

export function SectionCurtainProvider({ children }: { children: ReactNode }) {
	const reduceMotion = useReducedMotion();
	const [phase, setPhase] = useState<CurtainPhase>("idle");
	const queueRef = useRef(Promise.resolve());

	const runSectionCurtain = useCallback(
		(args: RunCurtainArgs) => {
			const task = queueRef.current.then(
				() => runFlow(args),
				() => runFlow(args),
			);
			queueRef.current = task.then(
				() => undefined,
				() => undefined,
			);
			return task;

			async function runFlow({ fromPath, toPath, navigate }: RunCurtainArgs) {
				if (!shouldPlayCurtain(fromPath, toPath, Boolean(reduceMotion))) {
					await navigate();
					return;
				}

				setPhase("in");
				await waitTwoFrames();
				await sleep(CURTAIN_FADE_MS);
				setPhase("hold");
				try {
					await navigate();
					await sleep(CURTAIN_HOLD_MS);
				} finally {
					setPhase("out");
					await sleep(CURTAIN_FADE_MS);
					setPhase("idle");
				}
			}
		},
		[reduceMotion],
	);

	const value = useMemo(
		() => ({ phase, runSectionCurtain }),
		[phase, runSectionCurtain],
	);

	return (
		<CurtainContext.Provider value={value}>
			{children}
			<CurtainOverlay phase={phase} />
		</CurtainContext.Provider>
	);
}
