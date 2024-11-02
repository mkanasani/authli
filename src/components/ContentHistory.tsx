import React, { useEffect } from 'react';
import { Edit2, Trash2, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

export function ContentHistory() {
  const { contents, setContents, isLoading, setLoading } = useStore();

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('contents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContents(data);
    } catch (error) {
      toast.error('Failed to fetch content history');
    } finally {
      setLoading(false);
    }
  };

  const deleteContent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contents')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setContents(contents.filter(content => content.id !== id));
      toast.success('Content deleted successfully');
    } catch (error) {
      toast.error('Failed to delete content');
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse bg-white dark:bg-gray-800 rounded-xl p-6 h-40" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {contents.length === 0 ? (
        <div className="text-center py-12">
          <Clock className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 dark:text-gray-300">No content generated yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {contents.map((content) => (
            <div
              key={content.id}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                {content.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {content.content}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(content.created_at).toLocaleDateString()}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {/* Implement edit functionality */}}
                    className="p-2 text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300 transition-colors duration-200"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => deleteContent(content.id)}
                    className="p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}