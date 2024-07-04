"use client"

import { useToast } from "@/components/ui/use-toast";
import { Message } from "@/models/User";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Dashboard = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setisloading] = useState(false);
  const [isSwitchLoading, setisswitchloading] = useState(false);
  const { toast } = useToast();


  const handleDeleteMessage=(messageId:string)=>{
     setMessages(messages.filter(m=>m.id !== messageId));
  }

  const {data:session}=useSession()

  const form=useForm({
    resolver:zodResolver(acceptMessageSchema)
  })

  const {register,watch,setValue}=form;

  const acceptMessages=watch('acceptMessages');

  const fetchacceptMessage=useCallback(async()=>{
    setisswitchloading(true);
    try {
      const response = await axios.get<ApiResponse>("/api/accept-messages")
      setValue('acceptMessages',response.data.isAcceptingMessage)
    } catch (error) {
      const axiosError =error as AxiosError<ApiResponse>
      toast({
        title:"Error",
        description:"Failed to fetch accept messages",
        variant:"destructive"
      })
    }finally{
       setisswitchloading(false);
    }
  },[setValue])

  const fetchMessages=useCallback(async(refresh:boolean=false)=>{
    setisloading(true);
    setisswitchloading(false);
    try {
      const response = await axios.get<ApiResponse>("/api/get-messages");
      setMessages(response.data.messages||[]);
      if(refresh){
        toast({
          title:"Refereshed messages",
          description:"Showing Latest Messages",
          
        })
      }
    } catch (error) {
      toast({
        title:"Error",
        description:"Failed to fetch messages",
        variant:"destructive"
      })
    }finally{
    setisloading(false);
    setisswitchloading(false);
    }
  },[setisloading,setMessages]);

  useEffect(() => {
    if(!session || !session.user){
      return;
    }

    fetchMessages();
    fetchacceptMessage();
    
  },[session,setValue,fetchMessages,fetchacceptMessage])

  const handleSwitchChange=async () => {
    try {
      const response = await axios.post<ApiResponse>('/api/accept-messages',{
        acceptMessages:!acceptMessages
      })
      setValue('acceptMessages',!acceptMessages)
      toast({
        title:response.data.message,
      })
    } catch (error) {
      toast({
        title:"Error",
        description:"Failed to fetch messages settings",
        variant:"destructive"
      })
    }
  }

  if(!session || !session.user){
    return <div>Please Login</div>
  }


  return <div>Dashboard</div>;
};

export default Dashboard;
