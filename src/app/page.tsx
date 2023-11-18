{/**Home Page and Landing Page */}

const Home = () => {
  // variable to keep the user status
  const isUserLogged = true;

  return (
    <section className="w-full flex-start flex-col mx-16">
      {isUserLogged?(
        <div>
          <h1 className="headline_text text-left purple_gradient">
          Welcome, Kean!  
          <br/>
        </h1>
        <h2 className="orange_gradient headline_subtext text-left">Where would you like to play?</h2>
        </div>
      ):(
        <div>
          <h1 className="headline_text text-left purple_gradient">
          Welcome to BaTaGOR
          <br/>
        </h1>
        <h2 className="orange_gradient headline_subtext text-left">Log In to access our collection of football fields</h2>
        </div>
        
      )}
      
    </section>
  )
}

export default Home