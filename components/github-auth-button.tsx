"use client";

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import { Link } from "lucide-react";

export default function GoogleSignInButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  return (
    <>
      <a href="/register">
      <Button
        disabled={false}
        className="w-full"
        variant="outline"
        type="button"
      >
          <Icons.profile className="mr-2 h-4 w-4" />
          Register your account
      </Button>
      </a>
      <Button
        disabled={true}
        className="w-full"
        style={{marginTop: '10px'}}
        variant="outline"
        type="button"
        onClick={() =>
          signIn("github", { callbackUrl: callbackUrl ?? "/dashboard" })
        }
      >
        <Icons.gitHub className="mr-2 h-4 w-4" />
        Continue with Github
      </Button>
      <Button
        disabled={true}
        style={{marginTop: '10px'}}
        className="w-full"
        variant="outline"
        type="button"
        onClick={() =>
          signIn("github", { callbackUrl: callbackUrl ?? "/dashboard" })
        }
      >
        <Icons.logo className="mr-2 h-4 w-4" />
        Continue with Google
      </Button>
    </>
  );
}
