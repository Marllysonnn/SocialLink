import { useEffect, useState } from 'react';
import { db } from "../service/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Link } from 'react-router-dom';
import Cards from "../components/cards";
import './principal.scss';
import { getAuth } from "firebase/auth"; // Importando o Firebase Auth

interface SocialLinks {
  [key: string]: string;
}

const Principal = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({});
  const [userName, setUserName] = useState<string>(''); // Adicionando estado para o nome do usuário
  const [loading, setLoading] = useState<boolean>(true); // Para controlar o estado de carregamento

  useEffect(() => {
    const fetchUserData = async () => {
      // Verifique se o usuário está autenticado
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        // Pegue o ID do usuário logado
        const userId = user.uid;

        // Acesse o documento relacionado ao usuário logado
        const docRef = doc(db, "name", userId); // Usando o ID do usuário logado
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setSocialLinks(userData.socialLinks || {}); // Armazene os dados de redes sociais
          setUserName(userData.name || ''); // Armazene o nome do usuário
        } else {
          console.log("Nenhum documento encontrado para o usuário!");
        }
      } else {
        console.log("Usuário não autenticado.");
      }

      setLoading(false);
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Carregando...</div>; // Exiba algo enquanto os dados são carregados
  }

  return (
    <div className="App">
      <h2>{userName || 'Usuário'}</h2>
      <p>About the user</p>

      <div className="card-content">
        {Object.entries(socialLinks).map(([key, link]) => (
          <Cards
            key={key}
            link={link}
            name={key.charAt(0).toUpperCase() + key.slice(1)} // Capitaliza o nome da rede social
          />
        ))}
      </div>

      <div>
        <Link className="login" to="/">
          <p>Faça o seu</p>
        </Link>
      </div>
    </div>
  );
}

export default Principal;
