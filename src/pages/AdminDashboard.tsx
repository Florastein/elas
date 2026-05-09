import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useOrders, OrderStatus } from '../context/OrderContext';
import { LogOut, Package, Clock, CheckCircle2, XCircle, Loader2, ChevronDown } from 'lucide-react';

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; icon: typeof Clock }> = {
  pending:    { label: 'Pending',    color: 'text-amber-600 bg-amber-50 border-amber-200', icon: Clock },
  processing: { label: 'Processing', color: 'text-blue-600 bg-blue-50 border-blue-200',   icon: Loader2 },
  completed:  { label: 'Completed',  color: 'text-emerald-600 bg-emerald-50 border-emerald-200', icon: CheckCircle2 },
  rejected:   { label: 'Rejected',   color: 'text-red-500 bg-red-50 border-red-200',       icon: XCircle },
};

type FilterTab = 'all' | OrderStatus;

export default function AdminDashboard() {
  const { logout } = useAuth();
  const { orders, loading, updateStatus } = useOrders();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredOrders = activeTab === 'all'
    ? orders
    : orders.filter(o => o.status === activeTab);

  const counts = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    completed: orders.filter(o => o.status === 'completed').length,
    rejected: orders.filter(o => o.status === 'rejected').length,
  };

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const tabs: { key: FilterTab; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'processing', label: 'Processing' },
    { key: 'completed', label: 'Completed' },
    { key: 'rejected', label: 'Rejected' },
  ];

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      + ' · '
      + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-bg/80 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package className="w-5 h-5 text-text-muted" />
            <span className="text-base font-semibold">Orders</span>
            <span className="text-xs text-text-muted bg-surface border border-border rounded-full px-2.5 py-0.5 tabular-nums">
              {counts.all}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-text-muted hover:text-text-main transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {([
            { label: 'Pending',    count: counts.pending,    color: 'text-amber-600' },
            { label: 'Processing', count: counts.processing, color: 'text-blue-600' },
            { label: 'Completed',  count: counts.completed,  color: 'text-emerald-600' },
            { label: 'Rejected',   count: counts.rejected,   color: 'text-red-500' },
          ]).map(s => (
            <div key={s.label} className="card !p-5">
              <p className="text-xs text-text-muted mb-1">{s.label}</p>
              <p className={`text-2xl font-semibold tabular-nums ${s.color}`}>{s.count}</p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.key
                  ? 'bg-accent text-white'
                  : 'text-text-muted hover:bg-surface'
              }`}
            >
              {tab.label}
              <span className="ml-1.5 text-xs opacity-60">{counts[tab.key]}</span>
            </button>
          ))}
        </div>

        {/* Orders list */}
        {loading ? (
          <div className="text-center py-20">
            <Loader2 className="w-6 h-6 text-text-muted animate-spin mx-auto mb-3" />
            <p className="text-sm text-text-muted">Loading orders…</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Package className="w-10 h-10 text-text-muted/30 mx-auto mb-4" />
            <p className="text-sm text-text-muted">No orders yet</p>
          </motion.div>
        ) : (
          <div className="space-y-2">
            <AnimatePresence initial={false}>
              {filteredOrders.map((order, i) => {
                const cfg = STATUS_CONFIG[order.status];
                const Icon = cfg.icon;
                const isExpanded = expandedId === order.id;

                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, delay: i * 0.03 }}
                    className="card !p-0 overflow-hidden"
                  >
                    {/* Row summary */}
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : order.id)}
                      className="w-full px-5 py-4 flex items-center gap-4 text-left hover:bg-surface/50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-sm font-medium text-text-main truncate">
                            {order.phoneNumber}
                          </span>
                          <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${cfg.color}`}>
                            <Icon className={`w-3 h-3 ${order.status === 'processing' ? 'animate-spin' : ''}`} />
                            {cfg.label}
                          </span>
                        </div>
                        <p className="text-xs text-text-muted">
                          {order.network} · {order.plan} · ₵{order.price.toFixed(2)}
                        </p>
                      </div>

                      <span className="text-xs text-text-muted whitespace-nowrap hidden sm:block">
                        {formatDate(order.createdAt)}
                      </span>

                      <ChevronDown className={`w-4 h-4 text-text-muted transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Expanded details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-4 pt-1 border-t border-border">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 text-sm">
                              <div>
                                <p className="text-xs text-text-muted mb-0.5">Order ID</p>
                                <p className="text-text-main font-mono text-xs">{order.id.slice(0, 8)}</p>
                              </div>
                              <div>
                                <p className="text-xs text-text-muted mb-0.5">Network</p>
                                <p className="text-text-main">{order.network}</p>
                              </div>
                              <div>
                                <p className="text-xs text-text-muted mb-0.5">Plan</p>
                                <p className="text-text-main">{order.plan}</p>
                              </div>
                              <div>
                                <p className="text-xs text-text-muted mb-0.5">Amount</p>
                                <p className="text-text-main font-medium">₵{order.price.toFixed(2)}</p>
                              </div>
                              <div>
                                <p className="text-xs text-text-muted mb-0.5">Email</p>
                                <p className="text-text-main text-xs truncate">{order.email || '—'}</p>
                              </div>
                              <div>
                                <p className="text-xs text-text-muted mb-0.5">Payment Ref</p>
                                <p className="text-text-main font-mono text-xs truncate">{order.paymentRef || '—'}</p>
                              </div>
                            </div>

                            {/* Actions */}
                            {(order.status === 'pending' || order.status === 'processing') && (
                              <div className="flex gap-2 pt-2">
                                {order.status === 'pending' && (
                                  <button
                                    onClick={() => updateStatus(order.id, 'processing')}
                                    className="btn-primary text-xs py-2 px-4"
                                  >
                                    Start processing
                                  </button>
                                )}
                                {order.status === 'processing' && (
                                  <button
                                    onClick={() => updateStatus(order.id, 'completed')}
                                    className="text-xs py-2 px-4 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors"
                                  >
                                    Mark completed
                                  </button>
                                )}
                                <button
                                  onClick={() => updateStatus(order.id, 'rejected')}
                                  className="text-xs py-2 px-4 rounded-lg border border-border text-text-muted font-medium hover:border-red-300 hover:text-red-500 transition-colors"
                                >
                                  Reject
                                </button>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
