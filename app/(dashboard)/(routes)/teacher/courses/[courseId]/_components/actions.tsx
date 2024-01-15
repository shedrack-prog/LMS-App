'use client';

import { ConfirmModal } from '@/components/modals/confirm-modal';
import { Button } from '@/components/ui/button';
import { useConfettiStore } from '@/hooks/use-confetti-store';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface ActionProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean | null;
}

const Actions = ({ disabled, courseId, isPublished }: ActionProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const confetti = useConfettiStore();

  const handleClick = async () => {
    try {
      setIsLoading(true);
      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast.success('Course unpublished');
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`);
        toast.success('Course published');
        confetti.onOpen();
      }
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}`);
      toast.success('Course deleted');
      router.refresh();
      router.push(`/teacher/courses/`);

      toast.success('Course deleted.');
    } catch (error) {
      toast.error('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        disabled={disabled || isLoading}
        variant={'outline'}
        size="sm"
        onClick={handleClick}
      >
        {isPublished ? 'Unpublish ' : 'Publish'}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm">
          <Trash className="w-4 h-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default Actions;