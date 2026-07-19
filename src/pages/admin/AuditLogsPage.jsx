import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Activity, Clock } from 'lucide-react';
import { fetchAuditLogs } from '../../store/slices/auditSlice';

export default function AuditLogsPage() {
  const dispatch = useDispatch();
  const { items: logs, status } = useSelector((state) => state.audit);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAuditLogs());
    }
  }, [dispatch, status]);

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-100">Sistem Logları</h2>
        <p className="text-sm text-slate-400">Tüm yönetici işlemlerinin denetim izleri.</p>
      </div>

      <div className="glass-panel p-6 rounded-2xl">
        <div className="space-y-4">
          {logs.map(log => (
            <div key={log.id} className="flex gap-4 p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
              <div className="mt-1">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
                  <Activity size={16} />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-slate-200">
                    <span className="text-sky-400">{log.userId}</span> • {log.action}
                  </h4>
                  <span className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock size={12} /> {new Date(log.timestamp).toLocaleString('tr-TR')}
                  </span>
                </div>
                <p className="text-sm text-slate-400 mt-1">{log.details}</p>
                <div className="mt-2 text-[10px] text-slate-500 uppercase tracking-wide">
                  Hedef ID: {log.target}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
