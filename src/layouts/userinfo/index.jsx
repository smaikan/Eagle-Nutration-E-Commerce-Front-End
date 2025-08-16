import React, { useEffect, useState } from "react";
import { useCurrentauth } from "../../redux/Hooks";
import { useDispatch } from "react-redux";
import { UpdateAuth } from "../../redux/Auth";

const UserInfo = ({isOpen,setIsOpen}) => {
  const dispatch = useDispatch();
  const [provinces, setProvinces] = useState([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState(0);
  const [selectedDistrictsId, setSelectedDistrictsId] = useState(0);
  const [districts, setDistricts] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const user = useCurrentauth();
  const [form, setForm] = useState({
    UserName: "",
    UserPhone: "",
    UserAddress: { province: "", district: "", neighbor: "", address: "" },
    password: "",
    UserEmail: "",
  });

  const [parolaform, setParolaform] = useState({
    oldpassword: "",
    newpassword: "",
    againnewpassword: "",
  });

  const [usermessage, setUsermessage] = useState({ error: "", succes: "" });
  const [passwordmessage, setPasswordmessage] = useState({
    error: "",
    succes: "",
  });

  useEffect(() => {
    setForm({
      UserName: user?.name,
      UserPhone: user?.phone || "",
      UserAddress: user?.address ?? {
        province: "",
        district: "",
        neighbor: "",
        address: "",
      },
      password: user?.password,
      UserEmail: user?.email,
    });
  }, [user]);

  useEffect(() => {
    fetch("https://turkiyeapi.dev/api/v1/provinces")
      .then((res) => res.json())
      .then((data) => {
        const filteredProvinces = data.data.map((province) => ({
          id: province.id,
          name: province.name,
          districts: province.districts,
        }));

        setProvinces(filteredProvinces);
      })
      .catch((err) => {
        console.error("Hata:", err);
      });
  }, []);

  useEffect(() => {
    if (selectedProvinceId != 0) {
      const dis = provinces.find((d) => {
        return d.id == selectedProvinceId;
      });
      if (dis) {
        setDistricts(dis.districts);
      } else {
        console.error("şehirler yüklenmedi");
      }
    } else {
      setDistricts([]);
    }
  }, [selectedProvinceId]);

  useEffect(() => {
    if (selectedDistrictsId != 0) {
      fetch(
        `https://turkiyeapi.dev/api/v1/neighborhoods?districtId=${selectedDistrictsId}`
      )
        .then((respnse) => respnse.json())
        .then((response) => setNeighborhoods(response.data));
    }
  }, [selectedDistrictsId]);

  const SaveChange = async (payload) => {
    try {
      const response = await fetch(
        `http://localhost:5042/api/users?id=${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      setForm(payload);
      dispatch(
        UpdateAuth({
          ...user,
          name: payload.UserName !== "" ? payload.UserName : user.name,
          email: payload.UserEmail !== "" ? payload.UserEmail : user.email,
          password: payload.password !== "" ? payload.password : user.password,
          address:
            payload.UserAddress &&
            (payload.UserAddress.province !== "" ||
              payload.UserAddress.district !== "")
              ? payload.UserAddress
              : user.address,
          phone: payload.UserPhone !== "" ? payload.UserPhone : user.phone,
        })
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "İstek başarısız oldu");
      }

      const result = await response.json();
      console.log("Güncelleme başarılı:", result);
      setIsOpen(false)
    } catch (error) {
      console.error("Hata:", error);
    }
  };
  console.log("user", user);
  console.log("fr", isOpen);
  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="text-4xl font-extrabold mt-14 pb-3 px-10 border-b-2 border-gray-600 text-gray-600">
        { !isOpen ? "BİLGİLERİ GÜNCELLE" : "BİLGİLERİNİZİ TAMAMLAYIN"}
      </div>
      <div>
        {usermessage.succes != "" && (
          <div className="flex items-center justify-center font-semibold text-xl min-w-full h-12 px-10 bg-green-500">
            {usermessage.succes}
          </div>
        )}
        {usermessage.error != "" && (
          <div className="flex items-center justify-center font-semibold text-xl min-w-full h-12 px-10 bg-red-500">
            {usermessage.error}
          </div>
        )}

        <div className="grid mt-14 grid-cols-[150px_1fr] mb-10">
          <label className="self-center block mr-4">Kullanıcı Adı</label>
          <input
            onChange={(e) =>
              setForm((f) => ({ ...f, UserName: e.target.value }))
            }
            className="border-gray-600 border-2 p-1"
            name="name"
            type="text"
            value={form.UserName}
          />
        </div>
        <div className="grid grid-cols-[150px_1fr] mb-10">
          <span className="self-center block mr-4">E-Mail</span>
          <input
            disabled
            className="border-gray-600 border-2 p-1"
            name="email"
            type="text"
            value={form.UserEmail}
          />
        </div>
        <div className="grid grid-cols-[150px_1fr] mb-10">
          <span className="self-center block mr-4">Telefon Numarası</span>
          <input
            onChange={(e) =>
              setForm((f) => ({ ...f, UserPhone: e.target.value }))
            }
            className="border-gray-600 border-2 p-1"
            name="phone"
            type="text"
            value={form.UserPhone}
          />
        </div>
        <div className="grid grid-cols-[150px_1fr] mb-10">
          <span className="self-center block mr-4">İl</span>
          <select
            onChange={(e) => {
              setSelectedProvinceId(parseInt(e.target.value, 10));
              const selectedOption = e.target.options[e.target.selectedIndex];
              const optionName = selectedOption.getAttribute("name");
              setForm((f) => ({
                ...f,
                UserAddress: { ...f.UserAddress, province: optionName },
              }));
            }}
            name="il"
            id="il-select"
            className="p-2 border border-gray-600 border-2 rounded"
          >
            <option value="0">İl Seçin</option>
            {provinces.map((province) => (
              <option
                key={province.id}
                value={province.id}
                name={province.name}
              >
                {province.name}
              </option>
            ))}
          </select>
        </div>
        {selectedProvinceId != 0 && (
          <div className="grid grid-cols-[150px_1fr] mb-10">
            <span className="self-center block mr-4">İlçe</span>
            <select
              onChange={(e) => {
                const selectedOption = e.target.options[e.target.selectedIndex];
                const optionName = selectedOption.getAttribute("name");
                setForm((f) => ({
                  ...f,
                  UserAddress: { ...f.UserAddress, district: optionName },
                }));
                setSelectedDistrictsId(parseInt(e.target.value, 10));
              }}
              name="ilce"
              id="ilce-select"
              className="p-2 border-gray-600 border-2 rounded"
            >
              <option value="">İlçe Seçin</option>
              {districts.map((districts) => (
                <option
                  key={districts.id}
                  value={districts.id}
                  name={districts.name}
                >
                  {districts.name}
                </option>
              ))}
            </select>
          </div>
        )}
        {neighborhoods.length > 0 && (
          <div className="grid grid-cols-[150px_1fr] mb-10">
            <span className="self-center block mr-4">Mahalle</span>
            <select
              onChange={(e) => {
                const selectedOption = e.target.options[e.target.selectedIndex];
                const optionName = selectedOption.getAttribute("name");
                setForm((f) => ({
                  ...f,
                  UserAddress: { ...f.UserAddress, neighbor: optionName },
                }));
              }}
              name="mahalle"
              id="mahalle-select"
              className="p-2 border-gray-600 border-2 rounded"
            >
              <option value="">Mahalle Seçin</option>
              {neighborhoods.map((neighbor) => (
                <option
                  key={neighbor.id}
                  value={neighbor.id}
                  name={neighbor.name}
                >
                  {neighbor.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="grid grid-cols-[150px_1fr] mb-10">
          <span className="block mr-4">Tam Adres</span>
          <textarea
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                UserAddress: { ...f.UserAddress, address: e.target.value },
              }))
            }
            name="fullAddress"
            rows={4}
            placeholder="Sokak, cadde, kapı numarası vb."
            className="p-2 border-gray-600 border-2 rounded resize-none"
            value={form.UserAddress.address}
          />
        </div>

        <div
          onClick={() => {
            if (form.UserName == "") {
              setUsermessage({ succes: "", error: "Adınızı girin" });
            } else {
              const payload = { ...form };
              SaveChange(payload);
              setUsermessage({
                ...usermessage,
                succes: "Bilgiler güncelendi.",
              });
            }
          }}
          className="flex justify-center my-11 items-center self-center justify-self-center rounded-md cursor-pointer w-28 h-12 text-slate-100 bg-gray-600"
        >
          Kaydet
        </div>

        <div className="self-center flex justify-center items-center  justify-self-center text-3xl font bold  py-1 border-t-2 border-b-2 border-gray-600 text-gray-600 w-full">
          Parola Değiştir
        </div>

        {passwordmessage.succes != "" && (
          <div className="flex items-center justify-center font-semibold text-xl min-w-full h-12 px-10 bg-green-500">
            {passwordmessage.succes}
          </div>
        )}
        {passwordmessage.error != "" && (
          <div className="flex items-center justify-center font-semibold text-xl min-w-full h-12 px-10 bg-red-500">
            {passwordmessage.error}
          </div>
        )}

        <div className="grid grid-cols-[150px_1fr] my-10">
          <span className="self-center block mr-4">Eski Parola</span>
          <input
            onChange={(e) => {
              setParolaform({ ...parolaform, oldpassword: e.target.value });
            }}
            className="border-gray-600 border-2 p-1"
            name="oldpassword"
            type="password"
            value={parolaform.oldpassword}
          />
        </div>
        <div className="grid grid-cols-[150px_1fr] mb-10">
          <span className="self-center block mr-4">Yeni Parola</span>
          <input
            onChange={(e) => {
              setParolaform({ ...parolaform, newpassword: e.target.value });
            }}
            className="border-gray-600 border-2 p-1"
            name="newpassword"
            type="password"
            value={parolaform.newpassword}
          />
        </div>
        <div className="grid grid-cols-[150px_1fr] mb-10">
          <span className="self-center block mr-4">Yeni Parola Tekrarı</span>
          <input
            onChange={(e) => {
              setParolaform({
                ...parolaform,
                againnewpassword: e.target.value,
              });
            }}
            className="border-gray-600 border-2 p-1"
            name="againnewpassword"
            type="password"
            value={parolaform.againnewpassword}
          />
        </div>
        <div
          onClick={() => {
            if (parolaform.oldpassword == user.password) {
              if (parolaform.newpassword == parolaform.againnewpassword) {
                const payload = { ...form, password: parolaform.newpassword };
                SaveChange(payload);
                setPasswordmessage({
                  error: "",
                  succes: "Şifre değiştirildi.",
                });
              } else {
                setPasswordmessage({
                  succes: "",
                  error: "Parolalar uyuşmuyor.",
                });
              }
            } else {
              setPasswordmessage({ succes: "", error: "Eski parola yanlış." });
            }
          }}
          className="flex justify-center my-11 items-center self-center justify-self-center rounded-md cursor-pointer w-28 h-12 text-slate-100 bg-blue-800"
        >
          Değiştir
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
