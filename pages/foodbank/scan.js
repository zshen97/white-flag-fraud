import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import Layout from '../../components/layoutFoodbank'

const QrReader = dynamic(() => import('react-qr-reader'), {
  ssr: false
})

const ScanCollector = () => {
  const router = useRouter()
  // const [qrString, setQRString] = useState('')
  const [hasScanned, setHasScanned] = useState(false)
  const handleScan = (qrString) => {
    if (qrString && qrString.length > 0) {
      setHasScanned(true)
      console.log('qrString is ', qrString)
      // setQRString(qrString)
      router.push({
        pathname: '/collector/history/[id]',
        query: { id: qrString }
      })
    }
  }

  const handleError = (err) => console.log(err)

  return (
    <Layout>
      <Head>
        <title>Scan</title>
      </Head>
      <div className='bg-white p-8 rounded-br-md rounded-bl-md mt-10 flex flex-col items-strech'>
        <div className='flex-1'>
          <h2 className='text-gray-700 font-semibold'>Scan Collector</h2>
        </div>

        <div className='flex flex-col items-stretch  mt-8 '>
          <div>
            {
              hasScanned
                ? <p>{'Getting collector\'s history...'}</p>
                : <QrReader
                    facingMode='environment'
                    onError={(err) => handleError(err)}
                    onScan={(str) => handleScan(str)}
                    style={{ width: '80%', margin: '0 auto' }}
                  />
            }
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ScanCollector
