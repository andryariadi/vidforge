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
import { useContext, useEffect, useState } from "react";
import TextareaField from "./TextareaField";
import Image from "next/image";
import axios from "axios";
import CustomLoading from "./CustomLoading";
import toast from "react-hot-toast";
import { toastStyle } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";
import { VideoDataStore, VideoScriptData, User } from "@/lib/types";
import { VideoDataContext } from "./VidoeDataContext";
import { db } from "@/db/config-db";
import { useUser } from "@clerk/nextjs";
import { VideoData } from "@/db/schema";
import PlayerDialog from "./PlayerDialog";
import { useUserStore } from "@/lib/useUserStore";
import { updateUserCredits } from "@/lib/actions";

const CreateVideoForm = () => {
  const [loading, setLoading] = useState(false);

  const [topic, setTopic] = useState<string>();
  const [topicPrompt, setTopicPrompt] = useState<string>("");

  const [duration, setDuration] = useState<string>();
  const [imageStyle, setImageStyle] = useState<string>();

  const [videoScripts, setVideoScripts] = useState<VideoScriptData[]>([]);
  const [audioFileUrl, setAudioFileUrl] = useState<string>("");
  const [caption, setCaption] = useState<string>("");
  const [imageLists, setImageLists] = useState<string[]>([]);

  const { videoData, setVideoData } = useContext(VideoDataContext);
  const { user: userDetail, setUser } = useUserStore();

  const { user } = useUser();

  const [playVideo, setPlayVideo] = useState<boolean>(false);
  const [videoId, setVideoId] = useState<number>();

  const handleTopicChange = (topic?: string) => {
    setValue("topic", topic ?? "");
    setTopic(topic);
  };

  const handleDurationChange = (duration?: string) => {
    setValue("duration", duration ?? "");
    setDuration(duration);
  };

  const handleImageStyleChange = (imageStyle?: string) => {
    setValue("imageStyle", imageStyle ?? "");
    setImageStyle(imageStyle);
  };

  const {
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof videoSchema>>({
    resolver: zodResolver(videoSchema),
    defaultValues: {
      topic: "",
      imageStyle: "",
      duration: "",
    },
  });

  const handleSubmitForm: SubmitHandler<z.infer<typeof videoSchema>> = async (data) => {
    if (userDetail && userDetail.credits === 0) {
      toast.error("You dont enough credits!", {
        style: toastStyle,
      });
      return;
    }

    setLoading(true);

    if (data.topic === "Custom Prompt") {
      data.topic = topicPrompt;
    }
    console.log(data, "<---dihandleSubmitForm");

    const prompt = `Write a script to generate a ${data.duration} video on the topic: "${data.topic}". The script should include multiple scenes, each with a brief narrative in ${data.imageStyle} style. For each scene, provide:\n\nimagePrompt: A detailed AI-generated image description in a ${data.imageStyle} format that matches the scene.\ncontentText: The text or narration describing the scene in a concise and engaging manner.\nReturn the result in JSON format with fields imagePrompt and contentText for each scene.`;

    const res = await axios.post("/api/create-video-script", { prompt });

    const scenes = res.data.result.scenes;

    setVideoScripts(scenes);

    setVideoData((prev: VideoDataStore) => ({
      ...prev,
      videoScripts: scenes,
    }));

    await generateAudioFile(scenes);

    await generateImage(scenes);

    console.log({ prompt, res }, "<---dihandleSubmitForm2");
  };

  // Generate Audio File
  const generateAudioFile = async (videoScriptData: VideoScriptData[]) => {
    setLoading(true);

    try {
      let script = "";

      const id = uuidv4();

      videoScriptData.forEach((scene) => {
        script = script + scene.contentText + " ";
      });

      const res = await axios.post("/api/generate-audio", { text: script, id });

      setAudioFileUrl(res.data.downloadURL);

      setVideoData((prev: VideoDataStore) => ({
        ...prev,
        audioFileUrl: res.data.downloadURL,
      }));

      generateAudioCaption(res.data.downloadURL);

      console.log({ script, res }, "<---digenerateAudioFile");
    } catch (error) {
      console.log(error, "<---dierrorGenerateAudioFile");
    }
  };

  // Generate Audio Caption
  const generateAudioCaption = async (audioFileUrl: string) => {
    setLoading(true);

    try {
      const res = await axios.post("/api/generate-caption", {
        audioFileUrl,
      });

      setCaption(res.data.transcript.text);

      setVideoData((prev: VideoDataStore) => ({
        ...prev,
        caption: res.data.transcript.words,
      }));

      console.log({ audioFileUrl, res }, "<---digenerateAudioCaption");
    } catch (error) {
      console.log(error, "<---dierrorGenerateAudioCaption");
    }
  };

  // Generate Image
  const generateImage = async (vidScripts?: VideoScriptData[]) => {
    setLoading(true);

    try {
      const images: string[] = [];

      for (const scene of vidScripts!) {
        try {
          const res = await axios.post("/api/generate-image", { prompt: scene.imagePrompt });

          images.push(res.data.output);

          console.log({ res }, "<---digenerateImage");
        } catch (error) {
          console.log(error, "<---dierrorGenerateImageClient");
        }
      }

      setImageLists(images);

      setVideoData((prev: VideoDataStore) => ({
        ...prev,
        imageLists: images,
      }));
    } catch (error) {
      console.log(error, "<---dierrorGenerateImage");
    }
  };

  const saveVideoData = async (videoData: VideoDataStore) => {
    console.log({ videoData }, "<--- disaveVideoData1");

    setLoading(true);

    try {
      const res = await db
        .insert(VideoData)
        .values({
          script: videoData?.videoScripts,
          audioFileUrl: videoData?.audioFileUrl as string,
          captions: videoData?.caption,
          imageLists: videoData?.imageLists,
          createdBy: user?.fullName as string,
        })
        .returning({ id: VideoData.id });

      console.log({ res }, "<--- disaveVideoData2");

      if (res[0].id) toast.success("Video generated successfully", { style: toastStyle });

      if (user && user.primaryEmailAddress && userDetail && res[0].id) {
        const userEmail = user?.primaryEmailAddress?.emailAddress;
        await updateUserCredits({ userEmail, userDetail });

        setUser({ ...userDetail, credits: userDetail.credits - 10 });
      }

      setVideoId(res[0].id);

      setPlayVideo(true);
    } catch (error) {
      console.error(error, "<--- dierrorSaveVideoData");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (videoData && Object.keys(videoData).length == 4) {
      saveVideoData(videoData);
    } else {
      console.error("videoData is undefined or empty");
    }
  }, [videoData]);

  console.log({ topic, topicPrompt, duration, imageStyle, videoScripts, audioFileUrl, caption, imageLists, videoData }, "<---diCreateVideoForm");

  return (
    <>
      <form onSubmit={handleSubmit(handleSubmitForm)} className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="relative space-y-3">
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

          {errors.topic && topic === undefined && <p className="absolute -bottom-6 text-red-500 text-sm">{errors.topic.message as string}</p>}
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

          {errors.duration && duration === undefined && <p className="absolute -bottom-6 text-red-500 text-sm">{errors.duration.message as string}</p>}
        </div>

        <div className="relative space-y-2 col-span-2">
          <label htmlFor="theme" className="text-white-2 text-sm font-bold">
            Select a Video Theme
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {themeVideo.map((item) => (
              <figure key={item.name} className={`b-rose-700 relative space-y-1  overflow-hidden rounded-xl ${item.name === imageStyle && "border-[3.5px] border-orange-1"}`}>
                <Image src={item.imgUrl} alt={item.name} width={174} height={174} className="object-cover h-fit 2xl:h-80 w-full rounded-xl hover:scale-125 transition-all duration-300" onClick={() => handleImageStyleChange(item.name)} />

                <figcaption className="bg-orange-1 absolute bottom-0 w-full h-7 flex items-center justify-center">
                  <p className="text-14 truncate font-normal capitalize text-white-1">{item.name}</p>
                </figcaption>
              </figure>
            ))}
          </div>

          {errors.imageStyle && imageStyle === undefined && <p className="absolute -bottom-6 text-red-500 text-sm">{errors.imageStyle.message as string}</p>}
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

      <CustomLoading loading={loading} />

      {playVideo && videoId && <PlayerDialog playVideo={playVideo} videoId={videoId} />}
    </>
  );
};

export default CreateVideoForm;
