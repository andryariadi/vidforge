"use client";

import { motion } from "framer-motion";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { videoSchema } from "@/lib/validation";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { BiLoaderCircle } from "react-icons/bi";
import { BsSend } from "react-icons/bs";
import { durationVideo, themeVideo, topicVideo } from "@/app/constant";
import { useState } from "react";
import TextareaField from "./TextareaField";
import Image from "next/image";

const CreateVideoForm = () => {
  const [topic, setTopic] = useState<string>();
  const [topicPrompt, setTopicPrompt] = useState<string>("");

  const [duration, setDuration] = useState<string>();
  const [theme, setTheme] = useState<string>();

  const handleTopicChange = (topic?: string) => {
    setValue("topic", topic ?? "");
    setTopic(topic);
  };

  const handleDurationChange = (duration?: string) => {
    setValue("duration", duration ?? "");
    setDuration(duration);
  };

  const handleThemeChange = (theme?: string) => {
    setValue("theme", theme ?? "");
    setTheme(theme);
  };

  const {
    // register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof videoSchema>>({
    resolver: zodResolver(videoSchema),
    // defaultValues: {
    //   topic: "",
    //   duration: "",
    // },
  });

  const handleSubmitForm: SubmitHandler<z.infer<typeof videoSchema>> = (data) => {
    if (data.topic === "Custom Prompt") {
      data.topic = topicPrompt;
    }

    console.log(data, "<---dihandleSubmitForm");
  };

  console.log({ topic, topicPrompt, duration, theme }, "<---diCreateVideoForm");

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="relative space-y-2">
        <label htmlFor="topic" className="text-white-2 text-sm font-bold">
          Content
        </label>
        <Select value={topic} onValueChange={handleTopicChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select Topic of your video" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {topicVideo.map((topic) => (
                <SelectItem key={topic.id} value={topic.name}>
                  <div className="flex items-center gap-2 bg-black-3 border border-gray-700 p-1 rounded-lg">
                    <span>{topic.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {topic === "Custom Prompt" && <TextareaField id="topic" rows={4} cols={30} placeholder={`Write prompt on which you want to generate video`} value={topicPrompt} onChange={(e) => setTopicPrompt(e.target.value)} />}

        {errors.topic && topic === undefined && <p className="absolute -bottom-6 text-red-500 text-sm">Voice type is {errors.topic.message as string}</p>}
      </div>

      <div className="relative space-y-2">
        <label htmlFor="duration" className="text-white-2 text-sm font-bold">
          Duration
        </label>
        <Select value={duration} onValueChange={handleDurationChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select a Video Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {durationVideo.map((tm) => (
                <SelectItem key={tm.id} value={tm.time}>
                  <div className="flex items-center gap-2 bg-black-3 border border-gray-700 p-1 rounded-lg">
                    <span>{tm.time}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {errors.duration && duration === undefined && <p className="absolute -bottom-6 text-red-500 text-sm">Duration is {errors.duration.message as string}</p>}
      </div>

      <div className="relative space-y-2 col-span-2">
        <label htmlFor="theme" className="text-white-2 text-sm font-bold">
          Select a Video Theme
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {themeVideo.map((item) => (
            <figure key={item.name} className={`b-rose-700 relative space-y-1  overflow-hidden rounded-xl ${item.name === theme && "border-[3.5px] border-orange-1"}`}>
              <Image src={item.imgUrl} alt={item.name} width={174} height={174} className="object-cover h-fit 2xl:h-80 w-full rounded-xl hover:scale-125 transition-all duration-300" onClick={() => handleThemeChange(item.name)} />

              <figcaption className="bg-orange-1 absolute bottom-0 w-full h-7 flex items-center justify-center">
                <p className="text-14 truncate font-normal capitalize text-white-1">{item.name}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        {errors.theme && theme === undefined && <p className="absolute -bottom-6 text-red-500 text-sm">Theme is {errors.theme.message as string}</p>}
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="col-span-2 bg-btn w-full py-3 px-4text-white-2 font-bold rounded-lg shadow-lg flex items-center justify-center gap-3"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.95 }}
      >
        {isSubmitting ? (
          <BiLoaderCircle size={22} className="animate-spin mx-auto" />
        ) : (
          <>
            <span>Submit & publish video</span>
            <BsSend size={18} />
          </>
        )}
      </motion.button>
    </form>
  );
};

export default CreateVideoForm;
