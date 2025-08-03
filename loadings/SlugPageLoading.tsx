import React from 'react';
import { motion } from 'framer-motion';
import { MoveLeft, Link, Video, NotepadTextDashed } from 'lucide-react';

interface SectionSkeletonProps {
  icon: React.ReactNode;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

const SkeletonLine: React.FC<{ width?: string; height?: string; className?: string }> = ({
  width = 'w-full',
  height = 'h-4',
  className = '',
}) => (
  <motion.div
    variants={itemVariants}
    className={`bg-gray-300 rounded-md ${width} ${height} ${className}`}
  ></motion.div>
);

const CardSkeleton: React.FC = () => (
  <motion.div
    variants={itemVariants}
    className='bg-white rounded-xl p-6 flex flex-col gap-4 shadow-sm h-48'
  >
    <SkeletonLine width='w-3/4' height='h-6' />
    <div className='flex-1 flex flex-col gap-2'>
      <SkeletonLine />
      <SkeletonLine width='w-5/6' />
      <SkeletonLine width='w-2/3' />
    </div>
  </motion.div>
);

const SectionTitleSkeleton: React.FC<{ icon: React.ReactNode }> = ({ icon }) => (
  <motion.h2
    variants={itemVariants}
    className='text-2xl md:text-3xl font-bold text-gray-800 flex gap-2 items-center'
  >
    {icon}
    <SkeletonLine width='w-48' height='h-8' />
  </motion.h2>
);

const SlugPageLoading: React.FC = () => {
  return (
    <main className='min-h-dvh flex flex-col items-center py-8'>
      <motion.div
        className='w-full max-w-6xl p-4 md:p-8 flex flex-col gap-8'
        variants={containerVariants}
        initial='hidden'
        animate='show'
      >
        {/* Back button skeleton */}
        <SkeletonLine width='w-24' height='h-6' />

        {/* Title and Description Skeletons */}
        <div className='flex flex-col gap-4'>
          <SkeletonLine height='h-12' className='w-full' />
          <SkeletonLine height='h-6' className='w-full' />
          <SkeletonLine height='h-6' className='w-11/12' />
        </div>

        {/* Thumbnail Image Skeleton */}
        <motion.div
          variants={itemVariants}
          className='w-full max-h-96 h-64 bg-gray-100 rounded-xl shadow-lg'
        ></motion.div>

        {/* Hyperlinks Section Skeleton */}
        <section className='flex flex-col gap-4'>
          <SectionTitleSkeleton icon={<Link className='text-blue-400 h-10 w-10' />} />
          <motion.div
            variants={containerVariants}
            className='grid grid-cols-1 sm:grid-cols-2 gap-4'
          >
            <CardSkeleton />
            <CardSkeleton />
          </motion.div>
        </section>

        {/* Videos Section Skeleton */}
        <section className='flex flex-col gap-4'>
          <SectionTitleSkeleton icon={<Video className='text-red-400 h-10 w-10' />} />
          <motion.div
            variants={containerVariants}
            className='grid grid-cols-1 sm:grid-cols-2 gap-4'
          >
            <CardSkeleton />
            <CardSkeleton />
          </motion.div>
        </section>

        {/* Syllabus Section Skeleton */}
        <section className='flex flex-col gap-4'>
          <SectionTitleSkeleton
            icon={<NotepadTextDashed className='text-green-400 h-10 w-10' />}
          />
          <motion.div
            variants={containerVariants}
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
          >
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </motion.div>
        </section>
      </motion.div>
    </main>
  );
};

export default SlugPageLoading;