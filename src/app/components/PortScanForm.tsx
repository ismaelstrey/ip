'use client';

import {  useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Loader2, Server, Check, X } from 'lucide-react';
import { useConnectionInfo } from '../hooks/useConnectionInfo';

interface PortResult {
  port: number;
  status: 'open' | 'closed';
}

export default function PortScanForm() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<PortResult[]>([]);
  const {connectionData} = useConnectionInfo();

  const [ip,setIp] = useState(connectionData?.ipInfo.ip || '');
  const [ports,setPorts] = useState('80,443,22'); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/portas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ip,ports}),
      });
      
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Erro ao escanear portas:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto rounded-2xl p-6 shadow-xl border border-gray-700"
      >
        <div className="flex items-center gap-2 mb-6">
          <Network className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold text-white">Scanner de Portas</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="ip" className="block text-sm font-medium text-gray-300 mb-1">
              Host / IP Address
            </label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              id="ip" 
              value={ip}   
              defaultValue={ip}
              onChange={(e) => setIp( e.target.value )}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Ex: google.com.br ou 192.168.1.1"
              required
            />
          </div>

          <div>
            <label htmlFor="ports" className="block text-sm font-medium text-gray-300 mb-1">
              Portas (separadas por vírgula)
            </label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              id="ports"
              value={ports}
              onChange={(e) => setPorts(e.target.value )}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Ex: 80,443,22"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Escaneando...
              </>
            ) : (
              <>
                <Server className="w-5 h-5" />
                Escanear Portas
              </>
            )}
          </motion.button>
        </form>

        <AnimatePresence>
          {results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 space-y-2"
            >
              <h3 className="text-lg font-medium text-white mb-3">Resultados:{ip}</h3>
              {results.map((result, index) => (
                <motion.div
                  key={result.port}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center justify-between p-3 rounded-xl ${result.status === 'open' ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'} border`}
                >
                  <div className="flex items-center gap-2">
                    {result.status === 'open' ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <X className="w-5 h-5 text-red-500" />
                    )}
                    <span className="text-white font-medium">Porta {result.port}</span>
                  </div>
                  <span className={`text-sm font-medium ${result.status === 'open' ? 'text-green-500' : 'text-red-500'}`}>
                    {result.status === 'open' ? 'Aberta' : 'Fechada'}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}