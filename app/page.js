'use client';
import Image from 'next/image';
import Abrar from '@/app/assets/images/me/abrar_1.png';

export default function Home() {
  return (
    <div>
      <Image src={Abrar} alt="Abrar Jahin" width={300} height={300}/>
    </div>
  );
}
