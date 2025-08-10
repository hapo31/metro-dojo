"use client";

import type { AppRouter } from "@metro-dojo/api";
import { type CreateTRPCReact, createTRPCReact } from "@trpc/react-query";

export const api: CreateTRPCReact<AppRouter, unknown> =
  createTRPCReact<AppRouter>();
