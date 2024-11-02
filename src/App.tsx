import React, { useEffect, useState } from 'react';
import { Auth } from './components/Auth';
import { Header } from './components/Header';
import { ContentGenerator } from './components/ContentGenerator';
import { ContentHistory } from './components/ContentHistory';
import { useStore } from './store/useStore';
import { supabase } from './lib/supabase';
import { Toaster } from 'react-hot-toast';
import { ThemeToggle } from './components/ThemeToggle';

export default function App() {
  const [session, setSession] = useState(null);
  const { theme } = useStore();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  if (!session) {
    return (
      <>
        <ThemeToggle />
        <Auth onAuth={() => {}} />
        <Toaster position="top-right" />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          <section>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              Create New Content
            </h2>
            <ContentGenerator />
          </section>
          
          <section>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              Your Generated Content
            </h2>
            <ContentHistory />
          </section>
        </div>
      </main>
      <Toaster position="top-right" />
    </div>
  );
}