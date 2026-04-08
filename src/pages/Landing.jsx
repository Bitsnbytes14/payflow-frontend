import { useNavigate } from 'react-router-dom';
import { Zap, Shield, Activity, ArrowRight, CheckCircle, Clock, BarChart2, Lock } from 'lucide-react';
import Button from '../components/ui/Button';

/* ─── data ─────────────────────────────────────────────── */
const features = [
  {
    icon: Zap,
    title: 'Idempotent APIs',
    desc: 'Duplicate requests never charge twice. Safe retries built-in.',
    tag: 'No duplicate charges',
    iconColor: '#38bdf8',
    iconBg: 'rgba(56,189,248,0.12)',
    tagColor: '#38bdf8',
    tagBg: 'rgba(56,189,248,0.1)',
  },
  {
    icon: Shield,
    title: 'ACID Transactions',
    desc: 'Every payment runs in a PostgreSQL transaction with row-level locking.',
    tag: 'Consistent & safe',
    iconColor: '#34d399',
    iconBg: 'rgba(52,211,153,0.12)',
    tagColor: '#34d399',
    tagBg: 'rgba(52,211,153,0.1)',
  },
  {
    icon: Activity,
    title: 'Async Webhooks',
    desc: 'BullMQ delivers merchant notifications with exponential backoff.',
    tag: 'Reliable delivery',
    iconColor: '#a78bfa',
    iconBg: 'rgba(167,139,250,0.12)',
    tagColor: '#a78bfa',
    tagBg: 'rgba(167,139,250,0.1)',
  },
  {
    icon: BarChart2,
    title: 'Real-time Tracking',
    desc: 'Monitor every transaction through its full state machine lifecycle.',
    tag: 'Full observability',
    iconColor: '#fb923c',
    iconBg: 'rgba(251,146,60,0.12)',
    tagColor: '#fb923c',
    tagBg: 'rgba(251,146,60,0.1)',
  },
];

const trustItems = [
  { icon: Lock,        label: 'PCI DSS Compliant' },
  { icon: Clock,       label: '99.99% Uptime SLA' },
  { icon: CheckCircle, label: 'Idempotency Built-In' },
  { icon: Shield,      label: 'ACID Transactions' },
];

const stats = [
  { label: 'Volume (30d)',  value: '$2.4M',  change: '↑ 18.2% vs prev', up: true },
  { label: 'Transactions',  value: '38,412', change: '↑ 11% vs prev',   up: true },
  { label: 'Success Rate',  value: '99.7%',  change: '0.3% failed',      up: false },
];

const recentTxns = [
  { id: 'pay_9Kx2mN', merchant: 'Acme Corp',         amount: '$1,240.00', status: 'settled',    color: '#34d399', bg: 'rgba(52,211,153,0.1)' },
  { id: 'pay_7Rw4pQ', merchant: 'Stark Industries',  amount: '$8,500.00', status: 'processing', color: '#38bdf8', bg: 'rgba(56,189,248,0.1)' },
  { id: 'pay_3Tb8yL', merchant: 'Wayne Enterprises', amount: '$320.50',   status: 'settled',    color: '#34d399', bg: 'rgba(52,211,153,0.1)' },
  { id: 'pay_1Zm5vK', merchant: 'Pied Piper',        amount: '$75.00',    status: 'failed',     color: '#f87171', bg: 'rgba(248,113,113,0.1)' },
];

const barHeights = [45, 60, 38, 70, 55, 80, 65, 90, 75, 85, 78, 95, 88, 100];

const ACCENT   = '#0ea5e9';
const BG_BASE  = '#0f172a';
const BG_CARD  = '#1e293b';
const BG_DEEP  = '#0d1a2d';
const BORDER   = 'rgba(148,163,184,0.12)';
const MUTED    = '#64748b';
const SUBMUTED = '#94a3b8';

