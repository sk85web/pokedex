import photo from '/src/assets/photo.png';

const AboutMe = () => {
  return (
    <div
      className={`group relative my-4 overflow-hidden rounded-lg shadow-md transition duration-150 ease-in-out `}
    >
      <div className="h-40 overflow-hidden rounded-md">
        <img
          className="h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-110 "
          src={photo}
          alt="photo"
        />
      </div>
      <div className="p-4">
        <p className="text-gray-700 text-center text-lg">
          Hello! My name is Sergey Kovalev and I'm frontend developer, focused
          on creating modern, responsive, and user-friendly web applications. I
          enjoy learning new technologies and improving my skills. My main stack
          consists of JS, TS, React, Redux, Redux Toolkit. For more details take
          a look at my{' '}
          <a
            className="text-blue-700 font-bold hover:underline"
            href="https://drive.google.com/file/d/1Z50nt1SrYR4xGKU-Zx5nAlmiI8_BFzdA/view?usp=drive_link"
          >
            CV
          </a>{' '}
          and my{' '}
          <a
            className="text-blue-700 font-bold hover:underline"
            href="https://github.com/sk85web"
          >
            Github
          </a>
        </p>
      </div>
    </div>
  );
};

export default AboutMe;
