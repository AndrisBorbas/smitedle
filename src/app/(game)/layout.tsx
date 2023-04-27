import Link from "next/link";

type IndexLayoutProps = {
	children: React.ReactNode;
};

export default function IndexLayout({ children }: IndexLayoutProps) {
	return (
		<section className="mx-auto text-center">
			<Link className="mx-auto mb-4 block w-fit p-4" href="/">
				<h1 className="text-6xl">Smitedle</h1>
			</Link>
			{children}
		</section>
	);
}
