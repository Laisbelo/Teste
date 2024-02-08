"use client"

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface FileData {
    id: number;
    column1: string;
    column2: string;
}

    const fetchData = async (
        id: string
    ): Promise<{ nome: string; data: FileData[]; columns: string[] }> => {
    try {
    const response = await fetch(`http://bi.targitbrasil.com:1212/files/${id}`);
        const data = await response.json();
        return data;
    } catch (error: any) {
    throw new Error("Erro ao buscar arquivos: " + error.message);
    }
    };

export default function ArquivosId()  {
    const params =  useParams<{ id: string}>()
    const id = params.id

    const [loading,setLoading] = useState<boolean>(true);
    const [data,setData] = useState<FileData[]>([]);
    const [columns,setColumns] = useState<string[]>([]);
    const [titulo,setTitulo] = useState<string>();



    {useEffect(() => {
        const fetchDataAndSetState = async () => {
            try {
            const { nome, data, columns } = await fetchData(id);
            setTitulo(nome);
            setData(data);
            setColumns(columns);
            } catch (error) {
            console.log("Um erro ocorreu", error);
            } finally {
            setLoading(false);
            }
        };
        if (id) {
            fetchDataAndSetState();
        }
    }, [id]);
}

    return(
        <div className="w-screen h-screen">
            {loading === true ?
            <div role="status" className="h-full w-full flex flex-col gap-4 justify-center items-center">
                <span className="animate-pulse text-black-500">Carregando</span>
                <svg aria-hidden="true" className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-purple-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
            </div>
            :
            <div className="p-10 w-full gap-8 h-full flex flex-col align-middle justify-center">
                <div className="w-full text-center text-4xl text-gray-600">
                    <h1 >
                        {titulo}
                    </h1>
                </div>
                
                <div className="flex justify-center overflow-x-auto sm:rounded-lg w-full">
                    <table className="w-1/2 text-sm shadow-md text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                            {columns.map((item)=>
                            <th key={item}  scope="col" className="px-6 py-3">
                                {item}
                            </th>
                            )}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item)=>
                            <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.column1}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.column2}
                                </td>
                            </tr>
                            )
                            }
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center">
                    <a href={`/arquivos`}className="w-1/2 flex justify-center px-4 py-2 text-white bg-purple-500 rounded-lg active hover:bg-purple-300" aria-current="page">
                        Voltar
                    </a>
                </div>
            </div>
            }
        </div>
    )
}