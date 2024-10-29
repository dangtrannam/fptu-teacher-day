import './index.css';
import { useState } from "react";
import IntroductionPage from './pages/user/introduction.page.jsx';
import InformationPage from './pages/user/information.page.jsx';
import CreateAvatarExample from './pages/user/createAvata.example.jsx';
import Background from './components/common/background.component.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  // Function to return class names for transition
  const getClassName = (page) => {
    return `absolute inset-0  h-full transition-opacity duration-700 ease-in-out ${currentPage === page ? 'opacity-100 z-10' : 'opacity-0 z-0'}`;
  }

  return (
    <div className="relative w-screen h-full">

      <div>
        <Background />
      </div>

      {/* <div className={getClassName(1)}>
        <IntroductionPage setNextPage={() => setCurrentPage(2)} />
      </div>
      <div className={getClassName(2)}>
        <InformationPage setNextPage={() => setCurrentPage(3)} />
      </div>
      <div className={getClassName(3)}>
        <AvatarCreatorPage />
        <CreateAvatarExample />
      </div> 
      */}
    </div>
  );
}

export default App;
