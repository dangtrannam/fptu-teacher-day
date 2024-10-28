import React from 'react';
import Header from '../../components/layout/Header';

const CreateAvatarExample = () => {
    return (
        <div className="h-screen flex flex-col bg-bgBase bg-cover bg-center">
            <Header />
            {/* Rectangle */}
            <div className="bg-white rounded-lg w-[49rem] min-h-[32.5rem] pt-12 px-[92px] pb-[50px] mx-auto mt-9">
                <p className="text-black font-normal text-sm max-w-96 text-center mx-auto">
                    Lorem ipsum dolor sit amet consectetur. Volutpat enim felis aenean nec fringilla venenatis.
                </p>
                {/* Content inside the rectangle */}
                <div className="flex flex-col items-center justify-center h-[21.8rem] bg-[#C5C5C5] mt-4"></div>
            </div>

            {/* Button Container */}
            <div className="flex justify-around items-center w-[49rem] mx-auto mt-6">
                <button className="w-[30%] py-4 bg-orange-500 text-white rounded-full font-bold text-lg">
                    Thêm ảnh
                </button>
                <button className="w-[30%] py-4 bg-orange-500 text-white rounded-full font-bold text-lg">
                    Hoàn tất
                </button>
            </div>
        </div>
    );
};

export default CreateAvatarExample;
