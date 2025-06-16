"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Passwords = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [shake, setShake] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (
      confirmPassword.length >= password.length &&
      e.target.value.length > confirmPassword.length
    ) {
      setShake(true);
    } else {
      setConfirmPassword(e.target.value);
    }
  };

  useEffect(() => {
    if (shake) {
      const timer = setTimeout(() => setShake(false), 500);
      return () => clearTimeout(timer);
    }
  }, [shake]);

  const getLetterStatus = (index: number) => {
    if (!confirmPassword[index]) return "";
    return password[index] === confirmPassword[index]
      ? "bg-green-500"
      : "bg-red-500";
  };

  const passwordsMatch = password === confirmPassword && password.length > 0;

  const matchAnimation = {
    transition: { duration: 0.3 },
  };

  return (
    <main className="full">
      <div className="z-10 flex w-full flex-col  full">
        <div className="mx-auto flex h-full w-full max-w-lg flex-col items-center justify-center gap-8 p-16">
          <h1 className="text-2xl font-bold text-start border-b w-full h-12">
            Change password
          </h1>
          <div className="flex w-full flex-col items-start justify-center gap-4">
            <div className="flex gap-2 flex-col w-full">
              <p className="text-muted-foreground">Enter new password</p>
              <div className="w-full relative">
                {!showConfirm ? (
                  <Input
                    className="placeholder:tracking-widest tracking-[.59rem] focus:border-foreground-muted"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                ) : (
                  <motion.div
                    className={cn(
                      "h-9 w-full rounded-md border px-2 py-2 bg-background"
                    )}
                    animate={{
                      ...matchAnimation,
                    }}
                  >
                    <div className="relative h-full w-fit overflow-hidden rounded-lg z-0">
                      <div className="z-10 flex h-full items-center justify-center px-0 py-1">
                        {password.split("").map((_, index) => (
                          <div
                            key={index}
                            className="flex h-full w-4 shrink-0 items-center justify-center"
                          >
                            <span
                              className={cn(
                                "size-[3.5px] bg-primary",
                                getLetterStatus(index)
                              )}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            <div className="w-full relative flex gap-2 flex-col">
              <p className="text-muted-foreground">Confirm password</p>
              <Input
                className="tracking-[.71rem] outline-none placeholder:tracking-widest focus:border-foreground-muted"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                onFocus={() => setShowConfirm(true)}
                onBlur={() => {
                  if (!passwordsMatch) setShowConfirm(false);
                }}
              />
            </div>
          </div>
          <Button className="w-full" disabled={!passwordsMatch}>
            Change password
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Passwords;
