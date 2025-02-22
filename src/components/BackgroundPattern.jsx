export const BackgroundPattern = () => {
	return (
		<div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
			{/* Grid Pattern */}
			<div className="absolute inset-0 opacity-10">
				<div className="h-full w-full bg-[linear-gradient(to_right,#6366f1_1px,transparent_1px),linear-gradient(to_bottom,#6366f1_1px,transparent_1px)] bg-[size:60px_60px]" />
			</div>

			{/* Accent Shapes */}
			<div className="absolute -top-16 -left-16 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-10 " />
			<div className="absolute top-10 -right-16 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-10  delay-1500" />
			<div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-2xl opacity-10  delay-3000" />

			{/* Icons */}
			<div className="absolute inset-0 opacity-50 flex items-center justify-center">
				<div className="absolute top-20 -left-2 md:left-0 lg:left-20 text-blue-400 text-6xl transform rotate-12 opacity-60  delay-1000">&#x2714;</div>
				<div className="absolute bottom-20 -left-5 md:left-0 lg:left-20 text-blue-400 text-6xl transform rotate-12 opacity-60  delay-1000">&#x1F4DD;</div>
				<div className="absolute bottom-32 -right-4 md:-right-5 lg:right-20 text-purple-400 text-6xl transform -rotate-6 opacity-60  delay-2000">&#x231B;</div>
				<div className="absolute top-40 -right-2 md:-right-2 lg:right-10 text-indigo-400 text-6xl transform rotate-3 opacity-60  delay-3000">&#x1F4C4;</div>
			</div>
		</div>
	)
};