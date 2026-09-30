import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { MOCK_BRANCHES, MOCK_STAFF_TELLER_QUEUES } from '../constants/mockData';
import { Branch, QueueTicket, ServiceType } from '../types';

export const QueueService = {
  async getBranches(): Promise<Branch[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('branches').select('*');
        if (!error && data && data.length > 0) {
          return data.map((b) => ({
            id: b.id,
            name: b.name,
            shortName: b.short_name,
            city: b.city,
            address: b.address,
            operatingHours: b.operating_hours,
            isOpen: b.is_open,
            services: [],
          }));
        }
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local data:', err);
      }
    }
    return MOCK_BRANCHES;
  },

  async getBranchTickets(branchId: string): Promise<QueueTicket[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('tickets')
          .select('*')
          .eq('branch_id', branchId)
          .neq('status', 'CANCELLED')
          .order('created_at', { ascending: true });

        if (!error && data) {
          return data.map((t) => ({
            id: t.id,
            ticketNumber: t.ticket_number,
            serviceType: t.service_type as ServiceType,
            serviceName: t.service_name,
            branchId: t.branch_id,
            branchName: 'Depok Branch',
            customerId: t.customer_id,
            customerName: t.customer_name,
            status: t.status,
            counterName: t.counter_name || undefined,
            nowServingNumber: t.now_serving_number || '',
            peopleAhead: t.people_ahead ?? 0,
            estimatedWaitMinutes: t.estimated_wait_minutes ?? 10,
            createdAt: t.created_at ? new Date(t.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
            calledAt: t.called_at || undefined,
            servedAt: t.served_at || undefined,
            completedAt: t.completed_at || undefined,
          }));
        }
      } catch (err) {
        console.warn('Supabase fetch branch tickets failed:', err);
      }
    }
    return [
      {
        id: '1',
        ticketNumber: 'T-017',
        serviceType: 'TELLER',
        serviceName: 'Teller',
        branchId,
        branchName: 'Depok Branch',
        customerId: 'c-1',
        customerName: 'Customer 1',
        status: 'SERVING',
        counterName: 'Counter 03',
        nowServingNumber: 'T-017',
        peopleAhead: 0,
        estimatedWaitMinutes: 0,
        createdAt: '09:40 AM',
      },
      {
        id: '2',
        ticketNumber: 'T-018',
        serviceType: 'TELLER',
        serviceName: 'Teller',
        branchId,
        branchName: 'Depok Branch',
        customerId: 'c-2',
        customerName: 'Customer 2',
        status: 'WAITING',
        counterName: 'Counter 03',
        nowServingNumber: 'T-017',
        peopleAhead: 1,
        estimatedWaitMinutes: 5,
        createdAt: '09:42 AM',
      },
      {
        id: '3',
        ticketNumber: 'T-019',
        serviceType: 'TELLER',
        serviceName: 'Teller',
        branchId,
        branchName: 'Depok Branch',
        customerId: 'c-3',
        customerName: 'Customer 3',
        status: 'WAITING',
        counterName: 'Counter 03',
        nowServingNumber: 'T-017',
        peopleAhead: 2,
        estimatedWaitMinutes: 10,
        createdAt: '09:45 AM',
      },
    ];
  },

  async getTicketById(ticketId: string): Promise<QueueTicket | null> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('tickets')
          .select('*')
          .eq('id', ticketId)
          .single();

        if (!error && data) {
          return {
            id: data.id,
            ticketNumber: data.ticket_number,
            serviceType: data.service_type as ServiceType,
            serviceName: data.service_name,
            branchId: data.branch_id,
            branchName: 'Depok Branch',
            customerId: data.customer_id,
            customerName: data.customer_name,
            status: data.status,
            counterName: data.counter_name || undefined,
            nowServingNumber: data.now_serving_number || '',
            peopleAhead: data.people_ahead ?? 0,
            estimatedWaitMinutes: data.estimated_wait_minutes ?? 10,
            createdAt: data.created_at ? new Date(data.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
            calledAt: data.called_at || undefined,
            servedAt: data.served_at || undefined,
            completedAt: data.completed_at || undefined,
          };
        }
      } catch (err) {
        console.warn('Supabase fetch ticket by id failed:', err);
      }
    }
    return null;
  },

  async createTicket(
    branchId: string,
    serviceType: ServiceType,
    branchName: string
  ): Promise<QueueTicket> {
    const serviceName =
      serviceType === 'CUSTOMER_SERVICE' ? 'Customer Service' : 'Teller';
    const prefix = serviceType === 'CUSTOMER_SERVICE' ? 'CS' : 'T';

    let countAhead = 0;
    if (isSupabaseConfigured && supabase) {
      try {
        const { count } = await supabase
          .from('tickets')
          .select('*', { count: 'exact', head: true })
          .eq('branch_id', branchId)
          .eq('service_type', serviceType)
          .eq('status', 'WAITING');
        countAhead = count || 0;
      } catch (e) {
        countAhead = 2;
      }
    }

    const randomNum = Math.floor(Math.random() * 80) + 20;
    const ticketNumber = `${prefix}-${String(randomNum).padStart(3, '0')}`;

    const newTicket: QueueTicket = {
      id: `ticket-${Date.now()}`,
      ticketNumber,
      serviceType,
      serviceName,
      branchId,
      branchName,
      customerId: 'guest-session',
      customerName: 'Customer',
      status: 'WAITING',
      counterName: serviceType === 'CUSTOMER_SERVICE' ? 'Counter 02' : 'Counter 03',
      nowServingNumber: `${prefix}-014`,
      peopleAhead: countAhead,
      estimatedWaitMinutes: serviceType === 'CUSTOMER_SERVICE' ? 15 : 5,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('tickets')
          .insert({
            ticket_number: newTicket.ticketNumber,
            branch_id: newTicket.branchId,
            service_type: newTicket.serviceType,
            service_name: newTicket.serviceName,
            customer_id: newTicket.customerId,
            customer_name: newTicket.customerName,
            status: newTicket.status,
            counter_name: newTicket.counterName,
            now_serving_number: newTicket.nowServingNumber,
            people_ahead: newTicket.peopleAhead,
            estimated_wait_minutes: newTicket.estimatedWaitMinutes,
          })
          .select()
          .single();

        if (!error && data) {
          return {
            ...newTicket,
            id: data.id,
          };
        }
      } catch (err) {
        console.warn('Supabase ticket creation failed, using local:', err);
      }
    }

    return newTicket;
  },

  async updateTicketStatus(
    ticketId: string,
    status: QueueTicket['status'],
    counterName?: string
  ): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      try {
        const updatePayload: Record<string, unknown> = { status };
        if (counterName) updatePayload.counter_name = counterName;
        if (status === 'CALLED') updatePayload.called_at = new Date().toISOString();
        if (status === 'SERVING') updatePayload.served_at = new Date().toISOString();
        if (status === 'SERVED') updatePayload.completed_at = new Date().toISOString();

        const { error } = await supabase
          .from('tickets')
          .update(updatePayload)
          .eq('id', ticketId);

        return !error;
      } catch (err) {
        console.warn('Supabase update status failed:', err);
      }
    }
    return true;
  },

  subscribeBranchTickets(branchId: string, onChange: () => void): () => void {
    if (!isSupabaseConfigured || !supabase) {
      return () => {};
    }

    const client = supabase;
    const channel = client
      .channel(`branch-tickets-${branchId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tickets',
          filter: `branch_id=eq.${branchId}`,
        },
        () => {
          onChange();
        }
      )
      .subscribe();

    return () => {
      client.removeChannel(channel);
    };
  },

  subscribeTicket(
    ticketId: string,
    onUpdate: (ticket: QueueTicket) => void
  ): () => void {
    if (!isSupabaseConfigured || !supabase) {
      return () => {};
    }

    const client = supabase;
    const channel = client
      .channel(`ticket-${ticketId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tickets',
          filter: `id=eq.${ticketId}`,
        },
        (payload) => {
          if (payload.new) {
            const raw = payload.new as Record<string, any>;
            onUpdate({
              id: raw.id,
              ticketNumber: raw.ticket_number,
              serviceType: raw.service_type as ServiceType,
              serviceName: raw.service_name,
              branchId: raw.branch_id,
              branchName: 'Depok Branch',
              customerId: raw.customer_id,
              customerName: raw.customer_name,
              status: raw.status,
              counterName: raw.counter_name || undefined,
              nowServingNumber: raw.now_serving_number || '',
              peopleAhead: raw.people_ahead ?? 0,
              estimatedWaitMinutes: raw.estimated_wait_minutes ?? 10,
              createdAt: raw.created_at ? new Date(raw.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
              calledAt: raw.called_at || undefined,
              servedAt: raw.served_at || undefined,
              completedAt: raw.completed_at || undefined,
            });
          }
        }
      )
      .subscribe();

    return () => {
      client.removeChannel(channel);
    };
  },
};
