'use client';
import React, { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { env } from '@/lib/validateEnv';
import useAuth from '@/hooks/useAuth';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

const UserProfile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (user?._id) {
        try {
          const response = await axios.get(`${env.NEXT_PUBLIC_API_URL}/api/user`);
          setUserData(response.data);
        } catch (err: any) {
          setError(err.response.data.error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user]);

  if (loading) {
    return (
      <Card className="w-full max-w-3xl mx-auto mt-8">
        <CardHeader className="pb-2">
          <Skeleton className="h-12 w-[250px]" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-20 w-20 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-3xl mx-auto mt-8 border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-3xl mx-auto mt-8">
      <CardHeader className="pb-2">
        <h1 className="text-2xl font-bold text-gray-800">Thông tin người dùng</h1>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <Avatar className="w-32 h-32">
            <AvatarImage src={user?.image} alt={user?.name} />
            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">{user?.name}</h2>
              <p className="text-gray-500">{user?.email}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {user?.role.map((role, index) => (
                <Badge key={index} variant="secondary">{role}</Badge>
              ))}
            </div>
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Thông tin bổ sung</h3>
              {/* <p className="text-gray-600">Ngày tham gia: {new Date(user?.createdAt).toLocaleDateString('vi-VN')}</p>
              <p className="text-gray-600">Số bài viết: {userData?.postCount || 0}</p> */}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;