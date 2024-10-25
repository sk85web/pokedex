const AboutMe = () => {
  return (
    <div className="flex flex-col  h-screen bg-gray-100 p-4">
      <div className="text-center">
        <img
          src="path/to/your/photo.jpg"
          alt="Your Name"
          className="w-32 h-32 rounded-full object-cover shadow-lg mb-4"
        />
        <h1 className="text-4xl font-bold text-gray-800">
          Hello! Glad to see you
        </h1>
        <p className="mt-4 text-gray-600">
          My name is Sergey Kovalev and I'm frontend developer, focused on
          creating modern, responsive, and user-friendly web applications. I
          enjoy learning new technologies and improving my skills. My main stack
          consists of JS, TS, React, Redux, Redux Toolkit.
        </p>
      </div>
    </div>
  );
};

export default AboutMe;
