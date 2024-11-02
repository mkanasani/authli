import React from 'react';
import { Send, Loader2 } from 'lucide-react';

interface GenerateButtonProps {
  loading: boolean;
  disabled?: boolean;
}

export function GenerateButton({ loading, disabled }: GenerateButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading || disabled}
      className="w-full py-3 px-4 flex items-center justify-center text-white bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50"
    >
      {loading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <>
          <Send className="w-5 h-5 mr-2" />
          Generate
        </>
      )}
    </button>
  );
}