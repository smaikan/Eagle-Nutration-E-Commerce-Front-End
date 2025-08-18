import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="h-[450px] px-16 py-10 flex flex-col bg-gray-600">
      <Link
        to="/"
        className="text-white self-center text-3xl w-max font-extrabold flex items-center px-14">EAGLE</Link>
      <div className=" mt-10 px-32 flex justify-between">

        <div className="flex  flex-col">
          <span className="font-semibold text-gray-200 text-lg underline">KATEGORİLER</span>
          <div className="mt-2  flex flex-col ">
            <Link className="text-gray-200 text-lg">
                Protein
            </Link>
            <Link className="text-gray-200 text-lg">
                Performans
            </Link>
            <Link className="text-gray-200 text-lg">
                Hacim
            </Link>
            <Link className="text-gray-200 text-lg">
                Zayıflama
            </Link>
            <Link className="text-gray-200 text-lg">
                Aksesuar
            </Link>
            <Link className="text-gray-200 text-lg">
                Spor Giyim
            </Link>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="font-semibold text-gray-200 text-lg underline">Hesap</span>
          <div className="mt-2  flex flex-col ">
            <Link className="text-gray-200 text-lg">
                Giriş Yap
            </Link>
            <Link className="text-gray-200 text-lg">
                Kayıt Ol
            </Link>
            <Link className="text-gray-200 text-lg">
                Sepet
            </Link>
            
          </div>
        </div>

        <div className="flex flex-col">
          <span className="font-semibold text-gray-200 text-lg underline">SÖZLEŞME VE ŞARTLAR</span>
          <div className="mt-2  flex flex-col ">
            <Link className="text-gray-200 text-lg">
                Mesafeli Satış Sözleşmesi
            </Link>
            <Link className="text-gray-200 text-lg">
                İade Politikası
            </Link>
            <Link className="text-gray-200 text-lg">
                Gizlilik Politikası
            </Link>
            <Link className="text-gray-200 text-lg">
                Hizmet Kullanım Şartları
            </Link>
            <Link className="text-gray-200 text-lg">
                Kişisel Veriler Politikası
            </Link>
            
          </div>
        </div>
        <div className="font-bold text-2xl text-gray-200 underline">
            eaglenutration@gmail.com <br /> <br />08507248324
        </div>

      </div >
     <div className="self-center mt-16 text-gray-200">© 2025 Eagle Nutrition</div>
    </div>
  );
};

export default Footer;
