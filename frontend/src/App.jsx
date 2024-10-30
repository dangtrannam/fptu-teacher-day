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
    return `transition-opacity duration-700 ease-in-out absolute inset-0 ${currentPage === page ? 'opacity-100 z-10' : 'opacity-0 -z-10'}`;
  }

  return (
    <div className="relative">
      <div className={getClassName(1)}>
        <IntroductionPage setNextPage={() => setCurrentPage(2)} />
      </div>
      <div className={getClassName(2)}>
        <InformationPage setNextPage={() => setCurrentPage(3)} />
      </div>
      <div className={getClassName(3)}>
        <CreateAvatarExample setNextPage={() => setCurrentPage(2)} />
      </div>
    </div>
  );
}

export default App;
