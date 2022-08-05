// hooks
import { useFetchDocuments } from "../../hooks/useFetchDocuments";


// react
import { useState } from "react";

// components
//import PostDetail from "../../components/PostDetail";

const Home = () => {
  const { documents: posts, loading } = useFetchDocuments("users");

  

  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    
  };

  console.log(loading);

  return (
<div >
      <h1>Veja os nossos posts mais recentes</h1>
      <form  onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ou busque por tags..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button >Pesquisar</button>
      </form>
    <div >

    {loading && <p>Carregando...</p>}
        {posts && posts.map((post)=>
        
        <>
        <h3>{post.nome}</h3>
        
        </>
        )}
        
        {posts && posts.length === 0 && (
          <div >
            <p>Não foram encontrados posts</p>
            
        </div>
        )}
       
    </div>
 </div>
  );
};

export default Home;