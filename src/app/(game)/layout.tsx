type IndexLayoutProps = {
	children: React.ReactNode;
};

export default function IndexLayout({ children }: IndexLayoutProps) {
	return (
		<section className="mx-auto text-center">
			<h1 className="text-6xl">Smitedle</h1>
			{children}
		</section>
	);
}
