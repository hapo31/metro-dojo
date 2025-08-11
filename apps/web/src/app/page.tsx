import Image from "next/image";
import { createSsrApi } from "./_trpc/ssrClient";

export default async function Home() {
  const api = await createSsrApi();
  const data = await api.hello();

  const img = await api.generateImage({ width: 400, height: 400 });
  const imgSrc = `data:image/png;base64,${Buffer.from(img).toString("base64")}`;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white p-8">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem] mb-12">
        Metro Dojo
      </h1>
      <Image src={imgSrc} alt="test" width={400} height={400} />
      <div className="text-2xl">
        <p>Message from API: {data}</p>
      </div>
    </main>
  );
}
