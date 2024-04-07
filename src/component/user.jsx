import React from 'react';
import { useState } from 'react';
import { createUser } from '../apis/user';
import { toast } from 'react-toastify';

const defaultData = {
  email: '',
  userName: '',
  age: '',
};

function UserRegister({ width, height }) {
  const [formData, setFormData] = useState(defaultData);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    if (formData.email.includes('@')) {
      setIsLoading(true);
      const { data } = await createUser(formData);
      console.log(data);
      if (data) {
        localStorage.setItem('userToken', data.data.email);
        toast.success('Successfully Registered!');
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error('Invalid Credentials!');
        setFormData(defaultData);
      }
    } else {
      setIsLoading(false);
      toast.warning('Provide valid Credentials!');
      setFormData(defaultData);
    }
  };

  return (
    <>
      <div className="w-full h-full">
        <div className="relative">
          <h3 className="text-[25px] font-bold tracking-wider text-[#fff]">
            Enter your Detail
          </h3>
        </div>

        <form
          className="flex flex-col gap-y-3 mt-[2%]"
          onSubmit={formSubmit}
          style={{ width: '100%', height: '100%' }}
        >
          <div>
            <input
              className="w-full bg-[#222222] h-[3.5vh] pl-3 text-[#ffff]"
              onChange={handleOnChange}
              name="email"
              type="text"
              placeholder="Email"
              value={formData.email}
              required
            />
          </div>
          <div>
            <input
              className="w-full bg-[#222222] h-[3.5vh] pl-3 text-[#ffff]"
              onChange={handleOnChange}
              name="userName"
              type="text"
              placeholder="User Name"
              value={formData.userName}
              required
            />
          </div>
          <div>
            <input
              className="w-full bg-[#222222] h-[3.5vh] pl-3 text-[#ffff]"
              onChange={handleOnChange}
              name="age"
              type="text"
              placeholder="Age"
              value={formData.age}
              required
            />
          </div>

          <button
            style={{
              background:
                'linear-gradient(90deg, rgba(0,195,154,1) 0%, rgba(224,205,115,1) 100%)',
            }}
            className="w-full h-[5vh] font-bold text-[#121418] tracking-wide text-[17px] relative mb-5"
            type="submit"
          >
            <div style={{ display: isLoading ? '' : 'none' }} className="absolute -top-[53px] left-[27%]">
              <lottie-player
                src="https://assets2.lottiefiles.com/packages/lf20_h9kds1my.json"
                background="transparent"
                speed="1"
                style={{ width: '200px', height: '160px' }}
                loop
                autoplay
              ></lottie-player>
            </div>
            <p style={{ display: isLoading ? 'none' : 'block' }}>Register</p>
          </button>
        </form>
      </div>
    </>
  );
}

export default UserRegister;
