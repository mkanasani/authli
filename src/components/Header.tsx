import React from 'react';
import { LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { ThemeToggle } from './ThemeToggle';
import toast from 'react-hot-toast';

export function Header() {
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-2xl font-bold gradient-text">AI Content Generator</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSignOut}
              className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors duration-200"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Sign Out
            </button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}