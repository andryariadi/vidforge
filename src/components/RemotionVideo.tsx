import { VideoData } from "@/lib/types";
import Image from "next/image";
import { AbsoluteFill, Audio, interpolate, Sequence, useCurrentFrame, useVideoConfig } from "remotion";

const RemotionVideo = ({ videoData, setDurationInFrame }: { videoData: VideoData; setDurationInFrame: (duration: number) => void }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  if (!videoData) return null;

  const { audioFileUrl, captions, imageLists } = videoData;

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
        const startTime = (idx * getDurationFrame()) / imageLists.length;
        const durationInFrames = getDurationFrame();

        const zoomEffect = (idx: number) =>
          interpolate(frame, [startTime, startTime + durationInFrames / 2, startTime + durationInFrames], idx % 2 == 0 ? [1, 1.8, 1] : [1.3, 1, 1.3], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

        return (
          <Sequence key={idx} from={startTime} durationInFrames={durationInFrames}>
            <Image
              src={item}
              alt={`Frame ${idx + 1}`}
              layout="fill" // Use fill layout for responsive images
              objectFit="cover" // Cover to maintain aspect ratio
              style={{
                transform: `scale(${zoomEffect(idx)})`,
              }}
            />

            <AbsoluteFill className="flex items-center justify-center text-white-1 shadow-black-1">
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
