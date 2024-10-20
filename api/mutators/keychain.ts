import { useMutation } from "@tanstack/react-query";
import { mutateServerCredentials } from "./functions/storage";


export const serverCredentials = useMutation({
    mutationFn: mutateServerCredentials
});