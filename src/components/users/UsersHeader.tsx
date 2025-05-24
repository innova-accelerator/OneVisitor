
import React from 'react';
import { UsersIcon, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface UsersHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddUser?: () => void;
  isAddDisabled?: boolean;
  addDisabledTooltip?: string;
}

export function UsersHeader({ 
  searchQuery, 
  onSearchChange, 
  onAddUser,
  isAddDisabled,
  addDisabledTooltip
}: UsersHeaderProps) {
  const addUserButton = (
    <Button onClick={onAddUser} disabled={isAddDisabled || !onAddUser}>
      <Plus className="h-4 w-4 mr-2" />
      Add User
    </Button>
  );

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <UsersIcon className="h-6 w-6" />
        <h1 className="text-2xl font-bold">User Management</h1>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <div className="w-full sm:w-64">
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full"
          />
        </div>
        
        {addDisabledTooltip && isAddDisabled ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                {addUserButton}
              </TooltipTrigger>
              <TooltipContent>
                <p>{addDisabledTooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          addUserButton
        )}
      </div>
    </div>
  );
}
