export default function BackgroundSpheres() {
  // 各球体に立体感をもたせる定義
  const sphereBaseStyle = {
    boxShadow: `
      inset 2px 2px 5px rgba(255, 255, 255, 0.4), 
      inset -3px -3px 7px rgba(0, 0, 0, 0.25)
    `,
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* 球体１ */}
      <div
        className="absolute w-36 h-36 rounded-full opacity-40"
        style={{
          ...sphereBaseStyle,
          background: `radial-gradient(circle at 33% 33%, #fecdd3, #f9a8d4)`,
          top: '20%',
          left: '85%',
          animation: 'float 8s ease-in-out infinite 0.5s',
        }}
      />
      {/* 球体２ */}
      <div
        className="absolute w-60 h-60 rounded-full opacity-40"
        style={{
          ...sphereBaseStyle,
          background: `radial-gradient(circle at 33% 33%, #dbeafe, #93c5fd)`,
          top: '30%',
          left: '5%',
          animation: 'float 12s ease-in-out infinite 2s', 
        }}
      />
      {/* 球体３ */}
      <div
        className="absolute w-44 h-44 rounded-full opacity-40"
        style={{
          ...sphereBaseStyle,
          background: `radial-gradient(circle at 33% 33%, #fef3c7, #fcd34d)`,
          top: '70%',
          left: '25%',
          animation: 'float 10s ease-in-out infinite 1s',
        }}
      />
    {/* 球体4 */}
    <div
        className="absolute w-40 h-40 rounded-full opacity-40"
        style={{
        ...sphereBaseStyle,
        background: `radial-gradient(circle at 33% 33%,rgb(131, 235, 178),rgb(26, 236, 110))`,
        top: '85%',
        left: '85%',
        animation: 'float 7s ease-in-out infinite 3s',
        }}
    />
    {/* 球体5 */}
    <div
        className="absolute w-52 h-52 rounded-full opacity-40"
        style={{
        ...sphereBaseStyle,
        background: `radial-gradient(circle at 33% 33%,rgb(97, 246, 174),rgb(17, 233, 236))`,
        top: '3%',
        left: '50%',
        animation: 'float 11s ease-in-out infinite 1.5s',
        }}
    />
    {/* 球体6 */}
    <div
        className="absolute w-56 h-56 rounded-full opacity-40"
        style={{
        ...sphereBaseStyle,
        background: `radial-gradient(circle at 33% 33%,rgb(242, 201, 117),rgb(234, 154, 17))`,
        top: '45%',
        left: '55%',
        animation: 'float 9s ease-in-out infinite 0s',
        }}
    />
    {/* 球体6 */}
    <div
        className="absolute w-10 h-10 rounded-full opacity-40"
        style={{
        ...sphereBaseStyle,
        background: `radial-gradient(circle at 33% 33%, #fecdd3, #f9a8d4)`,
        top: '85%',
        left: '5%',
        animation: 'float 6s ease-in-out infinite 2.5s',
        }}
    />
    {/* 球体8 */}
    <div
        className="absolute w-10 h-10 rounded-full opacity-40"
        style={{
        ...sphereBaseStyle,
        background: `radial-gradient(circle at 33% 33%, #dbeafe, #93c5fd)`,
        top: '90%',
        left: '50%',
        animation: 'float 13s ease-in-out infinite 4s',
        }}
    />
    </div>
  );
}