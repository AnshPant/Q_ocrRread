import Image from 'next/image'
import upload from '../pages/upload'
import Link from 'next/link'

export default function Home() {
  return (
    
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="../upload">
          <button  >
          Start
        </button></Link>
    </main>
  )
}
