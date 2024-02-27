"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string(),
  password: z.string().min(8, "Password must be at least 8 characters!"),
});

type loginSchemaType = z.infer<typeof loginSchema>;

function page() {
  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
    reset,
  } = useForm<loginSchemaType>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: loginSchemaType) => {
    const response = await axios.post(
      "http://127.0.0.1:8000/auth/jwt/create",
      data
    );
    console.log(response);

    try {
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
    } catch (error) {
      console.error(`Something went wrong! ${error}`);
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="h-screen flex flex-col gap-4 justify-center w-[500px] mx-auto">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
          Login
        </h1>
        <div className="flex flex-col gap-1">
          <Label htmlFor="username" className="m-1">
            Username
          </Label>
          <Input
            {...register("username")}
            id="username"
            placeholder="Enter your username"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="password" className="m-1">
            Password
          </Label>
          <Input
            {...register("password")}
            type="password"
            id="password"
            placeholder="Enter your password"
          />
          {errors.username && (
            <p className="text-red-500 text-sm py-1">{`${errors.username.message}`}</p>
          )}
        </div>
        <Button type="submit" className="mt-3">
          Login
        </Button>
      </div>
    </form>
  );
}

export default page;
