"use client";

import { motion } from "framer-motion";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { videoSchema } from "@/lib/validation";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { BiLoaderCircle } from "react-icons/bi";
import { BsSend } from "react-icons/bs";
import { durationVideo, topicVideo } from "@/app/constant";
import { useState } from "react";
import TextareaField from "./TextareaField";

const CreateVideoForm = () => {
  const [topic, setTopic] = useState<string>();
  const [topicPrompt, setTopicPrompt] = useState<string>("");

  const [duration, setDuration] = useState<string>();

  const handleTopicChange = (topic?: string) => {
    setValue("topic", topic ?? "");
    setTopic(topic);
  };

  const handleDurationChange = (duration?: string) => {
    setValue("duration", duration ?? "");
    setDuration(duration);
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

  console.log({ topic, topicPrompt }, "<---diCreateVideoForm");

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
            <SelectValue placeholder="Select Duration" />
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
