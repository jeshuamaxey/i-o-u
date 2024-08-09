"use client"

import { createClient } from "@/utils/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const {data: { user }} = await supabase.auth.getUser();
      setUser(user);
    }

    getUser();
  }, []);

  const showAvatar = user && user.email
  const avatarInitials = user?.email && user.email[0]

  return (
    <div className="w-full flex flex-col gap-16 items-center border-b border-slate-200">
      <div className="w-full flex px-4 md:px-8 py-2 gap-8 justify-between">
        <div className="flex items-center">
          <p>Split sage</p>
        </div>
        <div className="flex justify-end">
          {showAvatar ? (
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>{avatarInitials?.toUpperCase()}</AvatarFallback>
            </Avatar>
          ) : null}

          {!user && <Link href="/login">Sign in</Link>}
        </div>
      </div>
    </div>
  );
}
