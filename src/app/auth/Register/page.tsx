{/**Home Page and Landing Page */}
import Feed from "../../../components/Feed"
import RegisterForm from "../../../components/RegisterForm";
import Image from "next/image";

const Home = () => {
  // variable to keep the user status
  const isUserLogged = false;

  return (
    <section className="w-full flex-start flex-col mx-16 justify-center">
      <div className="w-full h-full justify-center">
        <RegisterForm></RegisterForm>
      </div>
    </section>
  )
}

export default Home