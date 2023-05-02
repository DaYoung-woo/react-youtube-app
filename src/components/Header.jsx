import logo from "../assets/img/yt_logo_rgb_light.png";

export default function VideoList() {
  return (
    <header className="App-header">
      <img src={logo} alt="logo" />
      <input type="text" className="search-input" />
    </header>
  );
}
