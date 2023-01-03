import { FormEvent, useEffect, useState } from "react";
import Head from "next/head";
import { Field, Button } from "../components/forms";

const EIP1193 = () => (
  <>
    <Head>
      <title>EIP-1193 - Crypto experiments</title>
      <meta name="description" content="EIP-1193" />
    </Head>
    <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
      <div className="px-4 py-8 sm:px-0">
        <header>
          <h1 className="text-3xl font-semibold space-y-3">EIP-1193</h1>
        </header>
        <main className="pt-10">
          <div className="bg-white p-8 shadow rounded-lg md:grid md:grid-cols-4 md:gap-6">
          </div>
        </main>
      </div>
    </div>
  </>
);

export default EIP1193;
