import './index.css';
import { useState } from "react";
import IntroductionPage from './pages/introduction.page.jsx';
import AvatarCreatorPage from './pages/avatarCreator.pages.jsx';
import HelloPage from './pages/Hello.page.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  // Function to return class names for transition
  const getClassName = (page) => {
    return `absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${currentPage === page ? 'opacity-100 z-10' : 'opacity-0 z-0'}`;
  }

  return (
    <div className="relative w-full h-full">
      <div className={getClassName(1)}>
        <HelloPage setNextPage={() => setCurrentPage(2)} />
      </div>
      <div className={getClassName(2)}>
        <IntroductionPage setNextPage={() => setCurrentPage(3)} />
      </div>
      <div className={getClassName(3)}>
        <AvatarCreatorPage />
      </div>
    </div>
  );
}

export default App;
