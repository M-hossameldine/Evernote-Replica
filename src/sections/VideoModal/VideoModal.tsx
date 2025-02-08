import { CenteredModal } from "components";

const VideoModal: React.FC = () => {
  const video = (
    <div
      className="embed-responsive embed-responsive-21by9 relative h-full w-full overflow-hidden"
      style={{ paddingTop: "42.857143%" }}
    >
      <iframe
        title="Video Modal"
        className="embed-responsive-item absolute bottom-0 left-0 right-0 top-0 h-full w-full"
        src="https://www.youtube.com/embed/NgkCgqIogcY?rel=0&autoplay=1&modestbranding=1&enablejsapi=1"
        allowFullScreen={true}
        data-gtm-yt-inspected-2340190_699="true"
        id="240632615"
      ></iframe>
    </div>
  );

  return (
    <div>
      <CenteredModal modalContent={video} />
    </div>
  );
};

export default VideoModal;
