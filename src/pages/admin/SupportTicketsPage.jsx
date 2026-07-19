import { useEffect, useState } from 'react';
import { LifeBuoy, Search, Filter, MessageSquare, Clock } from 'lucide-react';

export default function SupportTicketsPage() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch('https://kolaygider-api.onrender.com/tickets')
      .then(r => r.json())
      .then(data => setTickets(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Destek Talepleri</h2>
          <p className="text-sm text-slate-400">Kullanıcılardan gelen yardım talepleri ve ticket yönetimi.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
           <div className="glass-panel p-5 rounded-2xl relative overflow-hidden border-t-2 border-rose-500/50">
             <h3 className="text-sm font-medium text-slate-400 mb-1">Açık Talepler</h3>
             <p className="text-3xl font-bold text-rose-400">{tickets.filter(t=>t.status === 'open').length}</p>
           </div>
           <div className="glass-panel p-5 rounded-2xl relative overflow-hidden border-t-2 border-emerald-500/50">
             <h3 className="text-sm font-medium text-slate-400 mb-1">Çözülen Talepler</h3>
             <p className="text-3xl font-bold text-emerald-400">{tickets.filter(t=>t.status === 'resolved').length}</p>
           </div>
        </div>
        
        <div className="lg:col-span-2 glass-panel p-5 rounded-2xl flex flex-col gap-4">
           {tickets.map(ticket => (
             <div key={ticket.id} className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:border-indigo-500/30 transition-colors">
               <div className="flex justify-between items-start mb-2">
                 <h3 className="font-bold text-slate-100 flex items-center gap-2">
                   <MessageSquare size={16} className="text-indigo-400" /> {ticket.subject}
                 </h3>
                 <span className={`px-2 py-1 text-[10px] uppercase font-bold rounded-md ${
                    ticket.status === 'open' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'
                 }`}>
                   {ticket.status === 'open' ? 'Açık' : 'Çözüldü'}
                 </span>
               </div>
               <p className="text-sm text-slate-400 mb-3">{ticket.description}</p>
               <div className="flex justify-between items-center text-xs text-slate-500">
                 <span className="flex items-center gap-1"><Clock size={12}/> {new Date(ticket.createdAt).toLocaleString('tr-TR')}</span>
                 <span className="font-medium text-slate-300">{ticket.businessId}</span>
               </div>
             </div>
           ))}
           {tickets.length === 0 && (
             <div className="py-10 text-center text-slate-500">Şu an hiç destek talebi yok.</div>
           )}
        </div>
      </div>
    </div>
  );
}
