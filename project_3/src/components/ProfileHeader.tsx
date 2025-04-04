import React from 'react';
import { ChevronLeft, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProfileHeaderProps {
  title: string;
  showBack?: boolean;
  showMore?: boolean;
  onMoreClick?: () => void;
}

export function ProfileHeader({ title, showBack = true, showMore = true, onMoreClick }: ProfileHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center">
        {showBack && (
          <Link to="/" className="mr-2">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </Link>
        )}
        <h1 className="text-lg font-medium">{title}</h1>
      </div>
      {showMore && (
        <button onClick={onMoreClick} className="p-1">
          <MoreVertical className="w-6 h-6 text-gray-600" />
        </button>
      )}
    </div>
  );
}