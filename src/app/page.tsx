
import { ConnectionInfo } from './components/ConnectionInfo';
import PortScanForm from './components/PortScanForm';

export default function Home() {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-[#0F0F0F] to-[#1A1A1A] text-white p-8">
      <main className="max-w-7xl mx-auto space-y-16">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-[#F3F821] pb-2">
            Detalhes da sua Conexão
          </h1>
          <p className="text-center text-gray-400 max-w-2xl mx-auto">
            Informações detalhadas sobre seu IP, localização e dispositivo em tempo real
          </p>
          <div className="mt-12">
            <ConnectionInfo />
          </div>
        </div>

  
      </main>     
       <div className="fixed top-0">
         <div className='flex min-h-screen w-screen justify-center content-center itens-center'>
         <h2 className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent ">
            Scanner de Portas
          </h2>
          <PortScanForm />
         </div>
        </div>
    </div>
  );
}
