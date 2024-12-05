"use client"
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import Link from 'next/link';

const AboutPage = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  const socialVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 1, duration: 0.5, ease: 'easeOut' }
    }
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  return (
    <div className="container mx-auto py-36 px-4 md:px-8">
      <motion.div
        variants={heroVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div className="order-2 md:order-1">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Pisco Perú</h1>
          <p className="text-gray-600 mb-6">
            Embark on a culinary journey through the vibrant flavors of Peruvian cuisine at our restaurant. Savor the rich history and authentic recipes that have been passed down for generations, expertly crafted with the finest locally-sourced ingredients.
          </p>
          <p className="text-gray-600 mb-6">
            Complementing our menu is an unparalleled selection of artisanal pisco cocktails, meticulously mixed to showcase the versatility and complexity of this beloved Peruvian spirit. Allow our knowledgeable bartenders to guide you through a tasting of unique pisco-based creations that will transport you to the heart of Lima.
          </p>
          <motion.div
            variants={socialVariants}
            initial="hidden"
            animate="visible"
            className="flex space-x-4 text-2xl text-gray-600"
          >
            <Link href="#" className="hover:text-gray-800 transition"><FaFacebook /></Link>
            <Link href="#" className="hover:text-gray-800 transition"><FaInstagram /></Link>
            <Link href="#" className="hover:text-gray-800 transition"><FaTwitter /></Link>
          </motion.div>
        </div>
        <div className="order-1 md:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
          >
            <Image
              src="/img/cocktail.jpg"
              alt="Pisco Cocktail"
              width={500}
              height={500}
              className="rounded-lg shadow-lg"
            />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        ref={ref}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
        }}
        initial="hidden"
        animate={controls}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
      >
        <motion.div variants={statVariants} className="bg-white rounded-lg shadow-lg p-6 text-center">
          <h3 className="text-4xl font-bold text-gray-800 mb-2">+200</h3>
          <p className="text-gray-600">Signature Pisco Cocktails</p>
        </motion.div>
        <motion.div variants={statVariants} className="bg-white rounded-lg shadow-lg p-6 text-center">
          <h3 className="text-4xl font-bold text-gray-800 mb-2">98%</h3>
          <p className="text-gray-600">Customer Satisfaction</p>
        </motion.div>
        <motion.div variants={statVariants} className="bg-white rounded-lg shadow-lg p-6 text-center">
          <h3 className="text-4xl font-bold text-gray-800 mb-2">15+</h3>
          <p className="text-gray-600">Years of Culinary Excellence</p>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <motion.div
          variants={menuItemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <Image
            src="/img/ceviche.jpg"
            alt="Ceviche"
            width={400}
            height={300}
            className="rounded-lg mb-4"
          />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Authentic Ceviche</h3>
          <p className="text-gray-600 mb-4">
            Experience the freshness of Perus coastal cuisine with our traditional ceviche, made with the finest local seafood and citrus-based marinade.
          </p>
          <p className="text-gray-500 font-medium">
            Enjoy a 15% discount on our ceviche this week!
          </p>
        </motion.div>
        <motion.div
          variants={menuItemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <Image
            src="/img/lomo.jpg"
            alt="Lomo Saltado"
            width={400}
            height={300}
            className="rounded-lg mb-4"
          />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Flavorful Lomo Saltado</h3>
          <p className="text-gray-600 mb-4">
            Indulge in the bold and savory flavors of our signature Lomo Saltado, a Peruvian stir-fry dish featuring tender beef, onions, and tomatoes.
          </p>
          <p className="text-gray-500 font-medium">
            Try our Lomo Saltado for only $18 this week!
          </p>
        </motion.div>
        <motion.div
          variants={menuItemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <Image
            src="/img/cocktail.jpg"
            alt="Pisco Sour"
            width={400}
            height={300}
            className="rounded-lg mb-4"
          />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Signature Pisco Sour</h3>
          <p className="text-gray-600 mb-4">
            Indulge in our expertly crafted Pisco Sour, a quintessential Peruvian cocktail that showcases the complexity and versatility of our house-made pisco.
          </p>
          <p className="text-gray-500 font-medium">
            Get 2-for-1 Pisco Sours during happy hour!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;