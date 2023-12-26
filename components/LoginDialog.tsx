import { Dialog, Transition } from '@headlessui/react'
import { LoginFormInput } from '@types';
import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from "yup";
import Image from 'next/image';

export default function LoginDialog(props: any) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const validationSchema = Yup.object().shape({
        email: Yup.string()
          .required('Email is required')
          .email('Email is invalid'),
        password: Yup.string()
          .required('Password is required')
          .min(8, 'Password must be at least 8 characters')
          .max(40, 'Password must not exceed 40 characters'),
      });

    const { register, handleSubmit, reset, formState: {errors}} = useForm<LoginFormInput>({
        resolver: yupResolver(validationSchema)
    })

    function closeModal() {
        props?.setIsLoginOpen(false);
        reset();
    }

    const onSubmit = (data: LoginFormInput) => {
        console.log(JSON.stringify(data, null, 2));
        reset();
    };

    const handleShowPassword = () => {
      setIsPasswordVisible(!isPasswordVisible);
    }

  return (
    <>
      <Transition appear show={props?.isLoginOpen} as={Fragment}>
        <Dialog open={props?.isLoginOpen} as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg text-center font-medium leading-6 text-gray-900"
                  >
                    Login
                  </Dialog.Title>
                  <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center'>
                    <div className="mt-6 w-full">
                        <input
                        type='email'
                        placeholder='Enter email'
                        className='searchbar__input rounded-full'
                        autoComplete="off"
                        {...register('email')}
                        />
                        {<p className='text-[red] text-center'>{errors?.email?.message}</p>}
                    </div>
                    <div className="mt-6 w-full">
                        <div className="relative flex justify-center items-center">
                          <input
                            type={isPasswordVisible ? 'text' : 'password'}
                            id='password'
                            placeholder='Enter password'
                            className='searchbar__input rounded-full'
                            autoComplete="off"
                            {...register('password')}
                          />
                          {isPasswordVisible ? 
                            <Image
                              src={"eye_visible_hide.svg"} 
                              alt="password-show" 
                              width={30} 
                              height={30}
                              className='absolute right-2 top-2 cursor-pointer'
                              onClick={handleShowPassword}
                            /> :
                            <Image
                              src={"eye_slash_visible_hide.svg"} 
                              alt="password-show" 
                              width={30} 
                              height={30}
                              className='absolute right-2 top-2 cursor-pointer'
                              onClick={handleShowPassword}
                            />
                          }
                        </div>
                        {<p className='text-[red] text-center'>{errors?.password?.message}</p>}
                    </div>

                    <div className="mt-4">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                        Login
                        </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
