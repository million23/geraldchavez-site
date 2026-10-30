export type CurtainPhase = "idle" | "in" | "hold" | "out";

export const CURTAIN_FADE_MS = 200;
export const CURTAIN_HOLD_MS = 500;

export function sleep(ms: number) {
	return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

function normalizePath(pathname: string) {
	if (pathname.length > 1 && pathname.endsWith("/")) {
		return pathname.slice(0, -1);
	}
	return pathname || "/";
}

export function shouldPlayCurtain(
	fromPath: string,
	toPath: string,
	reduceMotion: boolean,
) {
	if (reduceMotion) return false;
	return normalizePath(fromPath) !== normalizePath(toPath);
}

export async function waitTwoFrames() {
	await new Promise<void>((resolve) =>
		requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
	);
}
