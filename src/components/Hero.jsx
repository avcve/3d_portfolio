import { motion } from 'framer-motion';
import { styles } from '../styles';
import ComputersCanvas from './canvas/Computers'; // default import

const Hero = () => {
  return (
    <section className="relative w-full" style={{ height: '700px' }}>

      {/* Left indicator + text */}
      <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}>
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915eff]" />
          <div className="w-1 sm:h-80 h-40 bg-gradient-to-b from-[#915eff] via-purple-500 to-transparent" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className="text-[#915eff]">Avcve</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-gray-200`}>
            I am your <span className="text-[#915eff]">Ace Card</span> with a keen interest in You, your projects and enterprises
          </p>
        </div>
      </div>

      {/* 3D Canvas pushed down */}
      <div className="relative w-full h-screen">
        <div className="w-full h-full transform translate-y-24 md:translate-y-32">
          <ComputersCanvas />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute w-full flex justify-center items-center"
        style={{ bottom: '-90px' }} // pushes the button 50px from the bottom of Hero
      >
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-gray-500 flex justify-center items-start p-2">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
              className="w-3 h-3 rounded-full bg-gray-500 mb-1"
            />
          </div>
        </a>
      </div>



    </section>
  );
};

export default Hero;
