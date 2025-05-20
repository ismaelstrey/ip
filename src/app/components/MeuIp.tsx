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
        <div className="flex justify-center min-h-32 text-8xl">
            {connectionData?.ipInfo.ip}
        </div>
    )
}