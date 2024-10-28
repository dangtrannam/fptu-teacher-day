import './index.css';
import { useState } from "react";
import IntroductionPage from './pages/user/introduction.page.jsx';
import AvatarCreatorPage from './pages/user/avatarCreator.pages.jsx';
import InformationPage from './pages/user/information.page.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  // Function to return class names for transition
  const getClassName = (page) => {
    return `absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${currentPage === page ? 'opacity-100 z-10' : 'opacity-0 z-0'}`;
  }

  return (
    <div className="relative w-full h-full">
      <div className={getClassName(1)}>
        <IntroductionPage setNextPage={() => setCurrentPage(2)} />
      </div>
      <div className={getClassName(2)}>
        <InformationPage setNextPage={() => setCurrentPage(3)} />
      </div>
      <div className={getClassName(3)}>
        <AvatarCreatorPage />
      </div>
    </div>
  );
}

export default App;
