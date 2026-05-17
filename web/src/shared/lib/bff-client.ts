import axios from "axios";

import { applyAuthInterceptors } from "@/shared/lib/auth-client";

export const bffClient = axios.create({
  withCredentials: true,
});

applyAuthInterceptors(bffClient);
