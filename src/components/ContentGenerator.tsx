import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { parseResponse } from '../utils/responseParser';
import { PromptInput } from './PromptInput';
import { GenerateButton } from './GenerateButton';
import type { GeneratedContent } from '../types/content';

export function ContentGenerator() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const generateContent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error('User not authenticated');

      const response = await fetch('https://hook.us1.make.com/gqafjqf4plvbomygtpmxmal3llsi0aq2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt,
          timestamp: new Date().toISOString(),
          userId: user.id 
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${errorText || response.statusText}`);
      }

      let responseData;
      if (response.headers.get('content-type')?.includes('application/json')) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      const processedContent = parseResponse(responseData);
      
      const newContent: GeneratedContent = {
        title: prompt,
        content: processedContent,
        user_id: user.id,
        created_at: new Date().toISOString()
      };

      const { error: dbError } = await supabase
        .from('contents')
        .insert([newContent]);

      if (dbError) throw dbError;
      
      toast.success('Content generated and saved!');
      setPrompt('');
    } catch (error) {
      console.error('Generation error:', error);
      toast.error(error.message || 'Failed to generate content');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
      <div className="p-6">
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Enter your prompt below and let AI generate content for you.
        </p>
        <form onSubmit={generateContent} className="space-y-4">
          <PromptInput 
            value={prompt}
            onChange={setPrompt}
            disabled={loading}
          />
          <GenerateButton loading={loading} />
        </form>
      </div>
    </div>
  );
}