'use client';
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toHumanReadable } from '@/utils/helpers';
import Link from 'next/link';
import { getUsersRs } from '@/utils/rockset';
import S from './text/s';

export default function Leaderboard() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1208);

    const fetchUsers = async () => {
      setIsLoading(true);
      const users = await getUsersRs();
      if (users) setUsers(users);
      setIsLoading(false);
    };

    fetchUsers().catch(console.error);
  }, []);

  if (isLoading) {
    return <S>Enjoying ...</S>;
  }

  return (
    <div className="flex flex-col gap-6 h-full overflow-y-scroll relative bg-white scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-primary scrollbar-track-white">
      <Table className="relative">
        <TableHeader className="sticky w-full top-0">
          <TableRow className="w-full">
            <TableHead className="w-[100px]">Rank</TableHead>
            <TableHead className="w-[100px]">Account</TableHead>
            {!isMobile && <TableHead>Creation Streak (Weeks)</TableHead>}
            {!isMobile && <TableHead>Collect Streak (Weeks)</TableHead>}
            {!isMobile && <TableHead>Unique Collectors</TableHead>}
            {!isMobile && <TableHead>Unique Mints</TableHead>}
            <TableHead>Weekly Tipping Allowance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users
            ?.sort((a: any, b: any) => b.base_allowance - a.base_allowance)
            .map((user: any, index: number) => (
              <TableRow key={user.wallet}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Link
                    target="_blank"
                    href={`https://zora.co/${user.wallet}`}
                    className="text-primary hover:underline"
                  >
                    {user?.ens?.slice(0, 20) ||
                      `${user.wallet.slice(0, 6)}...${user.wallet.slice(-4)}`}
                  </Link>
                </TableCell>
                {!isMobile && (
                  <TableCell>
                    {user.weeks_with_collectors_in_last_52 || 0}
                  </TableCell>
                )}
                {!isMobile && (
                  <TableCell>{user.collect_streak_unique_mints || 0}</TableCell>
                )}
                {!isMobile && (
                  <TableCell>{user.unique_collectors || 0}</TableCell>
                )}
                {!isMobile && <TableCell>{user.unique_mints || 0}</TableCell>}
                <TableCell>{toHumanReadable(user.allowance)}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
