import * as constants from "./utils/constants";

function Header() {
    return (
        <div className="Header">
            <header className="Header">
                <h1>{constants.headerText}</h1>
            </header>
        </div>
    );
}

export default Header;