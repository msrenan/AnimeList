import { useState } from "react";

export function useAccount(id: string) {
    const [accountId, setAccountId] = useState<string>(id);
}