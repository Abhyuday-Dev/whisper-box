"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signupSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";

const page = () => {
  const [userame, setUserame] = useState("");
  const [userameMessage, setUserameMessage] = useState("");
  const [isCheckingUsename, setIsCheckingUsename] = useState(false);

  const [isSumittings, setSumittings] = useState(false);
  const debouncedUsername = useDebounceValue(userame, 300);
  const { toast } = useToast();
  const router = useRouter();

  //zod
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (debouncedUsername) {
        setIsCheckingUsename(true);
        setUserameMessage("");

        try {
          const response = await axios.get(
            `/api/check-username-unique?username=${debouncedUsername}`
          );

          setUserameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUserameMessage(
            axiosError.response?.data.message ?? "Error checking userame"
          );
        } finally {
          setIsCheckingUsename(false);
        }
      }

      checkUsernameUnique();
    };
  }, [debouncedUsername]);

  return <div>page</div>;
};

export default page;
