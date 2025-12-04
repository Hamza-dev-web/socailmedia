"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import React, { useState } from 'react';
import ImageUploading from 'react-images-uploading';
import Image from "next/image"
import { useEffect } from "react"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { getPostesByPosterName, getUsers } from "@/lib/action/user.action"
import { useUser } from "@clerk/nextjs"

export default function Create ({params:{id}} :{params:{id :string}}){
    const [images, setImages] = React.useState([]);
    const [Posts , setPosts ] =useState<any>([])
    const {user} = useUser()
    useEffect(()=>{
   const    handeler = async ()=>{
    await getUsers(user?.emailAddresses[0].emailAddress as string)
  const posts = await  getPostesByPosterName(user?.username as string)  
if(posts) {
  setPosts(posts as any)
} 
}
      handeler()
    } ,[])
    
    const onChange = (imageList :any, addUpdateIndex :any) => {
        // data for submit

        console.log(imageList, addUpdateIndex);
        setImages(imageList.data_url);
      };
    const formSchema = z.object({
        title: z.string().min(2, {
          message: "Username must be at least 2 characters.",
        }),
     
  
      })
      let form 
        if (Posts.length > 0) {
          for (let i = 0 ; i < Posts.length ;i++){
            form = useForm<z.infer<typeof formSchema>>({
              resolver: zodResolver(formSchema),
              defaultValues: {
                title: Posts[i].title,
            
              },
            })
          }
          
        } 

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

       //sm:ml-0  md:flex flex-col  rounded-md  ml-[600px]  justify-center min-h-screen   items-center  w-[1300px]  h-full  bg-gradient-to-r from-gray-400 via-blue to-gray-200
    return (
        <main className="    sm:w-screen   md:ml-3 xl:ml-[200px] md:flex sm:ml-0 sm:flex  xl:w-[1200px]    lg:flex  flex-col  rounded-md   items-center   w-[1200px]  h-full   bg-slate-100 shadow-xl ">
    <h1 className=" text-black text-[50px] font-extrabold"> Welcome to the Edit Posts Page 👋</h1>
    <Form {...form! } >
      <form onSubmit={form?.handleSubmit(onSubmit)} className="space-y-8  gap-10   bg-gradient-to-r from-slate-800 via-blue to-gray-200 w-[600px] h-[600px] rounded-lg p-5  items-center">
      <FormField
          control={form?.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
         
              <FormMessage />
            </FormItem>
          )}
        />

<div className="flex flex-col">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={1}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
      
          <div className=" flex justify-between  gap-10 flex-row flex-wrap items-center">
          {images.length  == 0 &&
          ( 
            <div    onClick={onImageUpload} className=" flex justify-between  gap-36 flex-row flex-wrap items-center">
            <button
              style={isDragging ? { color: 'red' } : undefined}
              {...dragProps}
              className=" text-[30px] font-bold font-mono"
            >
              Click or Drop here
            </button>
            <Image 
   src="/up.png"
   width={40}
   height={40}
   alt=""
   className=" rounded-lg pr " 
    />
          
          </div> )}
            { images.length > 0 &&<button  className=" text-[30px] font-bold font-mono" onClick={onImageRemoveAll}>Remove all images</button>}
            {images.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="100" />
                <div className=" flex  gap-4 ">
                  <button  className="  font-thin" onClick={() => onImageUpdate(index)}>Update</button>
                  <button className=" font-thin" onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
         
        <Button className=" mt-5" type="submit">Submit</Button>
      </form>
    </Form>
        </main>
    )
}