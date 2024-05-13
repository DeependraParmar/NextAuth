'use client';

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const Social = () => {
  const onClick = async(provider: 'google' | 'github') => {
    await signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT
    });
  }
  return (
    <div className="flex items-center w-full gap-x-2">
        <Button size={'lg'} className="w-full gap-2" variant={'outline'} onClick={() => onClick('google')}><FcGoogle className="h-5 w-5" /></Button>
        <Button size={'lg'} className="w-full gap-2" variant={'outline'} onClick={() => onClick('github')}><FaGithub className="h-5 w-5" /></Button>
    </div>
  )
}

export default Social
