"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import React, { useEffect } from 'react';
import ImageUploading from 'react-images-uploading';
import Image from "next/image"
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
import { Textarea } from "@/components/ui/textarea"
import {  getUsers } from "@/lib/action/user.action"
import { CreatePosts } from "@/lib/action/posts.action"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/clerk-react"
export default function Create ({params:{id}} :{params:{id :string}}){

  const {user} = useUser()
  useEffect(()=>{
 const    handeler = async ()=>{
await getUsers(user?.emailAddresses[0].emailAddress as string)
    }
    handeler()
  } ,[])
  
  const router = useRouter()  
  const [images, setImages] = React.useState<any>([]);
    const onChange = (imageList :any, addUpdateIndex :any) => {
        console.log(imageList);
        setImages(imageList);
      };
    const formSchema = z.object({
        title: z.string().min(2, {
          message: "Username must be at least 2 characters.",
        }),
      
  
      })
        // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      

    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
  console.log('start')
    await CreatePosts({
      title :values.title,
      like :0,
      image : images[0]?.data_url as string,
      posterName : user?.username as string, 
      userImage : user?.imageUrl as string
    })
    router.push('/')
     
  }

       
    return (
<main className=" sm:w-full md:flex  lg:flex flex-col items-center w-full max-w-[1200px] h-full bg-gradient-to-r from-gray-400 via-blue-500 to-gray-200 rounded-md shadow-xl p-8 mx-auto">
  <h1 className="mb-16 text-4xl font-extrabold text-gray-900 text-center">
    Welcome to the Create Posts Page 👋
  </h1>

  <Form {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="bg-gradient-to-r from-slate-800 via-blue-600 to-gray-900 rounded-lg p-8 w-full max-w-[600px] flex flex-col gap-8 shadow-lg"
    >
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white text-lg font-semibold mb-2">Title</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter your post title"
                {...field}
                className="w-full rounded-md px-3 py-2 text-gray-900"
              />
            </FormControl>
            <FormMessage className="text-red-400 mt-1" />
          </FormItem>
        )}
      />

      <div className="flex flex-col gap-4">
        <ImageUploading
          multiple={false}
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
            <div className="flex flex-col gap-4 items-center">
              {images.length === 0 ? (
                <button
                  type="button"
                  onClick={onImageUpload}
                  {...dragProps}
                  style={isDragging ? { color: 'red' } : undefined}
                  className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition"
                >
                  <span className="text-lg">Click or Drop here to upload</span>
                  <Image
                    src="/up.png"
                    width={32}
                    height={32}
                    alt="Upload Icon"
                    className="rounded"
                  />
                </button>
              ) : (
                <>
                  <div className="flex flex-wrap gap-6 justify-center">
                    {imageList.map((image: any, index: number) => (
                      <div key={index} className="flex flex-col items-center gap-2">
                        <img
                          src={image['data_url']}
                          alt={`Upload Preview ${index + 1}`}
                          width={120}
                          className="rounded-md shadow-md"
                        />
                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={() => onImageUpdate(index)}
                            className="text-blue-400 hover:text-blue-600 font-medium"
                          >
                            Update
                          </button>
                          <button
                            type="button"
                            onClick={() => onImageRemove(index)}
                            className="text-red-400 hover:text-red-600 font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={onImageRemoveAll}
                    className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
                  >
                    Remove all images
                  </button>
                </>
              )}
            </div>
          )}
        </ImageUploading>
      </div>

      <Button className="mt-6 self-center px-10 py-3 text-lg font-semibold">
        Submit
      </Button>
    </form>
  </Form>
</main>
    )
}


