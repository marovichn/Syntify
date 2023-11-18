"use client";

import React, { FC, useState } from "react";

import { Database } from "@/types_db";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  SessionContextProvider,
  SupabaseClient,
} from "@supabase/auth-helpers-react";

interface SupabaseProviderProps {
  children: React.ReactNode;
}

const SupabaseProvider: FC<SupabaseProviderProps> = ({ children }) => {
  const [supabaseClient] = useState(() =>
    //@ts-ignore
    createClientComponentClient<Database>()
  );

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  );
};

export default SupabaseProvider;
