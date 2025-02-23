interface resetProps {
	resetErrorBoundary: () => void;
}

export function ErrorFallback({ resetErrorBoundary }: resetProps) {
	return (
		<div role="alert" className="flex flex-col justify-center items-center ">
			<p className="text-2xl text-primary">Oops! Something went wrong:</p>
			<button onClick={resetErrorBoundary}>Try Again</button>
		</div>
	);
}
