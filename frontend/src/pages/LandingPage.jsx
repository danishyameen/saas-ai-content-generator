import { Link } from 'react-router-dom';
import {
  Sparkles,
  Zap,
  Shield,
  TrendingUp,
  Check,
  ArrowRight,
  Star,
  Package,
  Search,
  Megaphone,
  Lightbulb,
  Share2,
  BarChart3,
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-dark-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-950/80 backdrop-blur-sm border-b border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="text-white" size={20} />
              </div>
              <span className="text-white font-bold text-lg">GeniFai</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-dark-300 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="text-dark-300 hover:text-white transition-colors">Pricing</a>
              <a href="#testimonials" className="text-dark-300 hover:text-white transition-colors">Testimonials</a>
              <Link to="/login" className="btn-outline">Login</Link>
              <Link to="/register" className="btn-primary">Get Started Free</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600/20 rounded-full mb-6">
            <Zap size={16} className="text-primary-400" />
            <span className="text-primary-400 text-sm font-medium">Powered by GeniFai AI</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            Build Your Business
            <span className="gradient-text"> with AI</span>
          </h1>
          <p className="text-xl text-dark-300 mb-8 max-w-3xl mx-auto">
            Generate product descriptions, SEO content, marketing ads, business ideas, and social media content in seconds. 
            Stop wasting hours on content creation. Let AI do the heavy lifting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary text-lg px-8 py-4">
              Start Free Trial
              <ArrowRight size={20} className="inline ml-2" />
            </Link>
            <a href="#features" className="btn-outline text-lg px-8 py-4">
              See Features
            </a>
          </div>
          <p className="text-dark-400 mt-4 text-sm">No credit card required • 5 free AI requests per day</p>
        </div>
      </section>

      {/* Problem → Solution */}
      <section className="py-20 px-4 bg-dark-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="card border-red-500/20">
              <h3 className="text-2xl font-bold text-red-400 mb-4">❌ The Problem</h3>
              <ul className="space-y-3 text-dark-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Hiring copywriters costs $500-$5000 per project</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Writing content takes hours or days</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>SEO experts charge $100-$300 per hour</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Marketing agencies require monthly retainers</span>
                </li>
              </ul>
            </div>
            <div className="card border-green-500/20">
              <h3 className="text-2xl font-bold text-green-400 mb-4">✅ Our Solution</h3>
              <ul className="space-y-3 text-dark-300">
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-green-400 mt-1" />
                  <span>AI-generated content in seconds for pennies</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-green-400 mt-1" />
                  <span>Professional quality without the professional price</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-green-400 mt-1" />
                  <span>Unlimited content generation on Pro plan</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-green-400 mt-1" />
                  <span>Start free, upgrade when ready</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to
              <span className="gradient-text"> Succeed Online</span>
            </h2>
            <p className="text-dark-300 text-lg max-w-2xl mx-auto">
              Six powerful AI tools in one platform. Generate anything you need to build and grow your business.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Package, title: 'Product Descriptions', desc: 'Generate compelling, conversion-optimized product descriptions that sell.' },
              { icon: Search, title: 'SEO Content', desc: 'Create search-optimized articles and blog posts that rank on Google.' },
              { icon: Megaphone, title: 'Ad Copy', desc: 'Generate high-converting ads for Facebook, Google, TikTok, and more.' },
              { icon: Lightbulb, title: 'Business Ideas', desc: 'Get innovative business ideas with market analysis and startup guides.' },
              { icon: Share2, title: 'Social Media Content', desc: 'Create engaging posts, captions, and scripts for all platforms.' },
              { icon: BarChart3, title: 'Competitor Analysis', desc: 'Analyze competitors and find opportunities to dominate your market.' },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="card hover:border-primary-500/50 transition-colors duration-200">
                  <div className="w-12 h-12 bg-primary-600/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon size={24} className="text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-dark-400">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 bg-dark-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, Transparent
              <span className="gradient-text"> Pricing</span>
            </h2>
            <p className="text-dark-300 text-lg">Start free. Upgrade when you're ready.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Free */}
            <div className="card">
              <h3 className="text-xl font-semibold mb-2">Free</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-dark-400">/forever</span>
              </div>
              <ul className="space-y-3 mb-6">
                {['5 AI requests per day', 'Basic generators', 'Email support'].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-dark-300">
                    <Check size={16} className="text-green-400" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/register" className="btn-outline w-full text-center block">Get Started</Link>
            </div>

            {/* Pro */}
            <div className="card border-primary-500 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary-600 text-white text-xs font-medium rounded-full">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold mb-2">Pro</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">$9</span>
                <span className="text-dark-400">/month</span>
              </div>
              <ul className="space-y-3 mb-6">
                {[
                  'Unlimited AI requests',
                  'All generators',
                  'Priority support',
                  'Marketing campaigns',
                  'SEO optimization',
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-dark-300">
                    <Check size={16} className="text-green-400" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/register" className="btn-primary w-full text-center block">Start Pro Trial</Link>
            </div>

            {/* Enterprise */}
            <div className="card">
              <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">$99</span>
                <span className="text-dark-400">/month</span>
              </div>
              <ul className="space-y-3 mb-6">
                {[
                  'Everything in Pro',
                  'API access',
                  'Custom AI training',
                  'Dedicated account manager',
                  'Team collaboration',
                  'White-label option',
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-dark-300">
                    <Check size={16} className="text-green-400" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/register" className="btn-outline w-full text-center block">Contact Sales</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Loved by
              <span className="gradient-text"> Entrepreneurs</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Sarah K.', role: 'E-commerce Owner', text: 'This tool saved me thousands in copywriting costs. I generate all my product descriptions in minutes.' },
              { name: 'Mike R.', role: 'Startup Founder', text: 'The business ideas generator helped me validate 3 startup concepts before committing to one. Game changer.' },
              { name: 'Lisa T.', role: 'Marketing Manager', text: 'We use this daily for social media content. What used to take hours now takes minutes. ROI is incredible.' },
            ].map((testimonial, i) => (
              <div key={i} className="card">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-dark-300 mb-4">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-dark-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-900/50 to-purple-900/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Build Your Business with AI?
          </h2>
          <p className="text-dark-300 text-lg mb-8">
            Join thousands of entrepreneurs using AI to build faster and smarter.
          </p>
          <Link to="/register" className="btn-primary text-lg px-8 py-4">
            Start Your Free Trial
            <ArrowRight size={20} className="inline ml-2" />
          </Link>
          <p className="text-dark-400 mt-4 text-sm">No credit card required</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-dark-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="text-white" size={20} />
              </div>
              <span className="text-white font-bold">GeniFai</span>
            </div>
            <div className="flex items-center gap-6 text-dark-400 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
            <p className="text-dark-400 text-sm">© 2026 GeniFai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
