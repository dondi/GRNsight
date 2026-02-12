import "../App.css";
export default function Header() {
  return (
    <div id="header-container">
      <header>
        {`GRNsight React: `}
        <span>{`v${import.meta.env.VITE_APP_VERSION}`}</span>
      </header>
      <div id="disclaimer">
        <span>Disclaimer:</span>
        <span>
          {" "}
          This version of GRNsight is currently under development and is unstable. For the most
          stable version, please go to the{" "}
          <a href="https://dondi.github.io/GRNsight/">GRNsight home page</a>.
        </span>
      </div>
    </div>
  );
}
