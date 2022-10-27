import { withPrefix } from 'gatsby';

export interface VideoProps {
  name: string;
}

/**
 *
 */
const Video = ({ name }: VideoProps) => {
  const path = withPrefix(`/videos/${name}`);
  return (
    <video controls className="c-blog-video" poster={`${path}.svg`}>
      <source src={`${path}.webm`} type="video/webm" />
      <source src={`${path}.mp4`} type="video/mp4" />
      <p>
        Your browser does not support HTML video. Here is a
        <a href={`${path}.mp4`}>link to the video</a> instead.
      </p>
    </video>
  );
};

export default Video;
