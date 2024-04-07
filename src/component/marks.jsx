import React, { useState, useEffect } from 'react';
import { createMark } from '../apis/marks';
import { toast } from 'react-toastify';

const defaultData = {
  email: '',
  MarksA: '',
  MarksB: '',
  MarksC: '',
  MarksD: '',
  MarksE: '',
};

function MarksRegister() {
  const [formData, setFormData] = useState(defaultData);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.email.includes('@') &&
      !isNaN(formData.MarksA) &&
      !isNaN(formData.MarksB) &&
      !isNaN(formData.MarksC) &&
      !isNaN(formData.MarksD) &&
      !isNaN(formData.MarksE)
    ) {
      setIsLoading(true);
      const { data } = await createMark(formData);
      if (data) {
        toast.success('Successfully Analysed!');
        setFormData(defaultData);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error('Invalid Values!');
        setFormData(defaultData);
      }
    } else {
      setIsLoading(false);
      toast.warning('Provide valid Values!');
      setFormData(defaultData);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setFormData((prevData) => ({ ...prevData, email: token }));
    }
  }, []);

  return (
    <>
      <div className="w-full h-full">
        <div className="relative">
          <h3 className="text-[25px] font-bold tracking-wider text-[#fff]">Enter your Detail</h3>
        </div>

        <form className="flex flex-col gap-y-3 mt-[2%]" onSubmit={formSubmit}>
          <div>
            <input
              className="w-full bg-[#222222] h-[3vh] pl-3 text-[#ffff]"
              onChange={handleOnChange}
              name="email"
              type="text"
              placeholder="Email"
              value={formData.email}
              required
              readOnly
            />
          </div>
          {['A', 'B', 'C', 'D', 'E'].map((mark) => (
            <div key={`mark-${mark}`}>
              <input
                className="w-full bg-[#222222] h-[3vh] pl-3 text-[#ffff]"
                onChange={handleOnChange}
                name={`Marks${mark}`}
                type="number"
                placeholder={`Marks ${mark}`}
                value={formData[`Marks${mark}`]}
                required
              />
            </div>
          ))}
          <button
            style={{ background: 'linear-gradient(90deg, rgba(0,195,154,1) 0%, rgba(224,205,115,1) 100%)' }}
            className="w-full h-[4vh] font-bold text-[#121418] tracking-wide text-[17px] relative mb-5"
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
            <p style={{ display: isLoading ? 'none' : 'block' }}>Submit</p>
          </button>
        </form>
      </div>
    </>
  );
}

export default MarksRegister;
