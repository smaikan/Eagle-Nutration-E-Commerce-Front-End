import React from "react";

const UserDetail = ({ user }) => {
  if (!user) return <div>Kullanıcı bulunamadı.</div>;

  return (
    <div className="max-w-md mx-auto mt-6 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Kullanıcı Bilgileri</h2>
      <div className=" flex flex-col gap-5 space-y-2">
        <div><span className="font-semibold">ID:</span> {user.id}</div>
        <div><span className="font-semibold">Kullanıcı Adı:</span> {user.userName}</div>
        <div><span className="font-semibold">E-posta:</span> {user.email}</div>
        <div><span className="font-semibold">Şifre:</span> {user.userPassword}</div>
        <div><span className="font-semibold">Telefon:</span> {user.userPhone}</div>
        <div>
        </div>

        <div className="mt-4">
          <h3 className="font-bold mb-6 underline">Adres Bilgileri</h3>
          <div className="ml-4 flex flex-col gap-3 space-y-1 text-sm">
            <div>İl: {user.userAddress?.province}</div>
            <div>İlçe: {user.userAddress?.district}</div>
            <div>Mahalle: {user.userAddress?.neighbor}</div>
            <div>Adres: {user.userAddress?.address}</div>
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default UserDetail;
