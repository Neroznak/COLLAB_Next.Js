import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className={"flex flex-col w-screen h-screen justify-center items-center"}>
        <p>В целом, это лендинг</p>
      <Link href={"/auth"} className={"font-bold"}>Авторизация</Link>
    </div>
  );
}
