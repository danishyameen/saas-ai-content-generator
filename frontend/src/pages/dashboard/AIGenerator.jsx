import { useState } from 'react';
import { Copy, Download, Loader2, Image as ImageIcon, Upload } from 'lucide-react';
import { aiAPI } from '../../services/api';
import toast from 'react-hot-toast';

export default function AIGenerator({ title, description, icon: Icon, color, apiFunction, placeholder, examplePrompt, isProduct = false }) {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [hasImage, setHasImage] = useState(null);

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

  const handleImageChoice = async (choice) => {
    setHasImage(choice);
    if (choice === 'no' && prompt.trim()) {
      setImgLoading(true);
      try {
        const { data } = await aiAPI.generateImages({ prompt });
        setImages(data.data);
        toast.success('Images generated!');
      } catch (error) {
        toast.error('Image generation failed');
      } finally {
        setImgLoading(false);
      }
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages([reader.result]);
      };
      reader.readAsDataURL(file);
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

  const downloadImage = (imgUrl, index) => {
    const a = document.createElement('a');
    a.href = imgUrl;
    a.download = `product-image-${index + 1}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success('Image download started!');
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
        <div className="card space-y-4">
          <div>
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
          </div>

          {isProduct && result && !hasImage && (
            <div className="p-4 bg-dark-900 rounded-lg border border-dark-700">
              <p className="text-sm font-medium mb-3">Do you have a product image?</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleImageChoice('yes')}
                  className="btn-secondary text-sm flex-1"
                >
                  Yes, upload
                </button>
                <button
                  onClick={() => handleImageChoice('no')}
                  className="btn-secondary text-sm flex-1"
                >
                  No, generate one
                </button>
              </div>
            </div>
          )}

          {hasImage === 'yes' && (
            <div className="p-4 bg-dark-900 rounded-lg border border-dark-700">
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-dark-600 rounded-lg p-4 cursor-pointer hover:border-primary-500 transition-colors">
                <Upload size={24} className="text-dark-400 mb-2" />
                <span className="text-sm text-dark-300">Click to upload product image</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
              </label>
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="btn-primary w-full"
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
        <div className="space-y-6">
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

          {(images.length > 0 || imgLoading) && (
            <div className="card">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <ImageIcon size={18} className="text-primary-400" />
                Product Images
              </h3>
              {imgLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 size={32} className="animate-spin text-primary-400" />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {images.map((img, i) => (
                    <div key={i} className="group relative">
                      <img src={img} alt="Generated product" className="rounded-lg w-full h-auto" />
                      <button
                        onClick={() => downloadImage(img, i)}
                        className="absolute bottom-2 right-2 p-2 bg-dark-900/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary-600"
                        title="Download Image"
                      >
                        <Download size={16} className="text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
