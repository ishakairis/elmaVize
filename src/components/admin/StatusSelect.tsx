'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface StatusSelectProps {
  id: string;
  currentStatus: string;
  type: 'application' | 'message';
}

const applicationStatuses = ['new', 'contacted', 'processing', 'completed'];
const messageStatuses = ['new', 'read', 'replied'];

export default function StatusSelect({ id, currentStatus, type }: StatusSelectProps) {
  const [status, setStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const statuses = type === 'application' ? applicationStatuses : messageStatuses;

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true);
    setStatus(newStatus);

    try {
      const endpoint = type === 'application' ? 'applications' : 'messages';
      const response = await fetch(`/api/admin/${endpoint}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      toast({
        title: 'Success',
        description: 'Status updated successfully',
      });

      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update status',
        variant: 'destructive',
      });
      setStatus(currentStatus);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Select
      value={status}
      onValueChange={handleStatusChange}
      disabled={isUpdating}
    >
      <SelectTrigger className={`${
        status === 'new' ? 'border-blue-300 bg-blue-50' :
        status === 'contacted' || status === 'read' ? 'border-yellow-300 bg-yellow-50' :
        status === 'processing' ? 'border-purple-300 bg-purple-50' :
        'border-green-300 bg-green-50'
      }`}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {statuses.map((s) => (
          <SelectItem key={s} value={s}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
