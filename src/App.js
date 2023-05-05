import "./App.css";
import Foodcompo from "./Components/Foodcompo";
import { useState, useEffect } from "react";
import MenuData from "./MenuData";

function App() {
  const [foods, setFoods] = useState(MenuData);
  const [dataInpage, setDataInPage] = useState([]); //เก็บข้อมูลที่อยู่ในแต่ละหน้า
  const [page, setPage] = useState(0); //เก็บหมายเลขหน้า

  //ข้อมูลทั้งหมด 14 รายการ
  //จำนวนรายการแต่ละหน้า อยากแสดง 3 รายการ ต่อ 1 หน้า
  //จำนวน เลขหน้า = จำนวนทั้งหมด / จำนวนรายการแต่ละหน้า
  // Example  14 / 3 = 4 หน้า
  // page 1 = [1-3] , 2 = [4,6], 3 = [7-9] , 4[10-12] ,5 = [13-14]

  const pagination = () => {
    const foodPerpage = 3; //จำนวนรายการแต่ละหน้า

    const pages = Math.ceil(MenuData.length / foodPerpage); //คำนวณหมายเลขหน้า โดย menudata เป็น array
    console.log(pages);

    const newFood = Array.from({ length: pages }, (data, index) => {
      //สร้าง array ใหม่ขึ้นมา และกำหนด สมาชิกที่จะอยู่ใน array
      const start = index * foodPerpage; //คำนวณ จุดเริ่มต้น ช่วงของข้อมูล
      return MenuData.slice(start, start + foodPerpage); //slice ช่วงข้อมูล และ return ออกไปด้านนอก
    });
    return newFood;
  };

  useEffect(() => {
    //เรียกใช้งาน function ตอนที่ทำการ redner components ขึ้นมา
    const paginate = pagination(); //นำ function paginaion มาใช้งานใน useeffect เก็บลงในตัวแปร paginate
    setDataInPage(paginate); //เอา paginate มาใช้เก็บลงใน setDataInPage เพื่อสร้างจำนวนปุ่มกดดูหมายเลขหน้า
    setFoods(paginate[page]); //ดึงเอาข้อมูลใน paginate ที่แบ่งเอาไว้ เอาเก็บลงใน setFoods อ้างอิงตาม page
  }, [page]);

  const handlePage = (index) => {
    setPage(index);
  };

  return (
    <div>
      <h1>Pagination</h1>
      <div className="menu_container">
        {foods.map((data, index) => {
          return <Foodcompo key={index} {...data} />;
        })}
      </div>
      <div className="pages_container">
        {dataInpage.map((data, index) => {
          return (
            <button
              key={index}
              onClick={() => handlePage(index)}
              className={`btn ${index === page ? "active_btn" : null}`} //เมื่อ index ของปุ่ม ตรงกับ page จะขึ้น class active_btn
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
