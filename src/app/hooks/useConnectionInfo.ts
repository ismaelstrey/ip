'use client';

import { useState, useEffect } from 'react';
import { ClientInfoType, getClienteInfo, getIpInfo, getIpInfo2, getLocalizacao, IpInfoCoType, IpInfoType, LocalizacaoType } from '../services/IpService';

export function useConnectionInfo() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connectionData, setConnectionData] = useState<{
    clientInfo: ClientInfoType;
    ipInfo: IpInfoType;
    ipInfo2: IpInfoCoType;
    localizacao: LocalizacaoType;
  } | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [clientInfo, ipInfo, ipInfo2, localizacao] = await Promise.all([
          getClienteInfo(),
          getIpInfo(),
          getIpInfo2(),
          getLocalizacao()
        ]);

        setConnectionData({
          clientInfo,
          ipInfo,
          ipInfo2,
          localizacao
        });
      } catch (err) {
        setError('Erro ao carregar informações de conexão');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { loading, error, connectionData };
}