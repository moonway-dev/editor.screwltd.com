"use client";
import { title } from "@/components/primitives";
import { Avatar } from "@nextui-org/avatar";
import { Card } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { useAuth } from "@/components/context/auth-context";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="p-6 flex flex-col items-center space-y-6">
      {user ? (
        <>
          <Card className="w-full max-w-md p-4 shadow-lg border-transparent bg-white/5 dark:bg-default-400/10">
            <div className="flex flex-col items-center">
              <Avatar src={user.picture} className="w-20 h-20" isBordered color="secondary" />
              <p className="mt-4 text-lg font-semibold">{user.username}</p>
              <div className="mt-2 p-4 rounded-lg shadow-inner w-full text-center border-transparent bg-white/5 dark:bg-default-400/10">
                <p className="text-xl font-bold">$0.00</p>
                <p className="text-md">0.00 SLDG</p>
              </div>
            </div>
          </Card>
          <Card className="w-full max-w-md p-4 border-transparent bg-white/5 dark:bg-default-400/10">
            <p>Works in the workshop</p>
            <div className="mt-4 space-y-4">
              {/*
              {posts.length > 0 ? (
                posts.map((post, index) => (
                  <div key={index} className="p-6 border-transparent bg-white/5 dark:bg-default-400/10 rounded-lg shadow-lg bg-white">
                    <h2 className="text-xl font-semibold text-gray-200 mb-2">{post.title}</h2>
                  </div>
                ))
              ) : (
              */}
              <p className="text-gray-500 text-sm">Looks like there's nothing here...</p>
              {/*
              )}
              */}
            </div>
          </Card>
        </>
      ) : (
        <p>Login to your account first</p>
      )}
    </div>
  );
}
