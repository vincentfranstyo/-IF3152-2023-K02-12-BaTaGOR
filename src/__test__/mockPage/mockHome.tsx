{/**Home Page and Landing Page */}
import Feed from "../../components/Feed"

const MockHome = ({userState, username}: {userState: Boolean, username: String}) => {
  return (
    <section className="w-full flex-start flex-col mx-16">
      {userState?(
        // If the user is logged in, they get a welcome page with their username
        <div>
          <h1 className="headline_text text-left blue_gradient pb-4">
          Welcome, {username} 
          <br/>
        </h1>
        <h2 className="orange_gradient headline_subtext text-left">Where would you like to play?</h2>
        </div>
      ):(   
        // If the user is not logged in, they get a default welcome page
        <div>
          <h1 className="headline_text text-left blue_gradient">
          Welcome to BaTaGOR
          <br/>
        </h1>
        <h2 className="orange_gradient headline_subtext text-left">Sign In to access our collection of football fields</h2>

        
        </div>
        
      )}


      
    </section>
  )
}

export default MockHome