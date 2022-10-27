export interface VideoProps {
  path: string;
}

/**
 *
 */
const Video = ({ path }: VideoProps) => (
  <video controls>
    <source src={`${path}.webm`} type="video/webm" />
    <source src={`${path}.mp4`} type="video/mp4" />
    <p>
      Your browser does not support HTML video. Here is a
      <a href={`${path}.mp4`}>link to the video</a> instead.
    </p>
  </video>
);

export default Video;
