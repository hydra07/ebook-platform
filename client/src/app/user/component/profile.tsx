'use client';
import React, { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { axiosWithAuth } from '@/lib/axios';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { checkoutWithVNPay } from './action';
import { useServerAction } from 'zsa-react';
import { toast } from '@/components/ui/use-toast';

const UserProfile = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const router = useRouter();
  const { execute } = useServerAction(checkoutWithVNPay, {
    onSuccess: () => {},
    onError: ({ err }) => {
      toast({
        variant: "error",
        title: 'Order Failed',
        description: `An error occurred, please try again later. ${err.message || ''}`,
      });
    }
  });

  useEffect(() => {
    setLoading(!user);
  }, [user]);

  const handleClickPayment = async () => {
    const result = await execute();
    if (result[0] && result[0].success) {
      router.push(result[0].redirectUrl as string);
    }
  }

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

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <Card className="w-full max-w-3xl mx-auto mt-8 shadow-lg">
      <CardHeader className="pb-2">
        <h1 className="text-2xl font-bold text-gray-800">User Information</h1>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">{user?.name}</h2>
              <p className="text-gray-500">{user?.email}</p>
              <p className="text-gray-500">Username: {user?.username}</p>
              <p className="text-gray-500">Role: {user?.role.join(', ')}</p>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Additional Information</h3>
              <Button onClick={handleClickPayment} className="mt-2 bg-blue-600 text-white hover:bg-blue-700 transition duration-200">
                Upgrade to Premium
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;