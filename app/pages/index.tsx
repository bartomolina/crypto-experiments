import Head from "next/head";
import NewResolutionForm from "../components/new-resolution-form";

const Home = () => (
  <>
    <Head>
      <title>WAGMI - Home</title>
      <meta name="description" content="WAGMI" />
    </Head>
    <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
      <div className="px-4 py-8 sm:px-0">
        <header>
          <h1 className="text-3xl font-semibold space-y-3">
            wagmi
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
              />
            </svg>
          </h1>
        </header>
        <main className="pt-10">
          <div className="bg-white p-8 shadow rounded-lg md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-semibold text-gray-900">Connect</h3>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </>
);

export default Home;
