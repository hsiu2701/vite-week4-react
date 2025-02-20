function Pagination({ pageInfo, handlePageChange }) {
  return (
    <>
      {/* 分頁資料 */}
      <div className="d-flex justify-content-center">
        <nav>
          <ul className="pagination">
            {/* 当 没有上一页 (has_pre 为 false) 时，按钮会被禁用（disabled）。
当 有上一页 (has_pre 为 true) 时，按钮是可點擊的。 */}
            <li className={`page-item ${!pageInfo.has_pre && "disabled"}`}>
              <a
                onClick={() => handlePageChange(pageInfo.current_page - 1)}
                className="page-link"
                href="#"
              >
                上一頁
              </a>
            </li>
            {/* 數字分頁用陣列跑回圈載入 */}
            {Array.from({ length: pageInfo.total_pages }).map((_, index) => (
              <li
                key={index}
                className={`page-item ${
                  pageInfo.current_page === index + 1 && "active"
                }`}
              >
                {/* 換頁監聽事件 */}
                <a
                  onClick={() => handlePageChange(index + 1)}
                  className="page-link"
                  href="#"
                >
                  {index + 1}
                </a>
              </li>
            ))}

            <li className={`page-item ${!pageInfo.has_next && "disabled"}`}>
              <a
                onClick={() => handlePageChange(pageInfo.current_page + 1)}
                className="page-link"
                href="#"
              >
                下一頁
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Pagination;
