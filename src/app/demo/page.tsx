export default function DemoPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e84b35] px-4 py-10">
      <video
        controls
        autoPlay
        className="w-screen h-auto rounded-xl shadow-2xl border-4 border-[#e84b35]"
      >
        <source src="/images/audimate prototype v-s.mov" type="video/quicktime" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
