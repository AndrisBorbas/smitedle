export function Loading() {
	return (
		<div className="text-glow animate-pulse text-2xl">
			Loading
			<span className="inline-block animate-bounce">.</span>
			<span className="-anim-delay-666 inline-block animate-bounce">.</span>
			<span className="-anim-delay-333 inline-block animate-bounce">.</span>
		</div>
	);
}
