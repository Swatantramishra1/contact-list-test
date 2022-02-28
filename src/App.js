import logo from './logo.svg';
import './App.css';
import FolderList from './components/home';
import { CONTACT_LIST } from './data';

function App() {

  const list = CONTACT_LIST.sort((a,b) => a.firstName - b.firstName);

  return (
    <div className={'container'}>
      <FolderList list={list} />
    </div>
  );
}

export default App;
