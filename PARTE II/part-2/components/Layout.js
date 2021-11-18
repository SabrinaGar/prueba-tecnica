import Head from "next/head";

export function Layout({ children }) {
	return (
		<main className="layout">
			<Head>
				<title>Part II | Users List</title>
			</Head>
			{children}
		</main>
	);
}
