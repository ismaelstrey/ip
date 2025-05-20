'use client'
import { useConnectionInfo } from "../hooks/useConnectionInfo";

export default function MeuIp() {
    const { loading, connectionData } = useConnectionInfo();
    if (loading) {
        return (
            <div>
                Carregando...
            </div>
        )
    }
    return (
        <div className="flex justify-center min-h-24 md:min-h-32 py-4 md:py-8">
            <span className="text-4xl sm:text-6xl md:text-8xl break-all text-center">
                {connectionData?.ipInfo.ip}
            </span>
        </div>
    )
}