import { VideoData } from "@/lib/types";
import Image from "next/image";
import { AbsoluteFill, Audio, Sequence, useCurrentFrame, useVideoConfig } from "remotion";

const RemotionVideo = ({ videoData, setDurationInFrame }: { videoData: VideoData; setDurationInFrame: (duration: number) => void }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  if (!videoData) return null;

  const { script, audioFileUrl, captions, imageLists } = videoData;

  const getDurationFrame = () => {
    const lastCaption = captions[captions.length - 1];

    const durationFrame = (lastCaption?.end / 1000) * fps;

    setDurationInFrame(durationFrame);

    console.log({ durationFrame }, "<---getDurationFrame");

    return durationFrame;
  };

  const getCurrentCaptions = () => {
    const currentTime = (frame / 30) * 1000;
    const currentCaption = captions.find((word) => currentTime >= word.start && currentTime <= word.end);

    console.log({ currentTime, currentCaption }, "<---getCurrentCaptions");

    return currentCaption ? currentCaption.text : "";
  };

  console.log(videoData, "<---RemotionVideo");

  return (
    <AbsoluteFill className="bg-black-3">
      {imageLists?.map((item, idx) => {
        const from = (idx * getDurationFrame()) / imageLists.length;

        return (
          <Sequence key={idx} from={from} durationInFrames={getDurationFrame()}>
            <Image
              src={item}
              alt={`Frame ${idx + 1}`}
              layout="fill" // Use fill layout for responsive images
              objectFit="cover" // Cover to maintain aspect ratio
            />

            <AbsoluteFill className="b-violet-500 flex items-center justify-center text-white-1 shadow-black-1">
              <p className="text-lg font-semibold">{getCurrentCaptions()}</p>
            </AbsoluteFill>
          </Sequence>
        );
      })}

      <Audio src={audioFileUrl} />
    </AbsoluteFill>
  );
};

export default RemotionVideo;
