import { AlertCircleIcon } from 'lucide-react';

interface ErrorStateProps {
  title: string;
  description: string;
}

export const ErrorState = ({ title, description }: ErrorStateProps) => {
  return (
    <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <div className='flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm'>
        <AlertCircleIcon className='size-6 text-red-500' />
        <div className='flex flex-col gap-y-2 text-center'>
          <h6 className='text-lg font-medium'>{title}</h6>
          <p className='text-sm text-muted-foreground'>{description}</p>
        </div>
      </div>
    </div>
  );
};
