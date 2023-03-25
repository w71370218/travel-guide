import "./Navbar.css";

const Navbar = () => {
  const menuItemsText = ["景點", "交通", "活動"];
  const menuItems = menuItemsText.map((item, index) => (
    <a key={index} href="#" className="menu-item">
      {item}
    </a>
  ));

  const logo = (
    <a className="logo" href="/">
      台灣旅遊景點導覽
    </a>
  );

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4">
              {logo}
              <div className="menu-items">{menuItems}</div>
            </div>
          </div>

          <div className="sm:hidden" id="mobile-menu">
            <div className="w-full space-y-1 px-2 pt-2 pb-3">
              {logo}
              <div className="menu-items">{menuItems}</div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
