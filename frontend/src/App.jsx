import './index.css';
// import IntroductionPage from "./pages/introduction.page.jsx";
import { useState } from "react";
import HelloPage from './pages/Hello.page.jsx';
// import AvatarFrame from "./pages/avatar-frame.page.jsx";

function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const getClassName = (page) => {
    return `absolute top-0 left-0 w-full h-full transition ease-in-out duration-2000 ${currentPage === page ? 'opacity-100' : 'opacity-0'}`
  }
  return (
    <div className={'relative w-full h-full'}>
      <div className={getClassName(1)}>
        <HelloPage setNextPage={() => setCurrentPage(2)} />
      </div>
      {/* <div className={getClassName(2)}>
        <IntroductionPage currentPage={currentPage} setNextPage={() => setCurrentPage(3)} />
      </div>
      <div className={getClassName(3)}>
        <AvatarFrame currentPage={currentPage} />
      </div> */}
    </div>
  )
}

export default App