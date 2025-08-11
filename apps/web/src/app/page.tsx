import Image from "next/image";
import { createSsrApi } from "./_trpc/ssrClient";

export default async function Home() {
  const api = await createSsrApi();
  const data = await api.hello();

  const img1 = await api.generateImage({ 
    width: 400, 
    height: 200,
    text: "Metro Dojo",
    fontSize: 32,
    textColor: "blue",
    backgroundColor: "lightgray"
  });
  const imgSrc1 = `data:image/png;base64,${Buffer.from(img1).toString("base64")}`;

  const img2 = await api.generateImage({ 
    width: 300, 
    height: 150,
    text: "Dynamic Text",
    fontSize: 24,
    textColor: "red",
    backgroundColor: "yellow",
    x: 150,
    y: 75
  });
  const imgSrc2 = `data:image/png;base64,${Buffer.from(img2).toString("base64")}`;

  const img3 = await api.generateImage({ 
    width: 400, 
    height: 200,
    text: "With Image",
    fontSize: 20,
    textColor: "white",
    backgroundColor: "darkblue",
    embedImage: true
  });
  const imgSrc3 = `data:image/png;base64,${Buffer.from(img3).toString("base64")}`;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white p-8">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem] mb-12">
        Metro Dojo
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="text-center">
          <h2 className="text-xl mb-4">Generated Image 1</h2>
          <Image src={imgSrc1} alt="Metro Dojo" width={400} height={200} />
        </div>
        <div className="text-center">
          <h2 className="text-xl mb-4">Generated Image 2</h2>
          <Image src={imgSrc2} alt="Dynamic Text" width={300} height={150} />
        </div>
        <div className="text-center">
          <h2 className="text-xl mb-4">With Embedded Image</h2>
          <Image src={imgSrc3} alt="With Image" width={400} height={200} />
        </div>
      </div>
      <div className="text-2xl">
        <p>Message from API: {data}</p>
      </div>
    </main>
  );
}
