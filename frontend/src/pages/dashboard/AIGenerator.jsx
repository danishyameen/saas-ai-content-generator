import { useState } from 'react';
import { Copy, Download, Loader2 } from 'lucide-react';
import { aiAPI } from '../../services/api';
import toast from 'react-hot-toast';

export default function AIGenerator({ title, description, icon: Icon, color, apiFunction, placeholder, examplePrompt }) {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    setLoading(true);
    try {
      const { data } = await apiFunction({ prompt });
      setResult(data.data);
      toast.success('Content generated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Generation failed');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    toast.success('Copied to clipboard!');
  };

  const downloadResult = () => {
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Downloaded!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center`}>
          <Icon size={24} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-dark-400">{description}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="card">
          <h3 className="font-semibold mb-4">Enter Your Prompt</h3>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="input w-full h-48 resize-none"
            placeholder={placeholder}
          />
          {examplePrompt && (
            <button
              onClick={() => setPrompt(examplePrompt)}
              className="mt-2 text-sm text-primary-400 hover:text-primary-300"
            >
              Use example prompt →
            </button>
          )}
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="btn-primary w-full mt-4"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="inline mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Content'
            )}
          </button>
        </div>

        {/* Output */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Generated Content</h3>
            {result && (
              <div className="flex gap-2">
                <button onClick={copyToClipboard} className="btn-secondary text-sm px-3 py-1">
                  <Copy size={14} className="inline mr-1" />
                  Copy
                </button>
                <button onClick={downloadResult} className="btn-secondary text-sm px-3 py-1">
                  <Download size={14} className="inline mr-1" />
                  Download
                </button>
              </div>
            )}
          </div>
          <div className="bg-dark-900 rounded-lg p-4 min-h-[300px] max-h-[500px] overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Loader2 size={32} className="animate-spin text-primary-400 mx-auto mb-2" />
                  <p className="text-dark-400">AI is working...</p>
                </div>
              </div>
            ) : result ? (
              <pre className="whitespace-pre-wrap text-sm text-dark-300">{result}</pre>
            ) : (
              <div className="flex items-center justify-center h-full text-dark-500">
                <p>Generated content will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
