import { useNavigate } from 'react-router-dom';
import { Zap, Shield, Activity, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';

const features = [
  { icon: Zap,      title: 'Idempotent APIs',      desc: 'Duplicate requests never charge twice. Safe retries built-in.' },
  { icon: Shield,   title: 'ACID Transactions',     desc: 'Every payment runs in a PostgreSQL transaction with row-level locking.' },
  { icon: Activity, title: 'Async Webhooks',        desc: 'BullMQ delivers merchant notifications with exponential backoff.' },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface-DEFAULT text-white">
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-surface-border">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-brand-500 rounded-lg flex items-center justify-center">
            <Zap size={14} className="text-white" />
          </div>
          <span className="font-bold text-lg">PayFlow</span>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => navigate('/login')}>
            Sign In
          </Button>
          <Button onClick={() => navigate('/register')}>
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center text-center px-6 py-28 overflow-hidden">
        
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20
                          text-brand-400 text-xs font-medium px-4 py-2 rounded-full mb-8">
            <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-pulse" />
            Production-Grade Payment Infrastructure
          </div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
            Payment Gateway
            <span className="text-brand-400"> Built for Scale</span>
          </h1>

          <p className="text-surface-muted text-lg mt-6 leading-relaxed">
            Idempotent transactions. State machine lifecycle. Async webhook delivery.
            Everything a real payment system needs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Button size="lg" onClick={() => navigate('/register')}>
              Start Building <ArrowRight size={16} />
            </Button>

            <Button size="lg" variant="secondary" onClick={() => navigate('/login')}>
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-8 pb-24 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-surface-card border border-surface-border rounded-xl p-6
                         hover:border-brand-500/30 hover:shadow-lg transition-all duration-200"
            >
              <div className="w-10 h-10 bg-brand-500/10 rounded-xl flex items-center
                              justify-center text-brand-400 mb-4">
                <Icon size={18} />
              </div>

              <h3 className="font-semibold text-white mb-2">
                {title}
              </h3>

              <p className="text-sm text-surface-muted leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}