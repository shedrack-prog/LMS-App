import { IconBadge } from '@/components/icon-badge';
import { LucideIcon } from 'lucide-react';

interface InfoCardProps {
  numberOfItems: number;
  variant?: 'default' | 'success';
  label: string;
  icon: LucideIcon;
}

export const InfoCard = ({
  label,
  numberOfItems,
  icon: Icon,
  variant,
}: InfoCardProps) => {
  return (
    <div className="flex border rounded-md items-center gap-x-2 px-3 ">
      <IconBadge variant={variant} icon={Icon} />
      <div>
        <p className="font-medium">{label}</p>

        <p className="text-gray-500 text-sm">
          {numberOfItems} {numberOfItems === 1 ? 'Course' : 'Courses'}{' '}
        </p>
      </div>
    </div>
  );
};
