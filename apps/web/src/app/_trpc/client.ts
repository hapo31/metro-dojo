import { createTRPCReact } from "@trpc/react-query";
import { type AppRouter } from "@metro-dojo/api";

export const trpc = createTRPCReact<AppRouter>({});
