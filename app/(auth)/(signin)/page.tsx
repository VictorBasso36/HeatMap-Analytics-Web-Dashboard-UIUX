import { Metadata } from "next";
import Link from "next/link";
import UserAuthForm from "@/components/forms/user-auth-form";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "HeatMap - Análises de dados",
  description: "Faça seu login e explore seus dados.",
};

export default function AuthenticationPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          🔥
          HeatMap - Análises de dados.
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;HeatMap - Analytics. é uma plataforma inovadora de software como serviço (SaaS) que fornece análises visuais poderosas para o seu site. Ele cria mapas de calor interativos com base nas interações do usuário com seu site, incluindo cliques e movimentos do mouse.&rdquo;
            </p>
            <footer className="text-sm">Victor Basso Dev<span style={{color: '#ea1e77'}}>_</span></footer>
          </blockquote>
        </div>
      </div>
      <div className="p-4 lg:p-8 h-full flex items-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
            Bem-Vindo ! <br /> Faça seu login para visualizar seu mapa de calor🔥
            </h1>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
              Ao clicar em continuar, você concorda com nossos{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Termos de serviço
            </Link>{" "}
            e{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              política de Privacidade
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
