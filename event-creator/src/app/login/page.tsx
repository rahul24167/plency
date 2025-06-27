// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import {supabase} from '@/event-creator/src/lib/supabase/client';

// export default function AdminLoginPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   async function handleLogin(e: React.FormEvent) {
//     e.preventDefault();
//     setLoading(true);
//     const { error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });
//     setLoading(false);

//     if (error) {
//       alert('Login failed: ' + error.message);
//     } else {
//       alert('Login successful!');
//       router.push('/admin/dashboard');
//     }
//   }

//   return (
    // <div className="flex min-h-screen items-center justify-center">
    //   <form onSubmit={handleLogin} className="flex flex-col gap-3 w-80">
    //     <input
    //       type="email"
    //       placeholder="Admin email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       required
    //       className="border rounded p-2"
    //     />
    //     <input
    //       type="password"
    //       placeholder="Password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       required
    //       className="border rounded p-2"
    //     />
    //     <button
    //       type="submit"
    //       disabled={loading}
    //       className="bg-blue-600 text-white rounded p-2"
    //     >
    //       {loading ? 'Logging in...' : 'Login'}
    //     </button>
    //   </form>
    // </div>
//   );
// }



import { login, signup } from './actions'

export default function LoginPage() {
  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm space-y-4">
    <div>
      <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
        Email:
      </label>
      <input
        id="email"
        name="email"
        type="email"
        required
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
        Password:
      </label>
      <input
        id="password"
        name="password"
        type="password"
        required
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div className="flex justify-between space-x-4">
      <button
        type="submit"
        formAction={login}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      >
        Log in
      </button>
      <button
        type="submit"
        formAction={signup}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
      >
        Sign up
      </button>
    </div>
  </form>
</div>

  )
}