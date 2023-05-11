import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailJs from '@emailjs/browser';

import { styles } from '../styles';
import { EarthCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utilis/motion';


const Contact = () => {
  
  const fromRef = useRef();
  const [ form , setForm ] = useState({
    name: '',
    email:'',
    message:''
});

const [ loading, setLoading ] = useState(false);

const handleChange = (e) => {
  const { name , value } = e.target;
    setForm({ ...form, [name]: value })
}

const handleSubmit = (e) => {
  e.preventDefault();

  setLoading(true);


  emailJs.send(
    'service_gv51hau',
    'template_9a1tc49',
    {
      from_name: form.name,
      to_name: 'Chirag',
      from_email: form.email,
      to_email: 'kashyapanuj59741@gmail.com',
      message: form.message
    },
    "GSYQWtJHKVnEP9p3K"
  )
  .then( () => {
    setLoading(false);
    alert('Thank you. I will get back to you as soon as possible.');

    setForm({
      name: "",
      email: "",
      message: "",
    })

  }, (error) => {
    setLoading(false)
    console.log(error);

    alert('something went wrong')
  })
}

  return (
    <div className='xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden'>
      
      <motion.dev variants={slideIn('left','tween',0.2,1)}
      className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in Touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>
        
        <form ref={fromRef} onSubmit={handleSubmit} 
           className="mt-12 flex flex-col gap-8"
        >
          <label className='flex flex-col '>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input type='text' name='name' onChange={handleChange} value={form.name} placeholder="What's Your Name ?"
             className='bg-tertiary py-4 px-6 rounded-lg  outlined-none 
             border-none font-medium text-white placeholder:text-secondary'/>
          </label>

          <label className='flex flex-col '>
            <span className='text-white font-medium mb-4'>Your Email</span>
            <input type='email' name='email' onChange={handleChange} value={form.email} placeholder="What's Your email ?"
             className='bg-tertiary py-4 px-6 rounded-lg  outlined-none 
             border-none font-medium text-white placeholder:text-secondary'/>
          </label>

          <label className='flex flex-col '>
            <span className='text-white font-medium mb-4'>Your Message</span>
            <textarea rows={4} type='text' name='message' onChange={handleChange} value={form.message} placeholder="What do you want to say ?"
             className='bg-tertiary py-4 px-6 rounded-lg  outlined-none 
             border-none font-medium text-white placeholder:text-secondary'/>
          </label>

          <button type='submit' 
          className="bg-tertiary py-3 px-8  outline-none w-fit  text-white
          font-bold shadow-md shadow-primary rounded-xl"
          >
             {loading ? 'sending... ' : 'send'}
          </button>
        </form>    
      </motion.dev>


      <motion.dev 
      variants={slideIn('right','tween',0.2,1)}
      className='xl:flex-1 xl:h-auto md:h-[500px] h-[350px]'
      >
      <EarthCanvas/>
      </motion.dev>

    </div>
  )
}

export default SectionWrapper(Contact, "contact")
