'use client';

import { motion } from 'framer-motion';
import { useConnectionInfo } from '../hooks/useConnectionInfo';
import { FiGlobe, FiInfo, FiMapPin, FiMonitor } from 'react-icons/fi';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const cardVariants = {
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 }
  }
};

export function ConnectionInfo() {
  const { loading, error, connectionData } = useConnectionInfo();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeInUp}
        className="bg-red-500/10 text-red-500 p-4 rounded-lg"
      >
        {error}
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      <motion.div
        variants={cardVariants}
        whileHover="hover"
        initial="initial"
        animate="animate"
        exit="exit"
        className="bg-black/5 dark:bg-white/5 backdrop-blur-lg rounded-xl p-6 shadow-lg"
      >
        <div className="flex items-center gap-3 mb-4">
          <FiGlobe className="text-2xl text-primary" />
          <h2 className="text-xl font-semibold">Informações de IP</h2>
        </div>
        <div className="space-y-2">
          <p>IP: {connectionData?.ipInfo?.ip}</p>
          <p>Cidade: {connectionData?.ipInfo?.city}</p>
          <p>País: {connectionData?.ipInfo?.country}</p>
          <p>Organização: {connectionData?.ipInfo?.org}</p>
        </div>
      </motion.div>

      <motion.div
        variants={cardVariants}
        whileHover="hover"
        initial="initial"
        animate="animate"
        exit="exit"
        className="bg-black/5 dark:bg-white/5 backdrop-blur-lg rounded-xl p-6 shadow-lg"
      >
        <div className="flex items-center gap-3 mb-4">
          <FiMapPin className="text-2xl text-primary" />
          <h2 className="text-xl font-semibold">Localização</h2>
        </div>
        <div className="space-y-2">
          <p>Continente: {connectionData?.localizacao?.continent}</p>
          <p>País: {connectionData?.localizacao?.countryName}</p>
          <p>Estado: {connectionData?.localizacao?.principalSubdivision}</p>
          <p>Cidade: {connectionData?.localizacao?.city}</p>
        </div>
      </motion.div>

      <motion.div
        variants={cardVariants}
        whileHover="hover"
        initial="initial"
        animate="animate"
        exit="exit"
        className="bg-black/5 dark:bg-white/5 backdrop-blur-lg rounded-xl p-6 shadow-lg"
      >
        <div className="flex items-center gap-3 mb-4">
          <FiMonitor className="text-2xl text-primary" />
          <h2 className="text-xl font-semibold">Dispositivo</h2>
        </div>
        <div className="space-y-2">
          <p>Sistema: {connectionData?.clientInfo?.os}</p>
          <p>Navegador: {connectionData?.clientInfo?.family}</p>
          <p>Versão: {connectionData?.clientInfo?.versionMajor}</p>
          <p>Dispositivo Móvel: {connectionData?.clientInfo?.isMobile ? 'Sim' : 'Não'}</p>
        </div>
      </motion.div>

      <motion.div
        variants={cardVariants}
        whileHover="hover"
        initial="initial"
        animate="animate"
        exit="exit"
        className="bg-black/5 dark:bg-white/5 backdrop-blur-lg rounded-xl p-6 shadow-lg"
      >
        <div className="flex items-center gap-3 mb-4">
          <FiInfo className="text-2xl text-primary" />
          <h2 className="text-xl font-semibold">Detalhes Adicionais</h2>
        </div>
        <div className="space-y-2">
          <p>Timezone: {connectionData?.ipInfo2?.timezone}</p>
          <p>Hostname: {connectionData?.ipInfo2?.hostname}</p>
          <p>Código Postal: {connectionData?.ipInfo2?.postal}</p>
          <p>Proxy: {connectionData?.clientInfo?.isBehindProxy ? 'Sim' : 'Não'}</p>
        </div>
      </motion.div>
    </div>
  );
}