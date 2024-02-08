"use client"

import Image from 'next/image';
import { useRouter } from 'next/navigation';



export default function Home() {


const { push } = useRouter();


  return (
    <div>
      <main className="flex h-screen flex-col items-center p-24">
        <div className="w-2/3 items-center justify-between font-sans text-6xl">
          <h1 className='bg-gradient-to-r from-slate-400 to-slate-200  bg-clip-text text-transparent'>Bem-vindo!</h1>
        </div>
        <div className="p-4 gap-4 text-2xl flex shadow-sm items-center align-middle  mt-10 w-2/3 h-full font-sans border border-gray-300 rounded-md">
          <div className='p-10 h-full w-1/2s flex'>
            <Image
            src="/images/imagem.png"
            width={600}
            height={200}
            alt="Picture"
            className="rounded-md shadow-sm"
            />
          </div>
          <div className='p-4 flex flex-col w-1/2 justify-center text-center align-middle items-center'>
            <p className=''>Visualize os seus arquivos armazenados</p>
            <button
            className='p-2 bg-blue-400 text-white mt-8 rounded-md hover:bg-blue-300 w-1/2'
            onClick={() => push('/arquivos')}>
              <h1>Acessar</h1>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
