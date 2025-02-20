import { useEffect, useState } from "react";
import axios from "axios";
//引入bootstrap  Modal
import { Modal } from "bootstrap";
import Pagination from "../components/pagination";
import ProductModal from "../components/ProductModal";
import DelProductModal from "../components/DelProductModal";

//引入api  對應 .env檔
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;
//modal 狀態 ,useState({defaultModalState對應modal的欄位資料});

// Modal 對應的欄位資料(資料要放最前面)
const defaultModalState = {
  imageUrl: "",
  title: "",
  category: "",
  unit: "",
  origin_price: "",
  price: "",
  description: "",
  content: "",
  is_enabled: 0,
  imagesUrl: [""],
};

function ProductPage() {
  // 判斷編輯或新增的狀態  標題修改
  const [modalMode, setModalmode] = useState(null);
  const [products, setProducts] = useState([]);
  const [tempProduct, setTempProduct] = useState(defaultModalState);
  // 預設開關modal
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  //預設開關刪除modal
  const [isDelProductModalOpen, setIsDelProductModalOpen] = useState(false);

  const handleOpenProductModal = (mode, product) => {
    setModalmode(mode);

    switch (mode) {
      case "create":
        setTempProduct(defaultModalState);
        break;
      case "edit":
        setTempProduct(product);
        break;

      default:
        break;
    }
    // **
    setIsProductModalOpen(true);
  };

  //引入modal 用useRef

  const getProducts = async (page = 1) => {
    try {
      const res = await axios.get(
        // ?+ page=${page} 是產品api的page ,換頁功能
        `${BASE_URL}/v2/api/${API_PATH}/admin/products?page=${page}`
      );
      setProducts(res.data.products);

      // 存資料時存取分頁
      setPageInfo(res.data.pagination);
    } catch (error) {
      alert("取得產品失敗");
    }
  };

  //初始 取
  useEffect(() => {
    getProducts();
  }, []);

  // 刪除modal 開關 ,product 參數取出資料
  const handleOpenDelProductModal = (product) => {
    setTempProduct(product);
    setIsDelProductModalOpen(true);
  };

  // 分頁狀態
  const [pageInfo, setPageInfo] = useState({});

  const handlePageChange = (page) => {
    //呼叫getProducts
    getProducts(page);
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-between">
              <h2>產品列表</h2>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleOpenProductModal("create")}
              >
                建立新的產品
              </button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">產品名稱</th>
                  <th scope="col">原價</th>
                  <th scope="col">售價</th>
                  <th scope="col">是否啟用</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {/* product#參數戴入資料 */}
                {products.map((product) => (
                  <tr key={product.id}>
                    <th scope="row">{product.title}</th>
                    <td>{product.origin_price}</td>
                    <td>{product.price}</td>
                    <td>
                      {product.is_enabled ? (
                        <span className="text-success">啟用</span>
                      ) : (
                        <span>未啟用</span>
                      )}
                    </td>
                    <td>
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm"
                          // product#參數原自動戴入資料
                          onClick={() =>
                            handleOpenProductModal("edit", product)
                          }
                        >
                          編輯
                        </button>
                        <button
                          onClick={() => handleOpenDelProductModal(product)}
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                        >
                          刪除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination pageInfo={pageInfo} handlePageChange={handlePageChange} />
      </div>
      <ProductModal
        modalMode={modalMode}
        tempProduct={tempProduct}
        isOpen={isProductModalOpen}
        setIsOpen={setIsProductModalOpen}
        getProducts={getProducts}
      />
      <DelProductModal
        tempProduct={tempProduct}
        isOpen={isDelProductModalOpen}
        setIsOpen={setIsProductModalOpen}
        getProducts={getProducts}
      />
    </>
  );
}
export default ProductPage;
