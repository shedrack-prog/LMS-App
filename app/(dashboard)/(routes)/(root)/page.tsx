import { getDashboardCourses } from '@/actions/get-dashoard-courses';
import { CoursesList } from '@/components/courses-list';
import { auth } from '@clerk/nextjs';
import { CheckCircle, Clock } from 'lucide-react';
import { redirect } from 'next/navigation';
import { InfoCard } from './info-card';

export default async function Dashboard() {
  const { userId } = auth();
  if (!userId) {
    return redirect('/');
  }
  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    userId
  );
  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
        <InfoCard
          icon={Clock}
          numberOfItems={coursesInProgress.length}
          label={'In Progress'}
        />
        <InfoCard
          icon={CheckCircle}
          numberOfItems={completedCourses.length}
          label={'Completed'}
          variant="success"
        />
      </div>

      <CoursesList items={[...coursesInProgress, ...completedCourses]} />
    </div>
  );
}