/* ─── component ────────────────────────────────────────── */
export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{ background: BG_BASE, color: '#e2e8f0', fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* ── NAV ── */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1rem 2.5rem', borderBottom: `1px solid ${BORDER}`,
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(12px)',
      }}>
        {/* logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 30, height: 30, background: `linear-gradient(135deg, ${ACCENT}, #3b82f6)`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={14} color="#fff" />
          </div>
          <span style={{ fontWeight: 700, fontSize: 17, color: '#f8fafc' }}>PayFlow</span>
        </div>

        {/* nav links */}
        <div style={{ display: 'flex', gap: '2.5rem' }}>
          {['Docs', 'Pricing', 'Changelog'].map(l => (
            <span key={l} style={{ fontSize: 14, color: SUBMUTED, cursor: 'pointer' }}>{l}</span>
          ))}
        </div>

        {/* cta buttons */}
        <div style={{ display: 'flex', gap: 10 }}>
          <Button variant="ghost" onClick={() => navigate('/login')}>Sign In</Button>
          <Button onClick={() => navigate('/register')}>Get Started</Button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', textAlign: 'center', padding: '6rem 2rem 5rem', overflow: 'hidden' }}>
        {/* glow */}
        <div style={{ position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)', width: 700, height: 420, background: `radial-gradient(ellipse, rgba(14,165,233,0.18) 0%, transparent 65%)`, pointerEvents: 'none' }} />

        <div style={{ position: 'relative', maxWidth: 720, margin: '0 auto' }}>
          {/* badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(14,165,233,0.1)', border: `1px solid rgba(14,165,233,0.25)`, color: ACCENT, fontSize: 12, fontWeight: 500, padding: '5px 14px', borderRadius: 99, marginBottom: '1.75rem' }}>
            <span style={{ width: 7, height: 7, background: ACCENT, borderRadius: '50%', animation: 'pfpulse 2s infinite' }} />
            Now in Production — v2.4.0
          </div>

          <h1 style={{ fontSize: 'clamp(2.6rem, 6vw, 4.2rem)', fontWeight: 800, lineHeight: 1.1, color: '#f8fafc', margin: '0 0 1.25rem', letterSpacing: '-0.03em' }}>
            Payment Gateway
            <br />
            <span style={{ background: `linear-gradient(135deg, ${ACCENT}, #818cf8)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Built for Scale
            </span>
          </h1>

          <p style={{ fontSize: '1.1rem', color: SUBMUTED, lineHeight: 1.75, maxWidth: 560, margin: '0 auto 2.5rem' }}>
            Idempotent transactions. State machine lifecycle. Async webhook delivery.
            Everything a real payment system needs — production-ready from day one.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button size="lg" onClick={() => navigate('/register')}>
              Start Building <ArrowRight size={16} />
            </Button>
            <Button size="lg" variant="secondary" onClick={() => navigate('/login')}>
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <div style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, background: 'rgba(30,41,59,0.4)', padding: '1.25rem 2rem' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
          {trustItems.map(({ icon: Icon, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: SUBMUTED }}>
              <Icon size={14} color={ACCENT} />
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '5rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{ fontSize: 11, color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: 12 }}>Core Infrastructure</p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 700, color: '#f8fafc', margin: '0 0 1rem' }}>Everything you need to handle money at scale</h2>
          <p style={{ fontSize: 16, color: SUBMUTED, maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            Engineered for reliability. Designed for developers who can&apos;t afford downtime or duplicate charges.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.25rem' }}>
          {features.map(({ icon: Icon, title, desc, tag, iconColor, iconBg, tagColor, tagBg }) => (
            <div
              key={title}
              style={{
                background: BG_CARD, border: `1px solid ${BORDER}`, borderRadius: 16,
                padding: '1.5rem', transition: 'all 0.22s', cursor: 'default',
                position: 'relative', overflow: 'hidden',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(14,165,233,0.35)';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = BORDER;
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ width: 42, height: 42, background: iconBg, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Icon size={19} color={iconColor} />
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: '#f1f5f9', marginBottom: 8 }}>{title}</h3>
              <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.65, marginBottom: '1rem' }}>{desc}</p>
              <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 99, color: tagColor, background: tagBg }}>
                {tag}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── DASHBOARD PREVIEW ── */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem 5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{ fontSize: 11, color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: 12 }}>Live Preview</p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 700, color: '#f8fafc', margin: '0 0 1rem' }}>Your payment operations, at a glance</h2>
          <p style={{ fontSize: 16, color: SUBMUTED, maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
            Real-time view of payment volume, transaction health, and webhook delivery.
          </p>
        </div>

        <div style={{ background: BG_CARD, border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.35)' }}>
          {/* browser chrome */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '0.875rem 1.5rem', borderBottom: `1px solid ${BORDER}`, background: BG_DEEP }}>
            {['#ef4444', '#f59e0b', '#22c55e'].map(c => (
              <span key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c, opacity: 0.8 }} />
            ))}
            <span style={{ marginLeft: 10, fontSize: 12, color: MUTED, fontFamily: 'monospace' }}>merchant.payflow.dev/dashboard</span>
          </div>

          <div style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
            {/* stat chips */}
            {stats.map(s => (
              <div key={s.label} style={{ background: BG_BASE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '1rem' }}>
                <p style={{ fontSize: 11, color: MUTED, marginBottom: 5 }}>{s.label}</p>
                <p style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', marginBottom: 4 }}>{s.value}</p>
                <p style={{ fontSize: 11, color: s.up ? '#34d399' : MUTED }}>{s.change}</p>
              </div>
            ))}

            {/* bar chart */}
            <div style={{ gridColumn: '1 / -1', background: BG_BASE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '1rem' }}>
              <p style={{ fontSize: 11, color: MUTED, marginBottom: 12 }}>Payment volume — last 14 days</p>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 90 }}>
                {barHeights.map((h, i) => (
                  <div key={i} style={{
                    flex: 1, height: `${h}%`, borderRadius: '3px 3px 0 0', minWidth: 14,
                    background: i >= 11 ? ACCENT : 'rgba(14,165,233,0.35)',
                    transition: 'opacity 0.15s',
                  }} />
                ))}
              </div>
            </div>

            {/* txn table */}
            <div style={{ gridColumn: '1 / -1', background: BG_BASE, border: `1px solid ${BORDER}`, borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ padding: '0.75rem 1.25rem', borderBottom: `1px solid ${BORDER}`, fontSize: 11, color: MUTED, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Recent transactions
              </div>
              {recentTxns.map((t, i) => (
                <div key={t.id} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '0.65rem 1.25rem', fontSize: 12,
                  borderBottom: i < recentTxns.length - 1 ? `1px solid rgba(148,163,184,0.06)` : 'none',
                }}>
                  <span style={{ fontFamily: 'monospace', color: MUTED, fontSize: 11 }}>{t.id}</span>
                  <span style={{ color: '#cbd5e1' }}>{t.merchant}</span>
                  <span style={{ fontWeight: 600, color: '#f1f5f9' }}>{t.amount}</span>
                  <span style={{ padding: '2px 10px', borderRadius: 99, fontSize: 11, fontWeight: 600, color: t.color, background: t.bg }}>{t.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CODE SECTION ── */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem 5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{ fontSize: 11, color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: 12 }}>Developer-First</p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 700, color: '#f8fafc', margin: '0 0 1rem' }}>Simple REST APIs. Powerful guarantees.</h2>
          <p style={{ fontSize: 16, color: SUBMUTED, maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
            Integrate in minutes. Plain HTTP with JSON. Full idempotency support on every endpoint.
          </p>
        </div>

        <div style={{ background: BG_CARD, border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden', boxShadow: '0 16px 48px rgba(0,0,0,0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.875rem 1.5rem', borderBottom: `1px solid ${BORDER}`, background: BG_DEEP }}>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <span style={{ fontSize: 13, color: ACCENT, borderBottom: `1.5px solid ${ACCENT}`, paddingBottom: 3, cursor: 'pointer' }}>Create Payment</span>
              <span style={{ fontSize: 13, color: MUTED, cursor: 'pointer' }}>List Transactions</span>
            </div>
            <span style={{ fontSize: 11, color: MUTED, background: BG_BASE, padding: '3px 10px', borderRadius: 6, border: `1px solid ${BORDER}` }}>REST / JSON</span>
          </div>
          <pre style={{ padding: '1.5rem', fontSize: 13, lineHeight: 1.9, overflowX: 'auto', margin: 0, fontFamily: "'Fira Code', 'Cascadia Code', monospace" }}>
            <span style={{ color: '#475569' }}># Create an idempotent payment{'\n'}</span>
            <span style={{ color: '#a78bfa' }}>POST </span>
            <span style={{ color: '#34d399' }}>/api/v1/payments{'\n\n'}</span>
            <span style={{ color: '#38bdf8' }}>Authorization</span>{': Bearer '}
            <span style={{ color: '#fb923c' }}>pk_live_xxxxxxxxxxxx{'\n'}</span>
            <span style={{ color: '#38bdf8' }}>Idempotency-Key</span>{': '}
            <span style={{ color: '#fb923c' }}>order_7f3a9b2c_attempt_1{'\n'}</span>
            <span style={{ color: '#38bdf8' }}>Content-Type</span>{': '}
            <span style={{ color: '#fb923c' }}>application/json{'\n\n'}</span>
            {'{\n  '}
            <span style={{ color: '#38bdf8' }}>"amount"</span>{': '}
            <span style={{ color: '#fb923c' }}>124000</span>
            <span style={{ color: '#475569' }}>,  // in cents{'\n  '}</span>
            <span style={{ color: '#38bdf8' }}>"currency"</span>{': '}
            <span style={{ color: '#fb923c' }}>"USD"</span>{',\n  '}
            <span style={{ color: '#38bdf8' }}>"merchant_id"</span>{': '}
            <span style={{ color: '#fb923c' }}>"merch_acme_001"</span>
            {'\n}\n\n'}
            <span style={{ color: '#475569' }}># Response — 201 Created{'\n'}</span>
            {'{\n  '}
            <span style={{ color: '#38bdf8' }}>"payment_id"</span>{': '}
            <span style={{ color: '#fb923c' }}>"pay_9Kx2mNrTq"</span>{',\n  '}
            <span style={{ color: '#38bdf8' }}>"status"</span>{': '}
            <span style={{ color: '#fb923c' }}>"processing"</span>{',\n  '}
            <span style={{ color: '#38bdf8' }}>"idempotent"</span>{': '}
            <span style={{ color: '#a78bfa' }}>false</span>
            {'\n}'}
          </pre>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section style={{ position: 'relative', textAlign: 'center', padding: '6rem 2rem', borderTop: `1px solid ${BORDER}`, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: -80, left: '50%', transform: 'translateX(-50%)', width: 600, height: 320, background: 'radial-gradient(ellipse, rgba(14,165,233,0.12) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 600, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(14,165,233,0.1)', border: `1px solid rgba(14,165,233,0.25)`, color: ACCENT, fontSize: 12, fontWeight: 500, padding: '5px 14px', borderRadius: 99, marginBottom: '1.75rem' }}>
            <span style={{ width: 7, height: 7, background: ACCENT, borderRadius: '50%', animation: 'pfpulse 2s infinite' }} />
            Free during beta — no credit card needed
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 800, color: '#f8fafc', margin: '0 0 1rem', lineHeight: 1.2 }}>
            Start Building with
            <br />
            <span style={{ color: ACCENT }}>PayFlow Today</span>
          </h2>
          <p style={{ fontSize: 16, color: SUBMUTED, marginBottom: '2.5rem', lineHeight: 1.7 }}>
            Production-grade payment infrastructure for serious teams.
            Go live in hours, not weeks.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button size="lg" onClick={() => navigate('/register')}>
              Create Account <ArrowRight size={16} />
            </Button>
            <Button size="lg" variant="secondary" onClick={() => navigate('/login')}>
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: `1px solid ${BORDER}`, padding: '1.5rem 2.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', background: 'rgba(13,26,45,0.7)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 22, height: 22, background: `linear-gradient(135deg, ${ACCENT}, #3b82f6)`, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={10} color="#fff" />
          </div>
          <span style={{ fontWeight: 700, fontSize: 14, color: '#f8fafc' }}>PayFlow</span>
        </div>
        <div style={{ display: 'flex', gap: '1.75rem' }}>
          {['Privacy', 'Terms', 'Status', 'GitHub', 'Contact'].map(l => (
            <span key={l} style={{ fontSize: 13, color: MUTED, cursor: 'pointer' }}>{l}</span>
          ))}
        </div>
        <span style={{ fontSize: 12, color: MUTED }}>© 2026 PayFlow Inc.</span>
      </footer>

      {/* pulse keyframe */}
      <style>{`
        @keyframes pfpulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}