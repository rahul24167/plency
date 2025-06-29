'use client';
import { useRouter } from 'next/navigation';
import {supabase} from '@/event-creator/src/lib/supabase/client';

export default function Dashboard() {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/login');
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <button
        onClick={() => router.push('/create-project')}
        className="bg-blue-600 text-white p-2 rounded"
      >
        Create Project Page
      </button>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white p-2 rounded ml-4"
      >
        Logout
      </button>
    </div>
  );
}
