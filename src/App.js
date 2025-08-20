import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import MyVideos from "./pages/MyVideos/MyVideo";
import Upload from "./pages/Upload/Upload";
import PlayList from "./pages/PlayList/PlayList";
import EditVideo from "./pages/EditVideo/EditVideo";
import Login from "./pages/Login/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path=":profileId" element={<Home />} />
          <Route path="my-video" element={<MyVideos />} />
          <Route path="upload" element={<Upload />} />
          <Route path="playlist" element={<PlayList />} />
          <Route path="my-video/edit-video/:videoId" element={<EditVideo />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
