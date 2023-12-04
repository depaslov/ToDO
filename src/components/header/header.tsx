import Link from "next/link";
import header from "./header.module.css"

const Header = () => {
  return (
    <header className={header.header}>
      <div>
      <Link href={"#"}> <h1 className={header.logo}> ToDo </h1> </Link>  
      </div>
      <div>
        <ul className={header.ul}>
        <Link href={"/pages/sign_up/"}> <li>Sign up</li> </Link>  
        <Link href={"/pages/log_in/"}> <li>Log in</li> </Link>  
        </ul>
      </div>
     
    </header>
  );
};

export default Header;
