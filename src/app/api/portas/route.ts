// pages/api/scan.ts

import { NextRequest, NextResponse } from 'next/server';
import portscanner from 'portscanner';

export async function POST(req: NextRequest) {

    const {ip = '127.0.0.1',ports = '80,443,22' } = await req.json();
  

  const portList = (ports as string).split(',').map(Number);

  const results = await Promise.all(
    portList.map(port =>
      portscanner.checkPortStatus(port, ip as string).then(status => ({
        port,
        status
      }))
    )
  );
console.log(results)
 return NextResponse.json(results);
}
